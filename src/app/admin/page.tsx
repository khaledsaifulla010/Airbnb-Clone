/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/Header";
import { AdminPropertyForm } from "@/components/AdminPropertyForm";
import { AdminPropertyList } from "@/components/AdminPropertyList";

export default function AdminPage() {
  const { t } = useTranslation();
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/");
    }
  }, [user, isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FF5A5F]"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const handlePropertySaved = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  const handleEditProperty = (property: any) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t("admin_panel")}
            </h1>
            <p className="text-gray-600 mt-1">{t("manage_properties")}</p>
          </div>

          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#FF5A5F] hover:bg-[#E00007] text-white flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>{t("add_property")}</span>
          </Button>
        </div>

        {showForm ? (
          <AdminPropertyForm
            property={editingProperty}
            onCancel={() => {
              setShowForm(false);
              setEditingProperty(null);
            }}
            onSave={handlePropertySaved}
          />
        ) : (
          <AdminPropertyList onEdit={handleEditProperty} />
        )}
      </main>
    </div>
  );
}
