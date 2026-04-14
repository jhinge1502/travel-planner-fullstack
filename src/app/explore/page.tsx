"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useSupabase } from "@/lib/supabase";
import { Search, Globe } from "lucide-react";
import CountryCard from "@/components/CountryCard";
import type { Country } from "@/types";

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [savedCodes, setSavedCodes] = useState<Set<string>>(new Set());
  const { isSignedIn, user } = useUser();
  const supabase = useSupabase();

  // Load all countries on mount
  useEffect(() => {
    fetchAllCountries();
  }, []);

  // Load user's saved destinations
  useEffect(() => {
    if (isSignedIn && user) {
      loadSavedCodes();
    }
  }, [isSignedIn, user]);

  async function fetchAllCountries() {
    setLoading(true);
    try {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,cca3,flags,region,subregion,capital,population,languages,currencies"
      );
      const data = await res.json();
      setCountries(
        data.sort((a: Country, b: Country) =>
          a.name.common.localeCompare(b.name.common)
        )
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadSavedCodes() {
    const { data } = await supabase
      .from("destinations")
      .select("country_code")
      .eq("user_id", user!.id);
    if (data) {
      setSavedCodes(new Set(data.map((d) => d.country_code)));
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) {
      setActiveRegion(null);
      fetchAllCountries();
      return;
    }
    setLoading(true);
    setActiveRegion(null);
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(query)}?fields=name,cca3,flags,region,subregion,capital,population,languages,currencies`
      );
      if (res.ok) {
        const data = await res.json();
        setCountries(data);
      } else {
        setCountries([]);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleRegionFilter(region: string) {
    if (activeRegion === region) {
      setActiveRegion(null);
      fetchAllCountries();
      return;
    }
    setLoading(true);
    setActiveRegion(region);
    setQuery("");
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/region/${encodeURIComponent(region)}?fields=name,cca3,flags,region,subregion,capital,population,languages,currencies`
      );
      const data = await res.json();
      setCountries(
        data.sort((a: Country, b: Country) =>
          a.name.common.localeCompare(b.name.common)
        )
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(country: Country) {
    if (!isSignedIn || !user) return;

    const { error } = await supabase.from("destinations").insert({
      user_id: user.id,
      country_code: country.cca3,
      country_name: country.name.common,
      flag_url: country.flags.svg,
      region: country.region,
      capital: country.capital?.[0] || null,
      population: country.population,
    });

    if (!error) {
      setSavedCodes((prev) => new Set(prev).add(country.cca3));
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Explore Countries
        </h1>
        <p className="text-slate-500">
          Browse the world and save destinations to your bucket list.
        </p>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search countries..."
            className="input-field pl-10"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700 disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Region filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Globe className="w-4 h-4 text-slate-400 self-center mr-1" />
        {REGIONS.map((region) => (
          <button
            key={region}
            onClick={() => handleRegionFilter(region)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeRegion === region
                ? "bg-teal-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Loading countries...</p>
        </div>
      ) : countries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {countries.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              isSaved={savedCodes.has(country.cca3)}
              onSave={handleSave}
              showSave={!!isSignedIn}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-slate-500 py-16">
          No countries found. Try a different search.
        </p>
      )}
    </div>
  );
}
