/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Search, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch?: (params: any) => void;
}

interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export function SearchModal({ isOpen, onClose, onSearch }: SearchModalProps) {
  const { t } = useTranslation();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState<GuestCounts>({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [activeTab, setActiveTab] = useState<
    "where" | "checkin" | "checkout" | "guests"
  >("where");

  const handleGuestChange = (type: keyof GuestCounts, increment: boolean) => {
    setGuests((prev) => {
      const newCount = increment ? prev[type] + 1 : Math.max(0, prev[type] - 1);

      if (type === "adults" && newCount < 1) return prev; 

      return { ...prev, [type]: newCount };
    });
  };

  const getTotalGuests = () => guests.adults + guests.children;

  const handleSearch = () => {
    const searchParams = {
      location: location.trim(),
      checkIn,
      checkOut,
      guests: getTotalGuests(),
      adults: guests.adults,
      children: guests.children,
      infants: guests.infants,
      pets: guests.pets,
    };
    onSearch?.(searchParams);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        
        <VisuallyHidden>
          <DialogTitle>Search Modal</DialogTitle>
        </VisuallyHidden>

        <div className="bg-white">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-center">
              <div className="flex bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setActiveTab("where")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === "where"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t("where_to")}
                </button>
                <button
                  onClick={() => setActiveTab("checkin")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === "checkin"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t("check_in")}
                </button>
                <button
                  onClick={() => setActiveTab("checkout")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === "checkout"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t("check_out")}
                </button>
                <button
                  onClick={() => setActiveTab("guests")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === "guests"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t("who")}
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === "where" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t("where_to")}</h3>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search destinations"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 py-3 text-lg"
                  />
                </div>
              </div>
            )}

            {activeTab === "checkin" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t("check_in")}</h3>
                <CalendarComponent
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={{ before: new Date() }}
                  className="rounded-md border"
                />
              </div>
            )}

            {activeTab === "checkout" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t("check_out")}</h3>
                <CalendarComponent
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={{ before: checkIn || new Date() }}
                  className="rounded-md border"
                />
              </div>
            )}

            {activeTab === "guests" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">{t("who")}</h3>

                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{t("adults")}</div>
                    <div className="text-sm text-gray-500">
                      Ages 13 or above
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0 rounded-full"
                      onClick={() => handleGuestChange("adults", false)}
                      disabled={guests.adults <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center">{guests.adults}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0 rounded-full"
                      onClick={() => handleGuestChange("adults", true)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{t("children")}</div>
                    <div className="text-sm text-gray-500">Ages 2–12</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0 rounded-full"
                      onClick={() => handleGuestChange("children", false)}
                      disabled={guests.children <= 0}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center">{guests.children}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0 rounded-full"
                      onClick={() => handleGuestChange("children", true)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Infants */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{t("infants")}</div>
                    <div className="text-sm text-gray-500">Under 2</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0 rounded-full"
                      onClick={() => handleGuestChange("infants", false)}
                      disabled={guests.infants <= 0}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center">{guests.infants}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0 rounded-full"
                      onClick={() => handleGuestChange("infants", true)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Pets */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{t("pets")}</div>
                    <div className="text-sm text-gray-500">
                      Bringing a service animal?
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0 rounded-full"
                      onClick={() => handleGuestChange("pets", false)}
                      disabled={guests.pets <= 0}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center">{guests.pets}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0 rounded-full"
                      onClick={() => handleGuestChange("pets", true)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50 flex justify-end">
            <Button
              onClick={handleSearch}
              className="bg-[#FF5A5F] hover:bg-[#E00007] text-white px-8 py-3 rounded-lg flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>{t("search")}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
