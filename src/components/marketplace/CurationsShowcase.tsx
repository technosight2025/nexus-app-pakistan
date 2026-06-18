"use client"

import { Star, MapPin, ShieldCheck, ArrowRight } from "lucide-react"

export function CurationsShowcase() {
  const items = [
    {
      id: 1,
      title: "The Crystal Pavilion",
      rating: "4.9",
      location: "E-7, Islamabad",
      badge: "PREMIUM",
      tags: ["Architecture", "Verified"],
      image: "/images/pakistani_wedding_venue.png",
    },
    {
      id: 2,
      title: "Rosewood Botanicals",
      rating: "5.0",
      location: "Master Artisan",
      badge: "ARTISAN",
      tags: ["Floral Design", "Verified"],
      image: "/images/pakistani_bride_makeup.png",
    },
  ]

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-sans text-xl font-bold text-foreground">Elite Curations</h2>
        <button className="text-secondary font-bold text-xs flex items-center gap-1 hover:underline group">
          View All 
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-surface rounded-2xl overflow-hidden border border-border shadow-sm group hover:border-primary/20 transition-all flex flex-col justify-between"
          >
            {/* Card Image */}
            <div className="h-48 relative overflow-hidden bg-muted">
              <img
                className="w-full h-full object-cover group-hover:scale-102 transition-all duration-500"
                alt={item.title}
                src={item.image}
              />
              <div className="absolute top-3 right-3 bg-accent text-white px-2.5 py-1 rounded-md text-[9px] font-bold tracking-wider">
                {item.badge}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-primary font-sans group-hover:text-primary-foreground/90 transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center text-accent">
                  <Star className="w-3.5 h-3.5 fill-accent" />
                  <span className="text-xs font-bold ml-1">{item.rating}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {item.id === 1 ? (
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                ) : (
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                )}
                {item.location}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      tag === "Verified"
                        ? "bg-primary-container text-primary border border-primary/10"
                        : "bg-secondary-container text-secondary border border-secondary/10"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
