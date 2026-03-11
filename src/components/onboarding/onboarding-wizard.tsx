"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import {
  onboardingSchema,
  type OnboardingInput,
} from "@/lib/validations/onboarding";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StepAbout } from "./step-about";
import { StepInterests } from "./step-interests";
import { StepPreferences } from "./step-preferences";
import { cn } from "@/lib/utils";

export function OnboardingWizard() {
  const t = useTranslations("onboarding");
  const { data: session } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<OnboardingInput>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: session?.user?.name || "",
      headline: "",
      linkedinUrl: "",
      experienceLevel: "STUDENT",
      roleInterests: [],
      skills: [],
      industries: [],
      preferredLocations: [],
      emailDigest: true,
      emailEvents: true,
      emailNewsletter: false,
      language: "en",
    },
  });

  const stepTitles: Record<number, string> = {
    1: t("step1Title"),
    2: t("step2Title"),
    3: t("step3Title"),
  };

  async function handleNext() {
    if (currentStep === 1) {
      const valid = await trigger(["fullName", "headline", "linkedinUrl", "experienceLevel"]);
      if (!valid) return;
    } else if (currentStep === 2) {
      const valid = await trigger(["roleInterests", "skills", "industries"]);
      if (!valid) return;
    }
    setDirection("forward");
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  }

  function handleBack() {
    setDirection("back");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }

  async function onSubmit(data: OnboardingInput) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to save");
      }

      toast.success("Welcome!");
      router.push("/discover");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-[560px]">
        <div className="mb-6 flex items-center justify-center gap-3">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={cn(
                "size-2.5 rounded-full transition-colors",
                step <= currentStep ? "bg-primary" : "bg-white/10"
              )}
            />
          ))}
        </div>

        <Card className="border-white/[0.06]">
          <CardHeader>
            <CardTitle className="text-xl">{stepTitles[currentStep]}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div key={currentStep} className={direction === "forward" ? "animate-slide-in-right" : "animate-slide-in-left"}>
                {currentStep === 1 && (
                  <StepAbout
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                  />
                )}

                {currentStep === 2 && (
                  <StepInterests
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                  />
                )}

                {currentStep === 3 && (
                  <StepPreferences watch={watch} setValue={setValue} />
                )}
              </div>

              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleBack}
                    size="lg"
                  >
                    <ArrowLeft className="size-4 mr-1" />
                    {t("back")}
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <Button type="button" onClick={handleNext} size="lg">
                    {t("next")}
                    <ArrowRight className="size-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="size-4 mr-1 animate-spin" />
                    ) : (
                      <Check className="size-4 mr-1" />
                    )}
                    {t("completeSetup")}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
