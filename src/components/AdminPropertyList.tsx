/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  is_active: boolean;
  created_at: string;
  property_images: Array<{
    id: string;
    image_url: string;
  }>;
  categories: {
    name: string;
    name_bn: string;
  } | null;
}

interface AdminPropertyListProps {
  onEdit: (property: Property) => void;
}

export function AdminPropertyList({ onEdit }: AdminPropertyListProps) {
  const { t, i18n } = useTranslation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select(
          `
          *,
          property_images (
            id,
            image_url
          ),
          categories (
            name,
            name_bn
          )
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const togglePropertyStatus = async (
    propertyId: string,
    currentStatus: boolean
  ) => {
    try {
      const { error } = await supabase
        .from("properties")
        .update({ is_active: !currentStatus })
        .eq("id", propertyId);

      if (error) throw error;

      setProperties((prev) =>
        prev.map((property) =>
          property.id === propertyId
            ? { ...property, is_active: !currentStatus }
            : property
        )
      );

      toast.success(
        !currentStatus
          ? "Property activated successfully"
          : "Property deactivated successfully"
      );
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const deleteProperty = async (propertyId: string) => {
    try {
      const { error } = await supabase
        .from("properties")
        .delete()
        .eq("id", propertyId);

      if (error) throw error;

      setProperties((prev) =>
        prev.filter((property) => property.id !== propertyId)
      );
      toast.success(t("property_deleted"));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No properties yet
          </h3>
          <p className="text-gray-600">
            Start by adding your first property to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {properties.map((property) => (
        <Card key={property.id}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              {/* Property Image */}
              <div className="flex-shrink-0">
                {property.property_images.length > 0 ? (
                  <img
                    src={property.property_images[0].image_url}
                    alt={property.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">No Image</span>
                  </div>
                )}
              </div>

              {/* Property Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 truncate">
                      {i18n.language === "bn"
                        ? property.title_bn
                        : property.title}
                    </h3>
                    <p className="text-gray-600 truncate">
                      {i18n.language === "bn"
                        ? property.location_bn
                        : property.location}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {property.categories &&
                        (i18n.language === "bn"
                          ? property.categories.name_bn
                          : property.categories.name)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      ${property.price_per_night}
                      <span className="text-sm text-gray-500 font-normal">
                        /{t("night")}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      {property.max_guests} guests • {property.bedrooms} beds •{" "}
                      {property.bathrooms} baths
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-3">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      property.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {property.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(property)}
                  className="p-2"
                >
                  <Edit className="w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    togglePropertyStatus(property.id, property.is_active)
                  }
                  className="p-2"
                >
                  {property.is_active ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="p-2">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Property</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this property? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteProperty(property.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
