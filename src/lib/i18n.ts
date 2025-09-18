import { initReactI18next } from "react-i18next";
import i18n from "i18next";

const resources = {
  en: {
    translation: {
      // Header
      airbnb: "Airbnb",
      anywhere: "Anywhere",
      any_week: "Any week",
      add_guests: "Add guests",
      search: "Search",
      login: "Log in",
      sign_up: "Sign up",
      admin_panel: "Admin Panel",
      logout: "Log out",

      // Search
      where_to: "Where to?",
      when: "When?",
      who: "Who?",
      check_in: "Check in",
      check_out: "Check out",
      guests: "Guests",
      adults: "Adults",
      children: "Children",
      infants: "Infants",
      pets: "Pets",

      // Properties
      night: "night",
      total_before_taxes: "Total before taxes",
      new: "New",
      guest_favorite: "Guest favorite",
      beds: "Beds",
      baths: "Baths",
      price_per_night: "Price per Night",

      // Admin
      add_property: "Add Property",
      manage_properties: "Manage Properties",
      property_title: "Property Title",
      property_description: "Property Description",
      location: "Location",
      max_guests: "Max Guests",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      category: "Category",
      amenities: "Amenities",
      images: "Images",
      save_property: "Save Property",
      property_added: "Property added successfully!",
      property_updated: "Property updated successfully!",
      property_deleted: "Property deleted successfully!",
    },
  },
  bn: {
    translation: {
      // Header
      airbnb: "এয়ারবিএনবি",
      anywhere: "যেকোনো জায়গায়",
      any_week: "যেকোনো সপ্তাহ",
      add_guests: "অতিথি যোগ করুন",
      search: "খুঁজুন",
      login: "লগ ইন",
      sign_up: "সাইন আপ",
      admin_panel: "অ্যাডমিন প্যানেল",
      logout: "লগ আউট",

      // Search
      where_to: "কোথায় যাবেন?",
      when: "কখন?",
      who: "কে?",
      check_in: "চেক ইন",
      check_out: "চেক আউট",
      guests: "অতিথি",
      adults: "প্রাপ্তবয়স্ক",
      children: "শিশু",
      infants: "নবজাতক",
      pets: "পোষা প্রাণী",

      // Properties
      night: "রাত",
      total_before_taxes: "কর ছাড়া মোট",
      new: "নতুন",
      guest_favorite: "অতিথিদের পছন্দ",
      beds: "বেড",
      baths: "বাথ",
      price_per_night: "প্রতি রাত",

      // Admin
      add_property: "সম্পত্তি যোগ করুন",
      manage_properties: "সম্পত্তি পরিচালনা করুন",
      property_title: "সম্পত্তির শিরোনাম",
      property_description: "সম্পত্তির বিবরণ",
      location: "অবস্থান",
      max_guests: "সর্বোচ্চ অতিথি",
      bedrooms: "বেডরুম",
      bathrooms: "বাথরুম",
      category: "বিভাগ",
      amenities: "সুবিধা",
      images: "ছবি",
      save_property: "সম্পত্তি সংরক্ষণ করুন",
      property_added: "সম্পত্তি সফলভাবে যোগ করা হয়েছে!",
      property_updated: "সম্পত্তি সফলভাবে আপডেট করা হয়েছে!",
      property_deleted: "সম্পত্তি সফলভাবে মুছে ফেলা হয়েছে!",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
