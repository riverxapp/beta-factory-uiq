import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api-helpers";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return apiError("Unauthorized", 401);
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const offset = (page - 1) * limit;

    const db = createClient();

    let query = db.from("projects").select("*", { count: "exact" });
    let countQuery = db.from("projects").select("*", { count: "exact", head: true });

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
      countQuery = countQuery.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (status) {
      query = query.eq("status", status);
      countQuery = countQuery.eq("status", status);
    }

    const { data: projects, error, count } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess({
      projects,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (err) {
    return apiError("Internal Server Error", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return apiError("Unauthorized", 401);
    }

    const body = await request.json();
    const { name, description, status, priority, due_date, budget } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return apiError("Project name is required", 400);
    }

    const db = createClient();

    const { data: project, error } = await db
      .from("projects")
      .insert([
        {
          name: name.trim(),
          description: description?.trim() || null,
          status: status || "active",
          priority: priority || "medium",
          due_date: due_date || null,
          budget: budget || null,
          created_by: session.user.id,
        },
      ])
      .select()
      .single();

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess(project, 201);
  } catch (err) {
    return apiError("Internal Server Error", 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return apiError("Unauthorized", 401);
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return apiError("Project ID is required", 400);
    }

    const body = await request.json();
    const allowedFields = ["name", "description", "status", "priority", "due_date", "budget"];
    const updates: Record<string, any> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = typeof body[field] === "string" ? body[field].trim() : body[field];
      }
    }

    const db = createClient();

    const { data: project, error } = await db
      .from("projects")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess(project);
  } catch (err) {
    return apiError("Internal Server Error", 500);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return apiError("Unauthorized", 401);
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return apiError("Project ID is required", 400);
    }

    const db = createClient();

    const { error } = await db
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess({ message: "Project deleted successfully" });
  } catch (err) {
    return apiError("Internal Server Error", 500);
  }
}