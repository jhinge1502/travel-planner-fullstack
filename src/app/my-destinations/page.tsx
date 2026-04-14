"use client";

import { useEffect, useState, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import { useSupabase } from "@/lib/supabase";
import { MapPin, ArrowUpDown, Filter } from "lucide-react";
import DestinationCard from "@/components/DestinationCard";
import EmptyState from "@/components/EmptyState";
import Link from "next/link";
import type { Destination } from "@/types";

type SortBy = "date" | "name" | "region";
type FilterBy = "all" | "visited" | "not-visited";

export default function MyDestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [filterBy, setFilterBy] = useState<FilterBy>("all");
  const { isSignedIn, user } = useUser();
  const supabase = useSupabase();

  const filtered = useMemo(() => {
    let list = [...destinations];
    if (filterBy === "visited") list = list.filter((d) => d.visited);
    if (filterBy === "not-visited") list = list.filter((d) => !d.visited);
    if (sortBy === "name") list.sort((a, b) => a.country_name.localeCompare(b.country_name));
    if (sortBy === "region") list.sort((a, b) => (a.region || "").localeCompare(b.region || ""));
    // "date" is default order from Supabase (created_at desc)
    return list;
  }, [destinations, sortBy, filterBy]);

  useEffect(() => {
    if (!isSignedIn || !user) return;

    async function fetchDestinations() {
      const { data } = await supabase
        .from("destinations")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });

      setDestinations(data || []);
      setLoading(false);
    }

    fetchDestinations();
  }, [isSignedIn, user, supabase]);

  async function handleRemove(id: number) {
    await supabase.from("destinations").delete().eq("id", id);
    setDestinations((prev) => prev.filter((d) => d.id !== id));
  }

  async function handleToggleVisited(id: number, visited: boolean) {
    await supabase.from("destinations").update({ visited }).eq("id", id);
    setDestinations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, visited } : d))
    );
  }

  async function handleUpdateNotes(id: number, notes: string) {
    await supabase.from("destinations").update({ notes }).eq("id", id);
    setDestinations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, notes } : d))
    );
  }

  if (!isSignedIn) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12 text-center">
        <p className="text-slate-500">Sign in to see your bucket list.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          My Destinations
        </h1>
        <p className="text-slate-500">
          Your travel bucket list &mdash;{" "}
          {destinations.filter((d) => d.visited).length} of{" "}
          {destinations.length} visited.
        </p>
      </div>

      {/* Sort & Filter */}
      {destinations.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700"
            >
              <option value="date">Date Added</option>
              <option value="name">Name</option>
              <option value="region">Region</option>
            </select>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as FilterBy)}
              className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700"
            >
              <option value="all">All</option>
              <option value="visited">Visited</option>
              <option value="not-visited">Not Visited</option>
            </select>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Loading your destinations...</p>
        </div>
      ) : destinations.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title="No destinations yet"
          description="Start exploring countries and save the ones you want to visit."
        >
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
          >
            Explore Countries
          </Link>
        </EmptyState>
      ) : filtered.length === 0 ? (
        <p className="text-center text-sm text-slate-500 py-16">
          No destinations match your filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onRemove={handleRemove}
              onToggleVisited={handleToggleVisited}
              onUpdateNotes={handleUpdateNotes}
            />
          ))}
        </div>
      )}
    </div>
  );
}
