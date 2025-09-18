/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";

interface Property {
  id: string;
  title: string;
  title_bn: string;
  location: string;
  location_bn: string;
  price_per_night: number;
  rating: number;
  review_count: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  property_images: Array<{
    id: string;
    image_url: string;
    alt_text: string | null;
  }>;
  categories: {
    name: string;
    name_bn: string;
  } | null;
}

interface PropertyGridProps {
  searchParams?: any;
  selectedCategory?: string | null;
}

export function PropertyGrid({
  searchParams,
  selectedCategory,
}: PropertyGridProps) {
  const { t } = useTranslation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    setPage(0);
    setProperties([]);
    fetchProperties(0, true);
  }, [searchParams, selectedCategory]);

  const fetchProperties = async (
    pageNumber: number,
    reset: boolean = false
  ) => {
    try {
      setLoading(true);

      let query = supabase
        .from("properties")
        .select(
          `
          *,
          property_images (
            id,
            image_url,
            alt_text
          ),
          categories (
            name,
            name_bn
          )
        `
        )
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .range(
          pageNumber * ITEMS_PER_PAGE,
          (pageNumber + 1) * ITEMS_PER_PAGE - 1
        );

      if (selectedCategory) {
        query = query.eq("category_id", selectedCategory);
      }

      if (searchParams?.location) {
        query = query.or(
          `location.ilike.%${searchParams.location}%,location_bn.ilike.%${searchParams.location}%`
        );
      }

      if (searchParams?.guests) {
        query = query.gte("max_guests", searchParams.guests);
      }

      const { data, error } = await query;

      if (error) throw error;

      const newProperties = data || [];

      if (reset) {
        setProperties(newProperties);
      } else {
        setProperties((prev) => [...prev, ...newProperties]);
      }

      setHasMore(newProperties.length === ITEMS_PER_PAGE);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProperties(nextPage);
  };

  if (loading && page === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!loading && properties.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">
            No properties found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <Button
            onClick={loadMore}
            disabled={loading}
            variant="outline"
            className="px-8 py-3"
          >
            {loading ? "Loading..." : "Show more"}
          </Button>
        </div>
      )}
    </div>
  );
}
