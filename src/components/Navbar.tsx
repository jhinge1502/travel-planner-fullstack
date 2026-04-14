"use client";

import Link from "next/link";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { Plane } from "lucide-react";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-[family-name:var(--font-playfair)] text-xl font-bold text-teal-700"
        >
          <Plane className="w-5 h-5" />
          Travel Planner
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 transition-colors hover:text-teal-600"
          >
            Home
          </Link>
          <Link
            href="/explore"
            className="text-sm font-medium text-slate-500 transition-colors hover:text-teal-600"
          >
            Explore
          </Link>
          {isSignedIn && (
            <Link
              href="/my-destinations"
              className="text-sm font-medium text-slate-500 transition-colors hover:text-teal-600"
            >
              My Destinations
            </Link>
          )}
          <div className="ml-2 border-l border-slate-200 pl-4">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button className="rounded-lg bg-teal-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-teal-700">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
