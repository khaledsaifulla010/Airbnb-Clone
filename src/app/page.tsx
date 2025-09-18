/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { PropertyGrid } from "@/components/PropertyGrid";
import "react-toastify/dist/ReactToastify.css";
import "@/lib/i18n";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const [searchParams, setSearchParams] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (params: any) => {
    setSearchParams(params);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={handleSearch} />
      <PropertyGrid
        searchParams={searchParams}
        selectedCategory={selectedCategory}
      />
      <Footer/>
    </div>
  );
}
