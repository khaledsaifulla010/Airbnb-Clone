/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";

interface PropertyImage {
  id: string;
  image_url: string;
  alt_text: string | null;
}

interface Category {
  name: string;
  name_bn: string;
}

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
  property_images: PropertyImage[];
  categories: Category | null;
}

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { t, i18n } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [emblaRef] = useEmblaCarousel({ loop: true });

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const title = i18n.language === "bn" ? property.title_bn : property.title;
  const location =
    i18n.language === "bn" ? property.location_bn : property.location;

  return (
    <div className="group cursor-pointer space-y-2 border-1 p-2 rounded-xl">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <div className="embla overflow-hidden h-full" ref={emblaRef}>
          <div className="embla__container flex h-full">
            {property.property_images.map((image) => (
              <div key={image.id} className="embla__slide flex-none w-full">
                <img
                  src={image.image_url}
                  alt={image.alt_text || title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 w-8 h-8 p-0 bg-black/30 hover:bg-black/50 rounded-full"
          onClick={handleFavoriteClick}
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-white"
            }`}
          />
        </Button>
        {property.property_images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
            {property.property_images.map((_, index) => (
              <div
                key={index}
                className="w-1.5 h-1.5 bg-white/70 rounded-full"
              />
            ))}
          </div>
        )}
      </div>


      <div className="space-y-1">
        {/* Title + Rating */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 truncate">{title}</h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-current text-gray-900" />
            <span className="text-sm font-medium">
              {property.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm truncate">{location}</p>
        <p className="text-gray-600 text-sm">
          {property.max_guests} {t("guests")} • {property.bedrooms} {t("beds")}{" "}
          • {property.bathrooms} {t("baths")}
        </p>

        <div className="flex items-baseline space-x-1">
          <span className="font-semibold text-gray-900">
            ${property.price_per_night}
          </span>
          <span className="text-gray-600 text-sm">{t("night")}</span>
        </div>
      </div>
    </div>
  );
}
