"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { CompanyCard, type CompanyCardData } from "@/components/shared/company-card";
import { Button } from "@/components/ui/button";
import { Building2, UserMinus } from "lucide-react";
import { toast } from "sonner";

interface FollowedCompaniesProps {
  companies: (CompanyCardData & { id: string })[];
}

export function FollowedCompanies({ companies: initialCompanies }: FollowedCompaniesProps) {
  const [companies, setCompanies] = useState(initialCompanies);
  const [unfollowing, setUnfollowing] = useState<string | null>(null);

  async function handleUnfollow(companyId: string, companyName: string) {
    setUnfollowing(companyId);
    try {
      const res = await fetch(`/api/companies/${companyId}/follow`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to unfollow");
      }

      setCompanies((prev) => prev.filter((c) => c.id !== companyId));
      toast.success(`Unfollowed ${companyName}`);
    } catch {
      toast.error("Failed to unfollow company");
    } finally {
      setUnfollowing(null);
    }
  }

  if (companies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Building2 className="size-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          You&apos;re not following any companies yet.
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Discover and follow companies to stay updated on their latest jobs and events.
        </p>
        <Link href="/discover">
          <Button>Discover Companies</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <div key={company.id} className="relative group">
          <CompanyCard company={company} />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="destructive"
              size="icon"
              className="size-8"
              onClick={() => handleUnfollow(company.id, company.name)}
              disabled={unfollowing === company.id}
            >
              <UserMinus className="size-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
