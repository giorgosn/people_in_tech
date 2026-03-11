import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { DiscoverClient } from "@/components/discover/discover-client";
import type { CompanyCardData } from "@/components/shared/company-card";

async function getInitialCompanies(): Promise<{
  companies: CompanyCardData[];
  total: number;
}> {
  const [companies, total] = await Promise.all([
    prisma.company.findMany({
      orderBy: { followers: { _count: "desc" } },
      take: 20,
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
    prisma.company.count(),
  ]);

  const mapped = companies.map((c) => ({
    name: c.name,
    slug: c.slug,
    industry: c.industry,
    logo: c.logo,
    locations: c.locations,
    status: c.status,
    followerCount: c._count.followers,
    jobCount: c._count.jobs,
  }));

  return { companies: mapped, total };
}

export default async function DiscoverPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("discover");
  const { companies, total } = await getInitialCompanies();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-foreground">
        {t("title")}
      </h1>
      <DiscoverClient initialCompanies={companies} initialTotal={total} />
    </div>
  );
}
