"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useSupabase } from "@/lib/supabase";
import {
  ArrowLeft,
  MapPin,
  Users,
  Globe,
  Clock,
  Languages,
  Coins,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { formatPopulation } from "@/lib/utils";
import type { Country } from "@/types";

export default function CountryDetailPage() {
  const params = useParams();
  const code = params.code as string;
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const { isSignedIn, user } = useUser();
  const supabase = useSupabase();

  useEffect(() => {
    async function fetchCountry() {
      const res = await fetch(
        `https://restcountries.com/v3.1/alpha/${encodeURIComponent(code)}?fields=name,cca3,flags,region,subregion,capital,population,languages,currencies,continents,maps,timezones,latlng`
      );
      if (res.ok) {
        const data = await res.json();
        setCountry(Array.isArray(data) ? data[0] : data);
      }
      setLoading(false);
    }
    fetchCountry();
  }, [code]);

  useEffect(() => {
    if (!isSignedIn || !user) return;
    async function checkSaved() {
      const { data } = await supabase
        .from("destinations")
        .select("id")
        .eq("user_id", user!.id)
        .eq("country_code", code);
      if (data && data.length > 0) setSaved(true);
    }
    checkSaved();
  }, [isSignedIn, user, code, supabase]);

  async function handleSave() {
    if (!isSignedIn || !user || !country) return;
    setSaving(true);
    const { error } = await supabase.from("destinations").insert({
      user_id: user.id,
      country_code: country.cca3,
      country_name: country.name.common,
      flag_url: country.flags.svg,
      region: country.region,
      capital: country.capital?.[0] || null,
      population: country.population,
    });
    if (!error) setSaved(true);
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="text-center py-24">
        <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500 text-sm">Loading country details...</p>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="text-center py-24">
        <p className="text-slate-500">Country not found.</p>
        <Link href="/explore" className="text-teal-600 hover:underline text-sm mt-2 inline-block">
          Back to Explore
        </Link>
      </div>
    );
  }

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : null;
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol})`)
        .join(", ")
    : null;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href="/explore"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Explore
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        {/* Flag banner */}
        <div className="aspect-[2/1] max-h-64 overflow-hidden bg-slate-100">
          <img
            src={country.flags.svg}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">
                {country.name.common}
              </h1>
              <p className="text-slate-500">{country.name.official}</p>
            </div>
            {isSignedIn && (
              <button
                onClick={handleSave}
                disabled={saved || saving}
                className={`shrink-0 flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${
                  saved
                    ? "bg-slate-100 text-slate-400"
                    : "bg-teal-600 text-white hover:bg-teal-700"
                }`}
              >
                {saved ? (
                  <>
                    <BookmarkCheck className="w-4 h-4" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    {saving ? "Saving..." : "Save to Bucket List"}
                  </>
                )}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoRow icon={Globe} label="Region" value={`${country.region}${country.subregion ? ` / ${country.subregion}` : ""}`} />
            {country.capital?.[0] && (
              <InfoRow icon={MapPin} label="Capital" value={country.capital[0]} />
            )}
            <InfoRow icon={Users} label="Population" value={formatPopulation(country.population)} />
            {languages && (
              <InfoRow icon={Languages} label="Languages" value={languages} />
            )}
            {currencies && (
              <InfoRow icon={Coins} label="Currencies" value={currencies} />
            )}
            {country.timezones && (
              <InfoRow icon={Clock} label="Timezones" value={country.timezones.join(", ")} />
            )}
          </div>

          {country.maps?.googleMaps && (
            <a
              href={country.maps.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-6 text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              View on Google Maps
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-slate-50 px-4 py-3">
      <Icon className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
      <div>
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="text-sm text-slate-700">{value}</p>
      </div>
    </div>
  );
}
