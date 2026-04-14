"use client";

import { MapPin, Users, Bookmark, BookmarkCheck } from "lucide-react";
import { Country } from "@/types";
import { formatPopulation } from "@/lib/utils";

export default function CountryCard({
  country,
  isSaved,
  onSave,
  showSave,
}: {
  country: Country;
  isSaved: boolean;
  onSave: (country: Country) => void;
  showSave: boolean;
}) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="aspect-[3/2] overflow-hidden bg-slate-100">
        <img
          src={country.flags.svg}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 text-lg leading-tight mb-1">
          {country.name.common}
        </h3>
        <span className="inline-block text-xs font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full mb-3">
          {country.region}
        </span>
        <div className="space-y-1.5 text-sm text-slate-600">
          {country.capital?.[0] && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {country.capital[0]}
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            {formatPopulation(country.population)}
          </div>
        </div>
        {showSave && (
          <button
            onClick={() => onSave(country)}
            disabled={isSaved}
            className={`mt-3 w-full flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isSaved
                ? "bg-slate-100 text-slate-400 cursor-default"
                : "bg-teal-600 text-white hover:bg-teal-700"
            }`}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-4 h-4" />
                Saved
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                Save to Bucket List
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
