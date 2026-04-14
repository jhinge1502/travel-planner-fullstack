"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { Globe, MapPin, Users, Plane } from "lucide-react";
import StatCard from "@/components/StatCard";
import Link from "next/link";
import type { Destination } from "@/types";

export default function HomePage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      const { data } = await getSupabase()
        .from("destinations")
        .select("*")
        .order("created_at", { ascending: false });

      setDestinations(data || []);
      setLoading(false);
    }

    fetchAll();
  }, []);

  const uniqueCountries = new Set(destinations.map((d) => d.country_code)).size;
  const uniqueTravelers = new Set(destinations.map((d) => d.user_id)).size;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
          <Globe className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3">
          Travel Planner
        </h1>
        <p className="text-lg text-slate-500 max-w-xl mx-auto mb-6">
          A shared bucket list &mdash; see where everyone wants to go, and start
          building your own.
        </p>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
        >
          <MapPin className="w-5 h-5" />
          Start Exploring
        </Link>
      </div>

      {/* Stats */}
      {!loading && destinations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <StatCard
            icon={MapPin}
            label="Destinations saved"
            value={destinations.length}
          />
          <StatCard
            icon={Globe}
            label="Unique countries"
            value={uniqueCountries}
          />
          <StatCard
            icon={Users}
            label="Travelers"
            value={uniqueTravelers}
          />
        </div>
      )}

      {/* Community destinations */}
      {loading ? (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Loading community destinations...</p>
        </div>
      ) : destinations.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-8 py-16 text-center">
          <p className="font-[family-name:var(--font-playfair)] text-lg text-slate-500">
            No destinations yet.
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Be the first to save a destination!
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-slate-900 mb-5">
            Community Bucket List
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="group rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="aspect-[3/2] overflow-hidden bg-slate-100">
                  {dest.flag_url && (
                    <img
                      src={dest.flag_url}
                      alt={`Flag of ${dest.country_name}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-slate-900 text-sm leading-tight">
                    {dest.country_name}
                  </h3>
                  {dest.region && (
                    <span className="inline-block text-[10px] font-medium text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded-full mt-1">
                      {dest.region}
                    </span>
                  )}
                  {dest.visited && (
                    <div className="flex items-center gap-1 mt-1.5 text-amber-600 text-[10px] font-medium">
                      <Plane className="w-3 h-3" />
                      Visited
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
