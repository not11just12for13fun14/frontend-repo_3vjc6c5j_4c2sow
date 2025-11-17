export const STRINGS = {
  en: {
    nav: {
      home: "Home",
      gallery: "Gallery",
      contact: "Contact",
      products: "Products",
      language: "العربية",
    },
    hero: {
      headline: "Premium Custom Curtains",
      sub: "Tailored elegance for every space",
      cta: "Explore Collection",
    },
    products: {
      title: "Curtain Collection",
      viewDetails: "View Details",
      category: "Category",
    },
    services: {
      title: "Services",
      items: [
        "Curtain Installation",
        "Measurement Visit",
        "Fabric Selection Support",
        "Consultation",
        "Motorized Curtains Setup",
        "Custom Curtain Design",
      ],
    },
    contact: {
      title: "Contact",
      name: "Name",
      phone: "Phone",
      message: "Message",
      send: "Send",
      whatsapp: "Chat on WhatsApp",
      success: "Thank you. We will contact you soon.",
    },
    gallery: {
      title: "Gallery",
      filters: {
        all: "All",
        living: "Living Room",
        bedrooms: "Bedrooms",
        majlis: "Majlis",
        offices: "Offices",
        custom: "Custom Projects",
      },
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      gallery: "المعرض",
      contact: "تواصل",
      products: "المنتجات",
      language: "English",
    },
    hero: {
      headline: "ستائر فاخرة حسب الطلب",
      sub: "أناقة مصممة بعناية لكل مساحة",
      cta: "استكشف المجموعة",
    },
    products: {
      title: "مجموعة الستائر",
      viewDetails: "عرض التفاصيل",
      category: "الفئة",
    },
    services: {
      title: "الخدمات",
      items: [
        "تركيب الستائر",
        "زيارة القياس",
        "المساعدة في اختيار الأقمشة",
        "استشارة",
        "تركيب الستائر المتحركة",
        "تصميم ستائر حسب الطلب",
      ],
    },
    contact: {
      title: "تواصل معنا",
      name: "الاسم",
      phone: "الهاتف",
      message: "الرسالة",
      send: "إرسال",
      whatsapp: "التواصل عبر واتساب",
      success: "شكراً لك. سنتواصل معك قريباً.",
    },
    gallery: {
      title: "المعرض",
      filters: {
        all: "الكل",
        living: "غرفة المعيشة",
        bedrooms: "غرف النوم",
        majlis: "مجلس",
        offices: "مكاتب",
        custom: "مشاريع خاصة",
      },
    },
  },
};

export function t(lang, path, fallback = "") {
  try {
    return path.split(".").reduce((acc, key) => acc[key], STRINGS[lang]) || fallback;
  } catch {
    return fallback;
  }
}
