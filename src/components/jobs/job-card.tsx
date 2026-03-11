"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, ExternalLink, MapPin, Building2 } from "lucide-react";
import { toast } from "sonner";

export interface JobCardData {
  id: string;
  title: string;
  location: string | null;
  type: string;
  externalUrl: string;
  postedAt: string | Date;
  company: {
    id: string;
    name: string;
    slug: string;
    logo: string | null;
    industry: string;
  };
}

function getTypeBadge(type: string) {
  switch (type) {
    case "REMOTE":
      return { label: "Remote", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" };
    case "HYBRID":
      return { label: "Hybrid", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" };
    case "ONSITE":
      return { label: "Onsite", className: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30" };
    default:
      return { label: type, className: "bg-muted text-muted-foreground" };
  }
}

function getRelativeTime(date: string | Date): string {
  const postedDate = typeof date === "string" ? new Date(date) : date;
  const days = Math.floor((Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

function getIndustryColor(industry: string): string {
  const colors: Record<string, string> = {
    Fintech: "bg-emerald-600",
    "E-commerce": "bg-blue-600",
    SaaS: "bg-violet-600",
    AI: "bg-amber-600",
    Healthtech: "bg-rose-600",
    Edtech: "bg-cyan-600",
    Cybersecurity: "bg-red-600",
    Gaming: "bg-purple-600",
    Logistics: "bg-orange-600",
    Greentech: "bg-green-600",
  };
  return colors[industry] || "bg-primary/80";
}

interface JobCardProps {
  job: JobCardData;
  isSaved?: boolean;
}

export function JobCard({ job, isSaved = false }: JobCardProps) {
  const { data: session } = useSession();
  const [saved, setSaved] = useState(isSaved);
  const [saving, setSaving] = useState(false);

  const typeBadge = getTypeBadge(job.type);
  const firstLetter = job.company.name.charAt(0).toUpperCase();

  async function handleSave() {
    if (!session?.user) {
      toast.error("Please sign in to save jobs");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/jobs/${job.id}/save`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to save job");
      }

      const data = await res.json();
      setSaved(data.saved);
      toast.success(data.saved ? "Job saved" : "Job removed from saved");
    } catch {
      toast.error("Failed to save job");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="rounded-xl border-border bg-card transition-all hover:border-border/80 hover:bg-card/90">
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            {/* Company logo / letter avatar */}
            {job.company.logo ? (
              <img
                src={job.company.logo}
                alt={job.company.name}
                className="size-10 shrink-0 rounded-lg object-cover"
              />
            ) : (
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white ${getIndustryColor(job.company.industry)}`}
              >
                {firstLetter}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-foreground truncate">
                {job.title}
              </h3>
              <Link
                href={`/companies/${job.company.slug}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {job.company.name}
              </Link>
            </div>
          </div>

          {/* Save button */}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={handleSave}
            disabled={saving}
          >
            <Bookmark
              className={`size-4 ${saved ? "fill-primary text-primary" : "text-muted-foreground"}`}
            />
          </Button>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={typeBadge.className}>
            {typeBadge.label}
          </Badge>

          {job.location && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {job.location}
            </span>
          )}

          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Building2 className="size-3" />
            {job.company.industry}
          </span>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs text-muted-foreground">
            {getRelativeTime(job.postedAt)}
          </span>

          <a
            href={job.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View on Company Site
            <ExternalLink className="size-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
