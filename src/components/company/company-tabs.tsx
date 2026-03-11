"use client";

import { useTranslations } from "next-intl";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AboutTab } from "./about-tab";
import { RolesTab } from "./roles-tab";
import { EventsTab } from "./events-tab";
import { GalleryTab } from "./gallery-tab";
import type { EventCardData } from "@/components/shared/event-card";

interface JobListingData {
  id: string;
  title: string;
  location: string | null;
  type: string;
  externalUrl: string;
  postedAt: string;
}

interface GalleryImageData {
  id: string;
  url: string;
  caption: string | null;
  order: number;
}

interface CompanyTabsProps {
  description: string | null;
  technologies: string[];
  founded: number | null;
  size: string;
  locations: string[];
  industry: string;
  website: string | null;
  status: string;
  jobs: JobListingData[];
  events: EventCardData[];
  galleryImages: GalleryImageData[];
}

export function CompanyTabs({
  description,
  technologies,
  founded,
  size,
  locations,
  industry,
  website,
  status,
  jobs,
  events,
  galleryImages,
}: CompanyTabsProps) {
  const t = useTranslations("company");
  const isVerified = status === "VERIFIED";

  return (
    <Tabs defaultValue="about">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="about">{t("about")}</TabsTrigger>
        <TabsTrigger value="roles" className="gap-1.5">
          {t("openRoles")}
          {jobs.length > 0 && (
            <Badge variant="default" className="ml-1 h-4 min-w-4 px-1 text-[10px]">
              {jobs.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="events" className="gap-1.5">
          {t("events")}
          {events.length > 0 && (
            <Badge variant="default" className="ml-1 h-4 min-w-4 px-1 text-[10px]">
              {events.length}
            </Badge>
          )}
        </TabsTrigger>
        {isVerified && (
          <TabsTrigger value="gallery">{t("gallery")}</TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="about" className="mt-6">
        <AboutTab
          description={description}
          technologies={technologies}
          founded={founded}
          size={size}
          locations={locations}
          industry={industry}
          website={website}
        />
      </TabsContent>

      <TabsContent value="roles" className="mt-6">
        <RolesTab jobs={jobs} />
      </TabsContent>

      <TabsContent value="events" className="mt-6">
        <EventsTab events={events} />
      </TabsContent>

      {isVerified && (
        <TabsContent value="gallery" className="mt-6">
          <GalleryTab images={galleryImages} isVerified={isVerified} />
        </TabsContent>
      )}
    </Tabs>
  );
}
