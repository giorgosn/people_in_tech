"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const t = useTranslations("discover");

  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={t("searchPlaceholder")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full bg-card border-white/[0.06] pl-11 text-sm transition-all duration-150 focus:border-white/[0.12] focus:bg-surface-2 focus:ring-1 focus:ring-white/10"
      />
    </div>
  );
}
