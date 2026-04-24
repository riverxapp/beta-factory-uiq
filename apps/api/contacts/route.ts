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
    const companyId = searchParams.get("companyId") || "";
    const offset = (page - 1) * limit;

    const db = createClient();

    let query = db.from("contacts").select("*", { count: "exact" });
    let countQuery = db.from("contacts").select("*", { count: "exact", head: true });

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
      countQuery = countQuery.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
    }

    if (companyId) {
      query = query.eq("company_id", companyId);
      countQuery = countQuery.eq("company_id", companyId);
    }

    const { data: contacts, error, count } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess({
      contacts,
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
    const { name, email, phone, company_id, notes } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return apiError("Name is required", 400);
    }

    const db = createClient();

    const { data: contact, error } = await db
      .from("contacts")
      .insert([
        {
          name: name.trim(),
          email: email?.trim() || null,
          phone: phone?.trim() || null,
          company_id: company_id || null,
          notes: notes || null,
          created_by: session.user.id,
        },
      ])
      .select()
      .single();

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess(contact, 201);
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
      return apiError("Contact ID is required", 400);
    }

    const body = await request.json();
    const allowedFields = ["name", "email", "phone", "company_id", "notes"];
    const updates: Record<string, any> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = typeof body[field] === "string" ? body[field].trim() : body[field];
      }
    }

    const db = createClient();

    const { data: contact, error } = await db
      .from("contacts")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess(contact);
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
      return apiError("Contact ID is required", 400);
    }

    const db = createClient();

    const { error } = await db
      .from("contacts")
      .delete()
      .eq("id", id);

    if (error) {
      return apiError(error.message, 500);
    }

    return apiSuccess({ message: "Contact deleted successfully" });
  } catch (err) {
    return apiError("Internal Server Error", 500);
  }
}
