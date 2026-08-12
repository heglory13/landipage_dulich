"use client";

import { Search } from "lucide-react";
import { useId, useMemo, useState } from "react";

type Suggestion = { title: string; area?: string };

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
}

export function CategorySearch({ suggestions, defaultValue = "", hidden = {} }: { suggestions: Suggestion[]; defaultValue?: string; hidden?: Record<string, string> }) {
  const listId = useId();
  const [value, setValue] = useState(defaultValue);
  const matches = useMemo(() => {
    const keyword = normalize(value);
    if (!keyword) return [];
    return suggestions.filter((item) => normalize(`${item.title} ${item.area ?? ""}`).includes(keyword)).slice(0, 8);
  }, [suggestions, value]);

  return <form className="relative flex w-full gap-2 md:w-auto">
    {Object.entries(hidden).map(([name, item]) => <input key={name} type="hidden" name={name} value={item} />)}
    <label className="flex min-w-0 flex-1 items-center border border-border px-4 md:min-w-80">
      <Search className="mr-3 h-5 w-5 text-muted-foreground" />
      <input type="search" name="q" value={value} onChange={(event) => setValue(event.target.value)} list={listId} autoComplete="off" placeholder="제목 또는 지역 검색" className="h-14 w-full bg-transparent text-sm outline-none" />
      <datalist id={listId}>{matches.map((item) => <option key={`${item.title}-${item.area}`} value={item.title}>{item.area}</option>)}</datalist>
    </label>
    <button type="submit" className="bg-foreground px-5 text-sm text-background">검색</button>
  </form>;
}
