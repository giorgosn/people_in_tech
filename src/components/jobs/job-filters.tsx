"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface JobFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
}

const typeOptions = [
  { value: "ALL", label: "All" },
  { value: "REMOTE", label: "Remote" },
  { value: "HYBRID", label: "Hybrid" },
  { value: "ONSITE", label: "Onsite" },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "company", label: "Company Name" },
];

export function JobFilters({
  search,
  onSearchChange,
  type,
  onTypeChange,
  sort,
  onSortChange,
}: JobFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search jobs by title, company, or location..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-11 w-full pl-10 text-sm"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Type filter chips */}
        <div className="flex flex-wrap items-center gap-2">
          {typeOptions.map((option) => (
            <Button
              key={option.value}
              variant={type === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => onTypeChange(option.value)}
              className="rounded-full text-xs"
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Sort:</span>
          {sortOptions.map((option) => (
            <Button
              key={option.value}
              variant={sort === option.value ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onSortChange(option.value)}
              className="text-xs"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
