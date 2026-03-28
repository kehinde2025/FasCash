"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <nav className="w-full sticky top-0 z-50 bg-gradient-to-r from-green-600 via-green-700 to-green-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
      {/* Icon: lightning bolt for speed */}
      <div className="bg-amber-400 rounded-full w-8 h-8 flex items-center justify-center shadow-md">
        <svg
          className="w-4 h-4 text-green-800"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>

      {/* Brand Name */}
      <span className="text-xl font-bold text-white select-none">
        FastCash
      </span>
    </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm text-white hover:text-gray-200 transition">
            Why Choose Us
          </a>
          <a href="#" className="text-sm text-white hover:text-gray-200 transition">
            How It Works
          </a>
          <a href="#Donation" className="text-sm text-white hover:text-gray-200 transition">
            Our Mission
          </a>
          <a href="#faq" className="text-sm text-white hover:text-gray-200 transition">
            FAQs
          </a>

          <button className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-900 transition">
            Get Started — Free & Fast
          </button>
        </div>

        {/* Hamburger Button (ALL screens) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-white"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t p-6 flex flex-col gap-4 md:hidden">
          <a href="#" onClick={() => setOpen(false)}>
            Why Choose Us
          </a>
          <a href="#" onClick={() => setOpen(false)}>
            How It Works
          </a>
          <a href="#" onClick={() => setOpen(false)}>
            Our Mission
          </a>
          <a href="#" onClick={() => setOpen(false)}>
            FAQs
          </a>

          <button className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white p-3 rounded-md mt-4">
            Get Started — Free & Fast
          </button>
        </div>
      )}
    </nav>
  );
}