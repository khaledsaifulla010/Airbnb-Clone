/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Menu, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchModal } from "@/components/SearchModal";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  onSearch?: (params: any) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { user, profile, signOut, isAdmin } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login">("login");

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "bn" : "en");
  };

  const handleAuthClick = (mode: "login") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image src='/logo.png' width={90} height={90} alt="/"/>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center space-x-3 bg-white border border-gray-300 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-shadow duration-200 min-w-[300px]"
            >
              <div className="flex-1 text-left">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900">
                    {t("anywhere")}
                  </span>
                  <div className="w-px h-6 bg-gray-300"></div>
                  <span className="text-sm font-medium text-gray-900">
                    {t("any_week")}
                  </span>
                  <div className="w-px h-6 bg-gray-300"></div>
                  <span className="text-sm text-gray-500">
                    {t("add_guests")}
                  </span>
                </div>
              </div>
              <div className="bg-[#FF5A5F] p-2 rounded-full">
                <Search className="w-4 h-4 text-white" />
              </div>
            </button>
          </div>

          {/* Search Button - Mobile */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="lg:hidden flex items-center space-x-2 bg-white border border-gray-300 rounded-full py-2 px-4 shadow-sm"
          >
            <Search className="w-4 h-4" />
            <span className="text-sm">{t("search")}</span>
          </button>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center space-x-1"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {i18n.language === "en" ? "EN" : "বাং"}
              </span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 rounded-full py-1 px-3"
                >
                  <Menu className="w-4 h-4" />
                  <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {user ? (
                  <>
                    {profile && (
                      <div className="px-3 py-2">
                        <p className="text-sm font-medium">
                          {profile.full_name}
                        </p>
                        <p className="text-xs text-gray-500">{profile.email}</p>
                      </div>
                    )}
                    <DropdownMenuSeparator />
                    {isAdmin && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/admin">{t("admin_panel")}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={signOut}>
                      {t("logout")}
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => handleAuthClick("login")}>
                      {t("login")}
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={onSearch}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </header>
  );
}
