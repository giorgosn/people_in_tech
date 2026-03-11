import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardClient } from "@/components/dashboard/candidate/dashboard-client";
import type { CompanyCardData } from "@/components/shared/company-card";
import type { SavedJobData } from "@/components/dashboard/candidate/saved-jobs";
import type { ProfileData } from "@/components/dashboard/candidate/profile-settings";

export default async function CandidateDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  if (session.user.role !== "CANDIDATE") {
    redirect(`/${locale}`);
  }

  const userId = session.user.id;

  // Fetch all data in parallel
  const [user, candidateProfile, follows, savedJobs] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    }),
    prisma.candidateProfile.findUnique({
      where: { userId },
    }),
    prisma.follow.findMany({
      where: { userId },
      include: {
        company: {
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
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.savedJob.findMany({
      where: { userId },
      include: {
        job: {
          include: {
            company: {
              select: {
                id: true,
                name: true,
                slug: true,
                logo: true,
                industry: true,
              },
            },
          },
        },
      },
      orderBy: { savedAt: "desc" },
    }),
  ]);

  // Map followed companies to CompanyCardData format
  const companies: (CompanyCardData & { id: string })[] = follows.map((f) => ({
    id: f.company.id,
    name: f.company.name,
    slug: f.company.slug,
    industry: f.company.industry,
    logo: f.company.logo,
    locations: f.company.locations,
    status: f.company.status,
    followerCount: f.company._count.followers,
    jobCount: f.company._count.jobs,
  }));

  // Map saved jobs to SavedJobData format
  const savedJobsData: SavedJobData[] = savedJobs.map((s) => ({
    id: s.job.id,
    title: s.job.title,
    location: s.job.location,
    type: s.job.type,
    externalUrl: s.job.externalUrl,
    postedAt: s.job.postedAt.toISOString(),
    company: {
      id: s.job.company.id,
      name: s.job.company.name,
      slug: s.job.company.slug,
      logo: s.job.company.logo,
      industry: s.job.company.industry,
    },
  }));

  // Build profile data
  const profile: ProfileData = {
    name: user?.name || "",
    headline: candidateProfile?.headline || "",
    linkedinUrl: candidateProfile?.linkedinUrl || "",
    experienceLevel: candidateProfile?.experienceLevel || "STUDENT",
    skills: candidateProfile ? JSON.parse(candidateProfile.skills) : [],
    roleInterests: candidateProfile ? JSON.parse(candidateProfile.roleInterests) : [],
    industries: candidateProfile ? JSON.parse(candidateProfile.industries) : [],
    preferredLocations: candidateProfile ? JSON.parse(candidateProfile.preferredLocations) : [],
    emailDigest: candidateProfile?.emailDigest ?? true,
    emailEvents: candidateProfile?.emailEvents ?? true,
    emailNewsletter: candidateProfile?.emailNewsletter ?? false,
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your followed companies, saved jobs, and profile settings.
        </p>
      </div>

      <DashboardClient
        companies={companies}
        savedJobs={savedJobsData}
        profile={profile}
      />
    </div>
  );
}
