const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seed() {
  const themes = [
    {
      id: "minimalist-elegance",
      name: "Minimalist Elegance",
      description: "A clean, modern layout perfect for showcasing high-end rentals without distractions.",
      price: "Free",
      type: "free",
      preview_image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
      icon: "LayoutTemplate",
      config: {
        bgMain: "bg-slate-50",
        bgContent: "bg-white",
        textPrimary: "text-slate-900",
        textSecondary: "text-slate-500",
        accentBg: "bg-indigo-50 border-indigo-100 text-indigo-700",
        accentText: "text-indigo-600",
        btnPrimary: "bg-slate-900 hover:bg-black text-white border-transparent"
      }
    },
    {
      id: "royal-gold",
      name: "Royal Gold",
      description: "A luxurious, gold-accented theme designed specifically for premium bridal boutiques.",
      price: "Rs. 2,000 / mo",
      type: "premium",
      preview_image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
      icon: "Crown",
      config: {
        bgMain: "bg-[#FAF8F5]",
        bgContent: "bg-white",
        textPrimary: "text-amber-950",
        textSecondary: "text-amber-700/70",
        accentBg: "bg-[#D4AF37]/10 border-[#D4AF37]/20 text-[#D4AF37]",
        accentText: "text-[#D4AF37]",
        btnPrimary: "bg-gradient-to-r from-[#C5A880] to-[#D4AF37] hover:from-[#B0926A] hover:to-[#C5A880] text-white border-transparent"
      }
    },
    {
      id: "dark-mode-luxe",
      name: "Dark Mode Luxe",
      description: "An ultra-premium dark theme that makes vibrant colors pop. Perfect for photography studios.",
      price: "Rs. 1,500 / mo",
      type: "premium",
      preview_image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
      icon: "Palette",
      config: {
        bgMain: "bg-slate-950",
        bgContent: "bg-slate-900 border-slate-800",
        textPrimary: "text-white",
        textSecondary: "text-slate-400",
        accentBg: "bg-rose-500/10 border-rose-500/20 text-rose-400",
        accentText: "text-rose-500",
        btnPrimary: "bg-rose-500 hover:bg-rose-600 text-white border-transparent"
      }
    }
  ];

  for (const theme of themes) {
    const { error } = await supabase.from("themes").upsert([theme]);
    if (error) {
      console.error("Failed to seed", theme.id, error.message);
    } else {
      console.log("Seeded", theme.id);
    }
  }
}

seed();
