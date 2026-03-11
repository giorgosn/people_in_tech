"use client";

import { useTranslations } from "next-intl";
import { EventCard, type EventCardData } from "@/components/shared/event-card";
import { Calendar } from "lucide-react";

export function EventsTab({ events }: { events: EventCardData[] }) {
  const t = useTranslations("company");

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Calendar className="mb-4 size-12 text-muted-foreground/50" />
        <p className="text-muted-foreground">{t("noEvents")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
