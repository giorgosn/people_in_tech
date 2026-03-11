import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: jobListingId } = await params;
    const userId = (session.user as { id: string }).id;

    // Check if job exists
    const job = await prisma.jobListing.findUnique({
      where: { id: jobListingId },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Check if save exists
    const existingSave = await prisma.savedJob.findUnique({
      where: {
        userId_jobListingId: {
          userId,
          jobListingId,
        },
      },
    });

    if (existingSave) {
      // Unsave
      await prisma.savedJob.delete({
        where: { id: existingSave.id },
      });
    } else {
      // Save
      await prisma.savedJob.create({
        data: {
          userId,
          jobListingId,
        },
      });
    }

    return NextResponse.json({
      saved: !existingSave,
    });
  } catch (error) {
    console.error("Error toggling saved job:", error);
    return NextResponse.json(
      { error: "Failed to toggle saved job" },
      { status: 500 }
    );
  }
}
