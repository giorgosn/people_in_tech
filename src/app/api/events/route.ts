import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const type = searchParams.get("type") || "";
    const dateRange = searchParams.get("dateRange") || "upcoming";
    const online = searchParams.get("online") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const now = new Date();
    const conditions: Record<string, unknown>[] = [];

    // Type filter
    if (type && type !== "ALL") {
      conditions.push({ type });
    }

    // Online filter
    if (online === "true") {
      conditions.push({ isOnline: true });
    } else if (online === "false") {
      conditions.push({ isOnline: false });
    }

    // Date range filter
    if (dateRange === "upcoming") {
      conditions.push({ date: { gte: now } });
    } else if (dateRange === "thisWeek") {
      const endOfWeek = new Date(now);
      endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
      endOfWeek.setHours(23, 59, 59, 999);
      conditions.push({
        date: { gte: now, lte: endOfWeek },
      });
    } else if (dateRange === "thisMonth") {
      const endOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );
      conditions.push({
        date: { gte: now, lte: endOfMonth },
      });
    } else if (dateRange === "past") {
      conditions.push({ date: { lt: now } });
    }

    const where: Record<string, unknown> = {};
    if (conditions.length > 0) {
      where.AND = conditions;
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy: { date: dateRange === "past" ? "desc" : "asc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          _count: {
            select: {
              registrations: true,
            },
          },
        },
      }),
      prisma.event.count({ where }),
    ]);

    const mapped = events.map((e) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      type: e.type,
      date: e.date,
      startTime: e.startTime,
      endTime: e.endTime,
      location: e.location,
      isOnline: e.isOnline,
      registrationUrl: e.registrationUrl,
      capacity: e.capacity,
      registrationCount: e._count.registrations,
      company: e.company,
    }));

    return NextResponse.json({ events: mapped, total });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
