"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FollowedCompanies } from "./followed-companies";
import { SavedJobs, type SavedJobData } from "./saved-jobs";
import { ProfileSettings, type ProfileData } from "./profile-settings";
import { type CompanyCardData } from "@/components/shared/company-card";
import { Heart, Bookmark, Settings } from "lucide-react";

interface DashboardClientProps {
  companies: (CompanyCardData & { id: string })[];
  savedJobs: SavedJobData[];
  profile: ProfileData;
}

export function DashboardClient({ companies, savedJobs, profile }: DashboardClientProps) {
  return (
    <div>
      <Tabs defaultValue="following">
        <TabsList className="mb-6 w-full sm:w-auto">
          <TabsTrigger value="following" className="gap-1.5">
            <Heart className="size-4" />
            Following
          </TabsTrigger>
          <TabsTrigger value="saved-jobs" className="gap-1.5">
            <Bookmark className="size-4" />
            Saved Jobs
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-1.5">
            <Settings className="size-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="following">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Companies You Follow
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Stay updated on job openings and events from your favorite companies.
            </p>
          </div>
          <FollowedCompanies companies={companies} />
        </TabsContent>

        <TabsContent value="saved-jobs">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Saved Jobs
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Jobs you&apos;ve bookmarked for later review.
            </p>
          </div>
          <SavedJobs jobs={savedJobs} />
        </TabsContent>

        <TabsContent value="settings">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Profile Settings
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your profile information and preferences.
            </p>
          </div>
          <ProfileSettings profile={profile} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
