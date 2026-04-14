import { Globe, MapPin, Plane } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center max-w-2xl">
        <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6">
          <Globe className="w-10 h-10 text-teal-600" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
          Travel Planner
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Explore countries around the world, save your dream destinations, and
          see where others want to go.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
          >
            <MapPin className="w-5 h-5" />
            Explore Countries
          </Link>
          <Link
            href="/my-destinations"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
          >
            <Plane className="w-5 h-5" />
            My Bucket List
          </Link>
        </div>
      </div>
    </div>
  );
}
