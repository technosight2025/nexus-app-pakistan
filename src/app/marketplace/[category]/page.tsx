import { Metadata } from "next"
import { notFound } from "next/navigation"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { MapPin, Star, Filter, ArrowRight } from "lucide-react"
import Link from "next/link"

interface CategoryData {
  title: string
  description: string
  items: Array<{
    id: string
    name: string
    location: string
    rating: number
    reviews: number
    price: string
    image: string
    tags: string[]
  }>
}

const CATEGORY_MAP: Record<string, CategoryData> = {
  "marriage-halls": {
    title: "Marriage Halls",
    description: "Discover premium marriage halls and banquets for your perfect day.",
    items: [
      { id: "1", name: "Royal Palm Banquet", location: "Lahore", rating: 4.8, reviews: 124, price: "From Rs. 500,000", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80", tags: ["Indoor", "Catering"] },
      { id: "2", name: "Monal Marquee", location: "Islamabad", rating: 4.9, reviews: 342, price: "From Rs. 800,000", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80", tags: ["Outdoor", "Scenic"] }
    ]
  },
  "farmhouses": {
    title: "Farmhouses",
    description: "Exclusive farmhouses for intimate gatherings and grand celebrations.",
    items: [
      { id: "1", name: "Green Acres Farm", location: "Bedian Road, Lahore", rating: 4.7, reviews: 89, price: "From Rs. 200,000", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", tags: ["Pool", "Open Air"] }
    ]
  },
  "hotels": {
    title: "Hotels & Resorts",
    description: "Luxury hotels offering complete event management and stay solutions.",
    items: [
      { id: "1", name: "Pearl Continental", location: "Lahore", rating: 4.9, reviews: 890, price: "Custom Quote", image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80", tags: ["5-Star", "Accommodation"] }
    ]
  },
  "restaurants": {
    title: "Restaurants",
    description: "Fine dining spaces for corporate dinners, birthdays, and small events.",
    items: [
      { id: "1", name: "Haveli Restaurant", location: "Food Street, Lahore", rating: 4.8, reviews: 1200, price: "Per Head: Rs. 3500", image: "https://images.unsplash.com/photo-1505373633519-7d39e76deb2a?w=800&q=80", tags: ["Rooftop", "Traditional"] }
    ]
  },
  "corporate-venues": {
    title: "Corporate Venues",
    description: "Professional spaces for seminars, conferences, and retreats.",
    items: [
      { id: "1", name: "Expo Center", location: "Johar Town, Lahore", rating: 4.5, reviews: 45, price: "Custom Quote", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80", tags: ["Conference", "Large Capacity"] }
    ]
  },
  "photographers": {
    title: "Photographers",
    description: "Capture your most precious moments with Pakistan's elite photographers.",
    items: [
      { id: "1", name: "Aura Photography", location: "Lahore", rating: 5.0, reviews: 210, price: "From Rs. 150,000", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", tags: ["Bridal", "Portraits"] },
      { id: "2", name: "Irfan Ahson Studio", location: "Lahore", rating: 4.9, reviews: 840, price: "From Rs. 400,000", image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80", tags: ["Celebrity", "Premium"] }
    ]
  },
  "videographers": {
    title: "Videographers & Cinematographers",
    description: "Cinematic storytellers to document your events in breathtaking detail.",
    items: [
      { id: "1", name: "Opm Shoots", location: "Karachi", rating: 4.8, reviews: 156, price: "From Rs. 200,000", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80", tags: ["Cinematic", "Drones"] }
    ]
  },
  "makeup-artists": {
    title: "Makeup Artists",
    description: "Top-tier bridal and party makeup artists across the country.",
    items: [
      { id: "1", name: "Kashees", location: "Karachi", rating: 4.8, reviews: 3400, price: "From Rs. 80,000", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", tags: ["Bridal", "Hair"] }
    ]
  },
  "singers": {
    title: "Singers & Bands",
    description: "Live entertainment, qawali, and vocalists to elevate your night.",
    items: [
      { id: "1", name: "Ali Zafar", location: "Nationwide", rating: 5.0, reviews: 540, price: "Custom Quote", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", tags: ["Pop", "Celebrity"] }
    ]
  },
  "djs": {
    title: "DJs",
    description: "Professional DJs with state-of-the-art sound systems.",
    items: [
      { id: "1", name: "DJ Shahrukh", location: "Islamabad", rating: 4.9, reviews: 112, price: "From Rs. 50,000", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80", tags: ["Sound System", "Lighting"] }
    ]
  },
  "studios": {
    title: "Studios",
    description: "Creative studios for pre-wedding shoots, podcasts, and productions.",
    items: [
      { id: "1", name: "The Creative Space", location: "Lahore", rating: 4.7, reviews: 65, price: "Rs. 15,000/hr", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80", tags: ["Indoor", "Props"] }
    ]
  },
  "decorators": {
    title: "Decorators & Event Designers",
    description: "Transform your venues with bespoke floral and structural decor.",
    items: [
      { id: "1", name: "Zainab Events", location: "Lahore", rating: 4.9, reviews: 230, price: "From Rs. 300,000", image: "https://images.unsplash.com/photo-1505373633519-7d39e76deb2a?w=800&q=80", tags: ["Floral", "Thematic"] }
    ]
  },
  "caterers": {
    title: "Caterers",
    description: "Premium culinary experiences, from traditional Daigs to fine dining.",
    items: [
      { id: "1", name: "Nadeem Tikka Catering", location: "Lahore", rating: 4.8, reviews: 670, price: "Per Head: Rs. 2500", image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80", tags: ["Desi", "Live BBQ"] }
    ]
  },
  "planners": {
    title: "Event Planners",
    description: "End-to-end event management, so you can enjoy your day stress-free.",
    items: [
      { id: "1", name: "Jalal Sons Events", location: "Lahore", rating: 4.9, reviews: 180, price: "Custom Quote", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", tags: ["Full Service", "Premium"] }
    ]
  },
  "rentals": {
    title: "Equipment Rentals",
    description: "Rent generators, ACs, furniture, and heavy equipment for your event.",
    items: [
      { id: "1", name: "PowerRent", location: "Nationwide", rating: 4.6, reviews: 34, price: "Varies", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80", tags: ["Generators", "Cooling"] }
    ]
  }
}

// Provide dynamic metadata based on the category
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const categoryData = CATEGORY_MAP[resolvedParams.category]
  
  if (!categoryData) {
    return { title: "Category Not Found | Nexus" }
  }

  return {
    title: `${categoryData.title} | Nexus Marketplace`,
    description: categoryData.description,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params
  const categoryData = CATEGORY_MAP[resolvedParams.category]

  if (!categoryData) {
    notFound()
  }

  return (
    <PublicLayout>
      <div className="bg-[#FAF7F2] min-h-screen pb-20">
        {/* Category Hero */}
        <div className="bg-[#052E20] text-white pt-16 md:pt-24 pb-16 md:pb-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <polygon fill="currentColor" points="0,100 100,0 100,100" />
            </svg>
          </div>
          <div className="max-w-[1280px] mx-auto relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center px-3 py-1 bg-white/10 rounded-full mb-6 text-xs font-bold tracking-widest uppercase">
              Marketplace
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight mb-4 text-[#FDF8F0]">
              {categoryData.title}
            </h1>
            <p className="text-lg md:text-xl text-[#E6F0EC] max-w-2xl font-medium">
              {categoryData.description}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 -mt-8 relative z-20">
          
          {/* Filters Bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 whitespace-nowrap">
                <Filter className="w-4 h-4" /> All Filters
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                Location
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                Price Range
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                Rating 4.5+
              </button>
            </div>
            <div className="hidden md:block text-sm font-bold text-gray-500">
              Showing {categoryData.items.length} result{categoryData.items.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryData.items.map((item) => (
              <Link 
                href={`/marketplace/${resolvedParams.category}/${item.id}`} 
                key={item.id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-[#052E20]/5 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <div className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-black text-[#052E20] flex items-center gap-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-[#052E20]" />
                      {item.rating} <span className="font-medium text-gray-500">({item.reviews})</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    <MapPin className="w-3.5 h-3.5" /> {item.location}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#052E20] transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-md text-[11px] font-semibold border border-gray-100">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Pricing</div>
                      <div className="text-sm font-bold text-[#052E20]">{item.price}</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[#052E20] flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </PublicLayout>
  )
}
