"use client";

import { useEffect } from "react";
import { Sparkles, X, MapPin, Compass } from "lucide-react";

export default function RecommendationToast({
  countryName,
  city,
  activity,
  onClose,
}: {
  countryName: string;
  city: string;
  activity: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 12000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-slide-in">
      <div className="rounded-xl border border-amber-200 bg-amber-50 shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm">
            <Sparkles className="w-4 h-4" />
            Get Your Trip Started!
          </div>
          <button
            onClick={onClose}
            className="text-amber-400 hover:text-amber-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-4 pb-4 pt-1">
          <p className="text-xs text-amber-600 mb-2">
            You saved <span className="font-semibold">{countryName}</span> — here&apos;s a popular way to start:
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2 bg-white rounded-lg px-3 py-2 border border-amber-100">
              <MapPin className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Top City</p>
                <p className="text-sm font-semibold text-slate-800">{city}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-white rounded-lg px-3 py-2 border border-amber-100">
              <Compass className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Must-Do Activity</p>
                <p className="text-sm text-slate-700">{activity}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
