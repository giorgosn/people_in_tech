import { setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { JobsClient } from "@/components/jobs/jobs-client";
import type { JobCardData } from "@/components/jobs/job-card";

async function getActiveJobs(): Promise<{ jobs: JobCardData[]; total: number }> {
  const where = { status: "ACTIVE" as const };

  const [jobs, total] = await Promise.all([
    prisma.jobListing.findMany({
      where,
      orderBy: { postedAt: "desc" },
      take: 20,
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
    }),
    prisma.jobListing.count({ where }),
  ]);

  const mapped: JobCardData[] = jobs.map((j) => ({
    id: j.id,
    title: j.title,
    location: j.location,
    type: j.type,
    externalUrl: j.externalUrl,
    postedAt: j.postedAt.toISOString(),
    company: {
      id: j.company.id,
      name: j.company.name,
      slug: j.company.slug,
      logo: j.company.logo,
      industry: j.company.industry,
    },
  }));

  return { jobs: mapped, total };
}

export default async function JobsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { jobs, total } = await getActiveJobs();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Job Openings
        </h1>
        <p className="mt-2 text-muted-foreground">
          Discover opportunities at Greece&apos;s top tech companies
        </p>
      </div>

      <JobsClient initialJobs={jobs} initialTotal={total} />
    </div>
  );
}
