"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { MultiSelectChips } from "@/components/shared/multi-select-chips";
import { TagInput } from "@/components/shared/tag-input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ROLE_OPTIONS = [
  "Frontend",
  "Backend",
  "Full-Stack",
  "Data",
  "Design",
  "Product",
  "DevOps",
  "Marketing",
  "Sales",
  "Operations",
];

const INDUSTRY_OPTIONS = [
  "FinTech",
  "HealthTech",
  "EdTech",
  "SaaS",
  "E-commerce",
  "AI/ML",
  "Cybersecurity",
  "Gaming",
  "IoT",
];

const LOCATION_OPTIONS = [
  "Athens",
  "Thessaloniki",
  "Remote",
  "Anywhere in Greece",
];

const EXPERIENCE_LEVELS = [
  { value: "STUDENT", label: "Student" },
  { value: "GRADUATE", label: "Graduate" },
  { value: "JUNIOR", label: "Junior" },
] as const;

export interface ProfileData {
  name: string;
  headline: string;
  linkedinUrl: string;
  experienceLevel: string;
  skills: string[];
  roleInterests: string[];
  industries: string[];
  preferredLocations: string[];
  emailDigest: boolean;
  emailEvents: boolean;
  emailNewsletter: boolean;
}

interface ProfileSettingsProps {
  profile: ProfileData;
}

export function ProfileSettings({ profile }: ProfileSettingsProps) {
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ProfileData>({
    defaultValues: profile,
  });

  const experienceLevel = watch("experienceLevel");
  const skills = watch("skills");
  const roleInterests = watch("roleInterests");
  const industries = watch("industries");
  const preferredLocations = watch("preferredLocations");
  const emailDigest = watch("emailDigest");
  const emailEvents = watch("emailEvents");
  const emailNewsletter = watch("emailNewsletter");

  async function onSubmit(data: ProfileData) {
    setSaving(true);
    try {
      const res = await fetch("/api/candidate/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-8">
      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name", { required: "Name is required", minLength: { value: 2, message: "Name must be at least 2 characters" } })}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="headline">Headline</Label>
          <Input
            id="headline"
            placeholder="e.g. Full-Stack Developer"
            {...register("headline")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
          <Input
            id="linkedinUrl"
            placeholder="https://linkedin.com/in/yourprofile"
            {...register("linkedinUrl")}
          />
        </div>
      </div>

      <Separator />

      {/* Experience Level */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Experience Level</h3>
        <div className="grid grid-cols-3 gap-3">
          {EXPERIENCE_LEVELS.map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => setValue("experienceLevel", level.value)}
              className={cn(
                "rounded-xl border p-3 text-center cursor-pointer transition-all text-sm font-medium",
                experienceLevel === level.value
                  ? "bg-primary/10 border-primary text-primary ring-1 ring-primary"
                  : "bg-card border-border text-muted-foreground hover:border-foreground/30"
              )}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Skills & Interests */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Skills & Interests</h3>

        <div>
          <Label className="mb-3">Skills</Label>
          <TagInput
            tags={skills || []}
            onChange={(tags) => setValue("skills", tags)}
            placeholder="Add a skill..."
          />
        </div>

        <MultiSelectChips
          label="Role Interests"
          options={ROLE_OPTIONS}
          selected={roleInterests || []}
          onChange={(selected) => setValue("roleInterests", selected)}
        />

        <MultiSelectChips
          label="Industries"
          options={INDUSTRY_OPTIONS}
          selected={industries || []}
          onChange={(selected) => setValue("industries", selected)}
        />

        <MultiSelectChips
          label="Preferred Locations"
          options={LOCATION_OPTIONS}
          selected={preferredLocations || []}
          onChange={(selected) => setValue("preferredLocations", selected)}
        />
      </div>

      <Separator />

      {/* Email Preferences */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Email Preferences</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="emailDigest" className="cursor-pointer">
              Weekly Digest
            </Label>
            <Switch
              id="emailDigest"
              checked={emailDigest}
              onCheckedChange={(checked: boolean) =>
                setValue("emailDigest", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="emailEvents" className="cursor-pointer">
              Event Announcements
            </Label>
            <Switch
              id="emailEvents"
              checked={emailEvents}
              onCheckedChange={(checked: boolean) =>
                setValue("emailEvents", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="emailNewsletter" className="cursor-pointer">
              Community Newsletter
            </Label>
            <Switch
              id="emailNewsletter"
              checked={emailNewsletter}
              onCheckedChange={(checked: boolean) =>
                setValue("emailNewsletter", checked)
              }
            />
          </div>
        </div>
      </div>

      <Separator />

      <Button type="submit" disabled={saving} className="w-full sm:w-auto">
        {saving && <Loader2 className="mr-2 size-4 animate-spin" />}
        Save Changes
      </Button>
    </form>
  );
}
