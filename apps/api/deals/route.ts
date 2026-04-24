import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { createApiError, handleApiError } from "@/lib/api-helpers";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");
    const contactId = searchParams.get("contactId");
    const stage = searchParams.get("stage");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = (page - 1) * limit;

    let query = db("deals")
      .select(
        "deals.*",
        "companies.name as company_name",
        db.raw("CONCAT(contacts.first_name, ' ', contacts.last_name) as contact_name")
      )
      .leftJoin("companies", "deals.company_id", "companies.id")
      .leftJoin("contacts", "deals.contact_id", "contacts.id");

    if (companyId) {
      query = query.where("deals.company_id", companyId);
    }
    if (contactId) {
      query = query.where("deals.contact_id", contactId);
    }
    if (stage) {
      query = query.where("deals.stage", stage);
    }
    if (search) {
      query = query.where(function () {
        this.where("deals.title", "ilike", `%${search}%`)
          .orWhere("deals.description", "ilike", `%${search}%`)
          .orWhere("companies.name", "ilike", `%${search}%`);
      });
    }

    query = query.orderBy("deals.updated_at", "desc").limit(limit).offset(offset);

    const deals = await query;
    const [{ count }] = await db("deals")
      .count("*")
      .where(function () {
        if (companyId) this.where("company_id", companyId);
        if (contactId) this.where("contact_id", contactId);
        if (stage) this.where("stage", stage);
        if (search) {
          this.where("title", "ilike", `%${search}%`)
            .orWhere("description", "ilike", `%${search}%`);
        }
      });

    return NextResponse.json({
      deals,
      pagination: {
        page,
        limit,
        total: parseInt(count as string, 10),
        totalPages: Math.ceil(parseInt(count as string, 10) / limit),
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, value, stage, company_id, contact_id, expected_close_date } = body;

    if (!title || !stage) {
      return NextResponse.json(
        { error: "Title and stage are required" },
        { status: 400 }
      );
    }

    const validStages = ["lead", "qualified", "proposal", "negotiation", "closed_won", "closed_lost"];
    if (!validStages.includes(stage)) {
      return NextResponse.json(
        { error: `Invalid stage. Must be one of: ${validStages.join(", ")}` },
        { status: 400 }
      );
    }

    if (value !== undefined && (typeof value !== "number" || value < 0)) {
      return NextResponse.json(
        { error: "Value must be a non-negative number" },
        { status: 400 }
      );
    }

    if (company_id) {
      const company = await db("companies").where("id", company_id).first();
      if (!company) {
        return NextResponse.json({ error: "Company not found" }, { status: 404 });
      }
    }

    if (contact_id) {
      const contact = await db("contacts").where("id", contact_id).first();
      if (!contact) {
        return NextResponse.json({ error: "Contact not found" }, { status: 404 });
      }
    }

    const [deal] = await db("deals")
      .insert({
        title,
        description: description || null,
        value: value || 0,
        stage,
        company_id: company_id || null,
        contact_id: contact_id || null,
        expected_close_date: expected_close_date || null,
        created_by: session.user.id,
        updated_by: session.user.id,
      })
      .returning("*");

    return NextResponse.json(deal, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, title, description, value, stage, company_id, contact_id, expected_close_date } = body;

    if (!id) {
      return NextResponse.json({ error: "Deal ID is required" }, { status: 400 });
    }

    const existingDeal = await db("deals").where("id", id).first();
    if (!existingDeal) {
      return NextResponse.json({ error: "Deal not found" }, { status: 404 });
    }

    const updatedFields: Record<string, unknown> = {
      updated_by: session.user.id,
      updated_at: db.fn.now(),
    };
    if (title !== undefined) updatedFields.title = title;
    if (description !== undefined) updatedFields.description = description;
    if (value !== undefined) updatedFields.value = value;
    if (stage !== undefined) updatedFields.stage = stage;
    if (company_id !== undefined) updatedFields.company_id = company_id;
    if (contact_id !== undefined) updatedFields.contact_id = contact_id;
    if (expected_close_date !== undefined) updatedFields.expected_close_date = expected_close_date;

    const [updatedDeal] = await db("deals")
      .where("id", id)
      .update(updatedFields)
      .returning("*");

    return NextResponse.json(updatedDeal);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Deal ID is required" }, { status: 400 });
    }

    const existingDeal = await db("deals").where("id", id).first();
    if (!existingDeal) {
      return NextResponse.json({ error: "Deal not found" }, { status: 404 });
    }

    await db("deals").where("id", id).del();

    return NextResponse.json({ message: "Deal deleted successfully" });
  } catch (error) {
    return handleApiError(error);
  }
}
