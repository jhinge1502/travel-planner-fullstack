"use client";

import { useState } from "react";
import {
  MapPin,
  Users,
  Trash2,
  Check,
  Plane,
  Pencil,
  X,
  Sparkles,
  Compass,
} from "lucide-react";
import { formatPopulation, formatDate } from "@/lib/utils";
import type { Destination } from "@/types";

export default function DestinationCard({
  destination,
  onRemove,
  onToggleVisited,
  onUpdateNotes,
}: {
  destination: Destination;
  onRemove: (id: number) => void;
  onToggleVisited: (id: number, visited: boolean) => void;
  onUpdateNotes: (id: number, notes: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [notes, setNotes] = useState(destination.notes);

  function handleSaveNotes() {
    onUpdateNotes(destination.id, notes);
    setEditing(false);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="aspect-[3/2] overflow-hidden bg-slate-100 relative">
        {destination.flag_url && (
          <img
            src={destination.flag_url}
            alt={`Flag of ${destination.country_name}`}
            className="w-full h-full object-cover"
          />
        )}
        {destination.visited && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded-full">
            <Check className="w-3 h-3" />
            Visited
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 text-lg leading-tight mb-1">
          {destination.country_name}
        </h3>
        {destination.region && (
          <span className="inline-block text-xs font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full mb-3">
            {destination.region}
          </span>
        )}
        <div className="space-y-1.5 text-sm text-slate-600 mb-3">
          {destination.capital && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {destination.capital}
            </div>
          )}
          {destination.population && (
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              {formatPopulation(destination.population)}
            </div>
          )}
        </div>

        {/* Recommendation */}
        {destination.recommended_city && (
          <div className="rounded-lg bg-amber-50 border border-amber-100 px-3 py-2.5 mb-3">
            <div className="flex items-center gap-1.5 text-amber-700 text-xs font-semibold mb-1.5">
              <Sparkles className="w-3 h-3" />
              Recommended Start
            </div>
            <div className="flex items-start gap-1.5 text-sm text-amber-900 mb-1">
              <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-600" />
              <span className="font-medium">{destination.recommended_city}</span>
            </div>
            {destination.recommended_activity && (
              <div className="flex items-start gap-1.5 text-xs text-amber-700">
                <Compass className="w-3 h-3 mt-0.5 shrink-0 text-amber-500" />
                <span>{destination.recommended_activity}</span>
              </div>
            )}
          </div>
        )}

        {/* Notes */}
        {editing ? (
          <div className="mb-3">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Why do you want to visit?"
              rows={2}
              className="input-field text-sm resize-none"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSaveNotes}
                className="text-xs font-medium text-teal-600 hover:text-teal-700"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setNotes(destination.notes);
                  setEditing(false);
                }}
                className="text-xs font-medium text-slate-400 hover:text-slate-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : destination.notes ? (
          <p
            onClick={() => setEditing(true)}
            className="text-sm text-slate-500 italic mb-3 cursor-pointer hover:text-slate-700"
          >
            &ldquo;{destination.notes}&rdquo;
          </p>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-teal-600 mb-3"
          >
            <Pencil className="w-3 h-3" />
            Add notes
          </button>
        )}

        <p className="text-xs text-slate-400 mb-3">
          Added {formatDate(destination.created_at)}
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() =>
              onToggleVisited(destination.id, !destination.visited)
            }
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              destination.visited
                ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {destination.visited ? (
              <>
                <X className="w-3.5 h-3.5" />
                Unmark
              </>
            ) : (
              <>
                <Plane className="w-3.5 h-3.5" />
                Mark Visited
              </>
            )}
          </button>
          <button
            onClick={() => onRemove(destination.id)}
            className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
