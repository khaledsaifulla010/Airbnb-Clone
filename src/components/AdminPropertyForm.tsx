/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth"; //
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { X, Check } from "lucide-react";

const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  title_bn: z.string().min(1, "Bengali title is required"),
  description: z.string().optional(),
  description_bn: z.string().optional(),
  category_id: z.string().min(1, "Category is required"),
  price_per_night: z.number().min(1, "Price must be greater than 0"),
  location: z.string().min(1, "Location is required"),
  location_bn: z.string().min(1, "Bengali location is required"),
  max_guests: z.number().min(1, "Max guests must be at least 1"),
  bedrooms: z.number().min(1, "Bedrooms must be at least 1"),
  bathrooms: z.number().min(1, "Bathrooms must be at least 1"),
});

type PropertyForm = z.infer<typeof propertySchema>;

interface Category {
  id: string;
  name: string;
  name_bn: string;
}

interface Amenity {
  id: string;
  name: string;
  name_bn: string;
}

interface AdminPropertyFormProps {
  property?: any;
  onCancel: () => void;
  onSave: () => void;
}

export function AdminPropertyForm({
  property,
  onCancel,
  onSave,
}: AdminPropertyFormProps) {
  const { t, i18n } = useTranslation();
  const { profile } = useAuth(); // ✅ must return { id, email, role }
  const [categories, setCategories] = useState<Category[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PropertyForm>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: property?.title || "",
      title_bn: property?.title_bn || "",
      description: property?.description || "",
      description_bn: property?.description_bn || "",
      category_id: property?.category_id || "",
      price_per_night: property?.price_per_night || 0,
      location: property?.location || "",
      location_bn: property?.location_bn || "",
      max_guests: property?.max_guests || 1,
      bedrooms: property?.bedrooms || 1,
      bathrooms: property?.bathrooms || 1,
    },
  });

  useEffect(() => {
    fetchCategories();
    fetchAmenities();
    if (property) {
      loadPropertyData();
    }
  }, [property]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");
    if (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    }
    setCategories(data || []);
  };

  const fetchAmenities = async () => {
    const { data, error } = await supabase
      .from("amenities")
      .select("*")
      .order("name");
    if (error) {
      console.error("Error fetching amenities:", error);
      toast.error("Failed to load amenities");
    }
    setAmenities(data || []);
  };

  const loadPropertyData = async () => {
    if (!property) return;
    try {
      const { data: imageData, error: imageError } = await supabase
        .from("property_images")
        .select("image_url")
        .eq("property_id", property.id)
        .order("display_order");

      if (imageError) throw imageError;
      setImages(imageData?.map((img) => img.image_url) || []);

      const { data: amenityData, error: amenityError } = await supabase
        .from("property_amenities")
        .select("amenity_id")
        .eq("property_id", property.id);

      if (amenityError) throw amenityError;
      setSelectedAmenities(amenityData?.map((pa) => pa.amenity_id) || []);
    } catch (error) {
      console.error("Error loading property data:", error);
      toast.error("Failed to load property data");
    }
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      setImages((prev) => [...prev, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const onSubmit = async (data: PropertyForm) => {
    if (images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    if (!profile?.id) {
      toast.error("You must be logged in as admin to add properties");
      return;
    }

    setIsLoading(true);
    try {
      let propertyId = property?.id;

      if (property) {
        const { error } = await supabase
          .from("properties")
          .update({
            ...data,
            admin_id: profile.id,
            updated_at: new Date().toISOString(),
          })
          .eq("id", property.id);

        if (error) throw error;
      } else {
        const { data: newProperty, error } = await supabase
          .from("properties")
          .insert({
            ...data,
            is_active: true,
            admin_id: profile.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select("id")
          .single();

        if (error) throw error;
        propertyId = newProperty.id;
      }
      if (propertyId) {
        if (property) {
          await supabase
            .from("property_images")
            .delete()
            .eq("property_id", propertyId);
          await supabase
            .from("property_amenities")
            .delete()
            .eq("property_id", propertyId);
        }

        if (images.length > 0) {
          const { error: imageError } = await supabase
            .from("property_images")
            .insert(
              images.map((imageUrl, index) => ({
                property_id: propertyId!,
                image_url: imageUrl,
                display_order: index,
              }))
            );
          if (imageError) throw imageError;
        }

        if (selectedAmenities.length > 0) {
          const { error: amenityError } = await supabase
            .from("property_amenities")
            .insert(
              selectedAmenities.map((amenityId) => ({
                property_id: propertyId!,
                amenity_id: amenityId,
              }))
            );
          if (amenityError) throw amenityError;
        }
      }

      toast.success(property ? t("property_updated") : t("property_added"));
      onSave();
    } catch (error: any) {
      console.error("Save property error:", error);
      toast.error(error.message || "Failed to save property");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{property ? "Edit Property" : t("Add Property")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">{t("Property Title")} (English)</Label>
              <Input
                id="title"
                {...form.register("title")}
                disabled={isLoading}
              />
              {form.formState.errors.title && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title_bn">{t("Property Title")} (Bengali)</Label>
              <Input
                id="title_bn"
                {...form.register("title_bn")}
                disabled={isLoading}
              />
              {form.formState.errors.title_bn && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.title_bn.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">
                {t("property_description")} (English)
              </Label>
              <Textarea
                id="description"
                {...form.register("description")}
                disabled={isLoading}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description_bn">
                {t("property_description")} (Bengali)
              </Label>
              <Textarea
                id="description_bn"
                {...form.register("description_bn")}
                disabled={isLoading}
                rows={3}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">{t("location")} (English)</Label>
              <Input
                id="location"
                {...form.register("location")}
                disabled={isLoading}
              />
              {form.formState.errors.location && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.location.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location_bn">{t("location")} (Bengali)</Label>
              <Input
                id="location_bn"
                {...form.register("location_bn")}
                disabled={isLoading}
              />
              {form.formState.errors.location_bn && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.location_bn.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price_per_night">{t("price_per_night")}</Label>
              <Input
                id="price_per_night"
                type="number"
                min="1"
                {...form.register("price_per_night", { valueAsNumber: true })}
                disabled={isLoading}
              />
              {form.formState.errors.price_per_night && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.price_per_night.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="max_guests">{t("max_guests")}</Label>
              <Input
                id="max_guests"
                type="number"
                min="1"
                {...form.register("max_guests", { valueAsNumber: true })}
                disabled={isLoading}
              />
              {form.formState.errors.max_guests && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.max_guests.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bedrooms">{t("bedrooms")}</Label>
              <Input
                id="bedrooms"
                type="number"
                min="1"
                {...form.register("bedrooms", { valueAsNumber: true })}
                disabled={isLoading}
              />
              {form.formState.errors.bedrooms && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.bedrooms.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">{t("bathrooms")}</Label>
              <Input
                id="bathrooms"
                type="number"
                min="1"
                {...form.register("bathrooms", { valueAsNumber: true })}
                disabled={isLoading}
              />
              {form.formState.errors.bathrooms && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.bathrooms.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>{t("category")}</Label>
            <Select
              value={form.watch("category_id")}
              onValueChange={(value) => form.setValue("category_id", value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {i18n.language === "bn" ? category.name_bn : category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.category_id && (
              <p className="text-sm text-red-600">
                {form.formState.errors.category_id.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t("amenities")}</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {amenities.map((amenity) => (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity.id}
                    checked={selectedAmenities.includes(amenity.id)}
                    onCheckedChange={() => toggleAmenity(amenity.id)}
                    disabled={isLoading}
                  />
                  <Label htmlFor={amenity.id} className="text-sm">
                    {i18n.language === "bn" ? amenity.name_bn : amenity.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Label>{t("images")}</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter image URL (use Pexels or other stock photo sites)"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={addImage}
                disabled={!newImageUrl.trim() || isLoading}
                variant="outline"
                size="sm"
              >
                <Check className="w-4 h-4" />
              </Button>
            </div>
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={imageUrl}
                      alt={`Property image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      onClick={() => removeImage(index)}
                      disabled={isLoading}
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex space-x-4">
            <Button
              type="submit"
              className="bg-[#FF5A5F] hover:bg-[#E00007]"
            >
              {isLoading
                ? "Saving..."
                : property
                ? "Update Property"
                : t("save_property")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
