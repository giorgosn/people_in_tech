import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const industry = searchParams.get("industry") || "";
    const location = searchParams.get("location") || "";
    const size = searchParams.get("size") || "";
    const hasRoles = searchParams.get("hasRoles") === "true";
    const verified = searchParams.get("verified") === "true";
    const sort = searchParams.get("sort") || "mostFollowed";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    // Build where clause
    const where: Record<string, unknown> = {};
    const conditions: Record<string, unknown>[] = [];

    if (search) {
      conditions.push({
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
          { technologies: { contains: search } },
        ],
      });
    }

    if (industry) {
      conditions.push({ industry });
    }

    if (location) {
      conditions.push({ locations: { contains: location } });
    }

    if (size) {
      conditions.push({ size });
    }

    if (hasRoles) {
      conditions.push({
        jobs: { some: { status: "ACTIVE" } },
      });
    }

    if (verified) {
      conditions.push({ status: "VERIFIED" });
    }

    if (conditions.length > 0) {
      where.AND = conditions;
    }

    // Build orderBy
    let orderBy: Record<string, unknown> = {};
    switch (sort) {
      case "mostFollowed":
        orderBy = { followers: { _count: "desc" } };
        break;
      case "mostRoles":
        orderBy = { jobs: { _count: "desc" } };
        break;
      case "recent":
        orderBy = { createdAt: "desc" };
        break;
      case "alphabetical":
        orderBy = { name: "asc" };
        break;
      default:
        orderBy = { followers: { _count: "desc" } };
    }

    const [companies, total] = await Promise.all([
      prisma.company.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          _count: {
            select: {
              followers: true,
              jobs: {
                where: { status: "ACTIVE" },
              },
            },
          },
        },
      }),
      prisma.company.count({ where }),
    ]);

    const mapped = companies.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      industry: c.industry,
      logo: c.logo,
      locations: c.locations,
      status: c.status,
      size: c.size,
      description: c.description,
      followerCount: c._count.followers,
      jobCount: c._count.jobs,
    }));

    return NextResponse.json({ companies: mapped, total });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}
