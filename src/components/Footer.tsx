"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Globe, Instagram, Twitter } from "lucide-react";

export function Footer() {
  const [activeTab, setActiveTab] = useState<"travel" | "apartments">("travel");

  return (
    <footer className=" bg-gray-50 text-sm text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Inspiration Tabs */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Inspiration for future getaways
          </h2>
          <div className="flex space-x-6 border-b mb-6">
            <button
              onClick={() => setActiveTab("travel")}
              className={`pb-2 font-medium ${
                activeTab === "travel"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              Travel tips & inspiration
            </button>
            <button
              onClick={() => setActiveTab("apartments")}
              className={`pb-2 font-medium ${
                activeTab === "apartments"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              Airbnb-friendly apartments
            </button>
          </div>
5
          {activeTab === "travel" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              <div>
                <Link href="#" className="font-medium hover:underline">
                  Family travel hub
                </Link>
                <p className="text-gray-500 text-xs">Tips and inspiration</p>
              </div>
              <div>
                <Link href="#" className="font-medium hover:underline">
                  Family budget travel
                </Link>
                <p className="text-gray-500 text-xs">Get there for less</p>
              </div>
              <div>
                <Link href="#" className="font-medium hover:underline">
                  Vacation ideas for any budget
                </Link>
                <p className="text-gray-500 text-xs">
                  Make it special without making it spendy
                </p>
              </div>
              <div>
                <Link href="#" className="font-medium hover:underline">
                  Travel Europe on a budget
                </Link>
                <p className="text-gray-500 text-xs">
                  How to take the kids to Europe for less
                </p>
              </div>
              <div>
                <Link href="#" className="font-medium hover:underline">
                  Outdoor adventure
                </Link>
                <p className="text-gray-500 text-xs">
                  Explore nature with the family
                </p>
              </div>
              <div>
                <Link href="#" className="font-medium hover:underline">
                  Bucket list national parks
                </Link>
                <p className="text-gray-500 text-xs">
                  Must-see parks for family travel
                </p>
              </div>
            </div>
          )}

          {/* Apartments tab content */}
          {activeTab === "apartments" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              <div>
                <Link href="#" className="font-medium hover:underline">
                  New York
                </Link>
                <p className="text-gray-500 text-xs">
                  Airbnb-friendly apartments
                </p>
              </div>
              <div>
                <Link href="#" className="font-medium hover:underline">
                  Toronto
                </Link>
                <p className="text-gray-500 text-xs">
                  Airbnb-friendly apartments
                </p>
              </div>
              <div>
                <Link href="#" className="font-medium hover:underline">
                  London
                </Link>
                <p className="text-gray-500 text-xs">
                  Airbnb-friendly apartments
                </p>
              </div>
              <div>
                <Link href="#" className="font-medium hover:underline">
                  Sydney
                </Link>
                <p className="text-gray-500 text-xs">
                  Airbnb-friendly apartments
                </p>
              </div>
              <div>
                <Link href="#" className="font-medium hover:underline">
                  Paris
                </Link>
                <p className="text-gray-500 text-xs">
                  Airbnb-friendly apartments
                </p>
              </div>
              <div>
                <Link href="#" className="font-medium hover:underline">
                  Dubai
                </Link>
                <p className="text-gray-500 text-xs">
                  Airbnb-friendly apartments
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-12 border-t pt-8">
          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Get help with a safety issue
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  AirCover
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Anti-discrimination
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Disability support
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Cancellation options
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Report neighborhood concern
                </Link>
              </li>
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h3 className="font-semibold mb-3">Hosting</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  Airbnb your home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Airbnb your experience
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Airbnb your service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  AirCover for Hosts
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Hosting resources
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Community forum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Hosting responsibly
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Airbnb-friendly apartments
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Join a free Hosting class
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Find a co-host
                </Link>
              </li>
            </ul>
          </div>

          {/* Airbnb */}
          <div>
            <h3 className="font-semibold mb-3">Airbnb</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  2025 Summer Release
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Investors
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Gift cards
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Airbnb.org emergency stays
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Left: Copyright & Links */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
            <p>© {new Date().getFullYear()} Airbnb, Inc.</p>
            <span className="hidden md:inline">·</span>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <span className="hidden md:inline">·</span>
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <span className="hidden md:inline">·</span>
            <Link href="#" className="hover:underline">
              Sitemap
            </Link>
            <span className="hidden md:inline">·</span>
            <Link href="#" className="hover:underline">
              Company details
            </Link>
          </div>

          {/* Right: Language, Currency, Social */}
          <div className="flex items-center space-x-6">
            {/* Language & Currency */}
            <button className="flex items-center space-x-1 hover:underline">
              <Globe className="h-4 w-4" />
              <span>English (EN)</span>
            </button>
            <button className="hover:underline">৳ BDT</button>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <Link
                href="#"
                aria-label="Facebook"
                className="hover:text-gray-900"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="hover:text-gray-900"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="hover:text-gray-900"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
