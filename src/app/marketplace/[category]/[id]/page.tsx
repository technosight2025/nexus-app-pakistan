import { Metadata } from "next"
import { notFound } from "next/navigation"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { ProfileClient } from "./ProfileClient"

interface ProfileData {
  id: string
  name: string
  category: string
  categoryLabel: string
  rating: number
  reviewsCount: number
  location: string
  tagline: string
  about: string
  priceRange: string
  coverImage: string
  avatarImage: string
  stats: { label: string; value: string }[]
  portfolio: { title: string; tag: string; image: string; id?: string; price?: string; features?: string[]; bookedDates?: string[]; sizes?: string[]; material?: string; }[]
  portfolioTags: string[]
  packages: {
    name: string
    price: string
    description: string
    popular?: boolean
    inclusions: string[]
  }[]
  gear?: string[]
  reviews: {
    author: string
    rating: number
    date: string
    comment: string
  }[]
}

const VENDOR_DETAILS: Record<string, Record<string, ProfileData>> = {
  "photographers": {
    "1": {
      id: "1",
      name: "Aura Photography",
      category: "photographers",
      categoryLabel: "Photographers & Cinematic Artists",
      rating: 5.0,
      reviewsCount: 210,
      location: "Gulberg III, Lahore",
      tagline: "Premium Wedding & Portrait Photojournalism",
      about: "Aura Photography is Lahore's leading high-end boutique photo studio. Founded by award-winning visual storyteller Shafiq Ahmad, we specialize in candid photojournalism, cinematic wedding portraits, and fine-art couple sessions. We travel nationwide to capture your most intimate stories in a timeless, high-contrast aesthetic.",
      priceRange: "From Rs. 150,000",
      coverImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=80",
      avatarImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
      stats: [
        { label: "Experience", value: "10+ Years" },
        { label: "Events Shot", value: "600+ Weddings" },
        { label: "Response", value: "Under 2 Hours" },
        { label: "Elite Team", value: "12 Members" }
      ],
      portfolioTags: ["All", "Portraits", "Wedding", "Mehndi"],
      portfolio: [
        { title: "Bridal Portrait - Zoya & Ali", tag: "Portraits", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80" },
        { title: "Mehndi Dance Floor Energy", tag: "Mehndi", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80" },
        { title: "Baraat Entrance Moment", tag: "Wedding", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80" },
        { title: "Candid Couple Portrait", tag: "Portraits", image: "https://images.unsplash.com/photo-1519225495810-7517c300ea64?w=800&q=80" },
        { title: "Reception Glamour Detail", tag: "Wedding", image: "https://images.unsplash.com/photo-1505373633519-7d39e76deb2a?w=800&q=80" },
        { title: "Sufi Night Lanterns", tag: "Mehndi", image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80" }
      ],
      packages: [
        {
          name: "Classic Story",
          price: "Rs. 150,000",
          description: "Ideal for intimate events or portrait sessions.",
          inclusions: [
            "5 Hours Coverage",
            "1 Lead Photographer",
            "150 Fully Edited High-Res Photos",
            "Digital Gallery Access (1-Year)",
            "1 Standard Keepsake Album"
          ]
        },
        {
          name: "Signature Heritage",
          price: "Rs. 280,000",
          popular: true,
          description: "Our most popular complete wedding coverage package.",
          inclusions: [
            "Full Day Coverage (8 Hours)",
            "2 Senior Photographers (Candid + Traditional)",
            "350 Fully Edited High-Res Photos",
            "Premium Leather-Bound Flush Mount Album",
            "Complimentary Pre-Wedding Couple Shoot",
            "Express Delivery (4 Weeks)"
          ]
        },
        {
          name: "Grand Cinematic",
          price: "Rs. 450,000",
          description: "Ultimate luxury split-coverage across multiple events.",
          inclusions: [
            "Multi-Day Coverage (Up to 3 Days)",
            "3 Elite Photographers including Lead Artist",
            "600+ Edited High-Res Photos",
            "2 Luxury Albums + Parent Albums",
            "Same-Day Edit Slide Show",
            "Professional Studio Lighting Rig"
          ]
        }
      ],
      gear: ["Sony Alpha A7R V (2 units)", "Sony 24-70mm f/2.8 GM II", "Sony 85mm f/1.4 GM", "Profoto B10X Studio Lighting", "DJI Ronin RS3 Pro Gimbal"],
      reviews: [
        { author: "Kamil & Sana", rating: 5, date: "Dec 2025", comment: "Shafiq and his team are magicians! They made us feel so comfortable, and the final pictures look like they are straight out of a luxury magazine. The candid expressions they caught are priceless. Highly recommended!" },
        { author: "Zahra Naqvi", rating: 5, date: "Jan 2026", comment: "Excellent professionalism, they stuck to their timeline perfectly and the editing style is gorgeous—moody yet extremely natural." }
      ]
    }
  },
  "marriage-halls": {
    "1": {
      id: "1",
      name: "Royal Palm Banquet",
      category: "marriage-halls",
      categoryLabel: "Wedding Venues & Banquets",
      rating: 4.8,
      reviewsCount: 124,
      location: "Canal Road, Lahore",
      tagline: "Ultra-Premium Banqueting & Lush Outdoor Settings",
      about: "Royal Palm banquet halls offer the most prestigious venues in Lahore. Boasting gorgeous architectural heights, modern ambient crystal chandeliers, and expansive green lawns, it provides the perfect backdrop for elite weddings and corporate events. Complete in-house catering and design packages are custom tailored for your guests.",
      priceRange: "From Rs. 500,000",
      coverImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=80",
      avatarImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=300&q=80",
      stats: [
        { label: "Capacity", value: "200 - 1500 Guests" },
        { label: "Space Options", value: "3 Indoor Halls" },
        { label: "Parking", value: "300+ Secure Slots" },
        { label: "Catering", value: "Desi, Continental" }
      ],
      portfolioTags: ["All", "Interior", "Table Setup", "Night Shots"],
      portfolio: [
        { title: "Grand Hall Interior Setup", tag: "Interior", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80" },
        { title: "Floral Dining Table Array", tag: "Table Setup", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80" },
        { title: "Lawn Entrance Lighting", tag: "Night Shots", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80" }
      ],
      packages: [
        {
          name: "Standard Hall Rent",
          price: "Rs. 500,000",
          description: "Exclusive hall access for up to 500 guests. Outside catering allowed.",
          inclusions: [
            "6 Hours Exclusive Access",
            "Central Air Conditioning & Heating",
            "State-of-the-Art Sound Rig",
            "Complimentary Valet Parking",
            "Basic Stage & Lighting"
          ]
        },
        {
          name: "Silver Complete Package",
          price: "Rs. 3,500/Head",
          popular: true,
          description: "Hall booking plus our standard traditional Pakistani menu.",
          inclusions: [
            "Traditional Menu (One Dish Option)",
            "Luxury Crystal Backdrop Stage Setup",
            "Bespoke Table Flower Arrangements",
            "Premium Catering Crockery",
            "Red Carpet Welcoming Entry"
          ]
        }
      ],
      reviews: [
        { author: "Hassan Raza", rating: 5, date: "Nov 2025", comment: "The food quality was outstanding, and the hall's internal cooling was pristine despite a warm afternoon. Exceptional customer support from their manager." }
      ]
    }
  },
  "rentals": {
    "prof-lehnga": {
      id: "prof-lehnga",
      name: "Zardozi Lehnga Boutique",
      category: "rentals",
      categoryLabel: "Premium Wardrobe & Lehnga Rental",
      rating: 4.9,
      reviewsCount: 142,
      location: "Gulberg III, Lahore",
      tagline: "Exclusive Designer Bridal & Party Wear Rentals",
      about: "Zardozi Lehnga Boutique offers an exclusive collection of premium bridal and party wear lehngas for rent. Our curated wardrobe features top-tier designer outfits, meticulously maintained and custom-fitted, allowing you to wear your dream dress without the exorbitant price tag. We offer full alteration services and guarantee the perfect fit for your special occasion.",
      priceRange: "From Rs. 15,000",
      coverImage: "/images/wardrobe/1.png",
      avatarImage: "/images/wardrobe/1.png",
      stats: [
        { label: "Collection", value: "300+ Outfits" },
        { label: "Dry Cleaning", value: "Complimentary" },
        { label: "Alterations", value: "Included" },
        { label: "Rental Period", value: "3 - 5 Days" }
      ],
      portfolioTags: ["All", "Bridal", "Groom Wear"],
      portfolio: [
        { 
          title: "Crimson Bridal Set", 
          tag: "Bridal", 
          image: "/images/wardrobe/1.png",
          price: "65,000",
          features: ["Heavy Embroidery", "Includes Dupatta", "Crystals"],
          bookedDates: ["Dec 15", "Dec 20"],
          sizes: ["S", "M", "L"],
          material: "Raw Silk"
        },
        { 
          title: "Emerald Velvet Sherwani", 
          tag: "Groom Wear", 
          image: "/images/wardrobe/2.png",
          price: "25,000",
          features: ["Premium Velvet", "Gold Zari Work"],
          bookedDates: ["Nov 28"],
          sizes: ["M", "L"],
          material: "Velvet"
        },
        { 
          title: "Regal Gold Lehnga", 
          tag: "Bridal", 
          image: "/images/wardrobe/3.png",
          price: "85,000",
          features: ["Kundan Embellished", "Double Dupatta"],
          bookedDates: ["Jan 05", "Jan 12"],
          sizes: ["Custom Fit Available"],
          material: "Tissue & Net"
        },
        { 
          title: "Pastel Walima Gown", 
          tag: "Bridal", 
          image: "/images/wardrobe/4.png",
          price: "45,000",
          features: ["Silver Embroidery", "Trail"],
          material: "Chiffon & Net"
        }
      ],
      packages: [
        {
          name: "Party Wear Rental",
          price: "Rs. 15,000",
          description: "3-day rental for premium party wear outfits.",
          inclusions: [
            "Designer Party Wear Lehnga/Gown",
            "Basic Alterations for Perfect Fit",
            "Professional Dry Cleaning Included",
            "3-Day Rental Period",
            "Protective Garment Bag"
          ]
        },
        {
          name: "Bridal Signature",
          price: "Rs. 65,000",
          popular: true,
          description: "Our most popular bridal rental package.",
          inclusions: [
            "Heavy Bridal Lehnga (Multiple Designers)",
            "Complete Custom Fitting Session",
            "Dual-Dupatta Setting Setup",
            "Premium Packaging & Delivery",
            "4-Day Rental Period",
            "Complimentary Steaming"
          ]
        },
        {
          name: "Royal Bridal Package",
          price: "Rs. 120,000",
          description: "Top-tier luxury bridal ensemble with matching accessories.",
          inclusions: [
            "Elite Designer Bridal Wear",
            "Complimentary Premium Jewelry Set Rental",
            "VIP Private Fitting Sessions",
            "5-Day Rental Period",
            "Matching Potli Bag",
            "Priority Alterations"
          ]
        }
      ],
      gear: ["In-house Tailoring Unit", "Premium Steaming Equipment", "Temperature Controlled Storage", "Bridal Trial Rooms"],
      reviews: [
        { author: "Aisha M.", rating: 5, date: "Feb 2026", comment: "The lehnga I rented looked brand new! The fitting was absolutely perfect, and the customer service made me feel like royalty. Saved me thousands!" },
        { author: "Fatima Noor", rating: 5, date: "Jan 2026", comment: "Incredible selection of designer wear. They altered the dress to fit me flawlessly and the included dry cleaning made returning it so hassle-free." }
      ]
    }
  }
}

// Generates dynamic fallback data if the specific vendor/category combo isn't pre-filled
function getDynamicVendorData(category: string, id: string): ProfileData {
  // Check if we have exact match
  if (VENDOR_DETAILS[category] && VENDOR_DETAILS[category][id]) {
    return VENDOR_DETAILS[category][id]
  }

  // Create human-friendly label mapping
  const categoryLabels: Record<string, string> = {
    "marriage-halls": "Marriage Hall",
    "farmhouses": "Farmhouse Venue",
    "hotels": "Luxury Hotel & Resort",
    "restaurants": "Fine Dining Restaurant",
    "corporate-venues": "Corporate Venue Space",
    "photographers": "Photography Artist",
    "videographers": "Cinematic Videographer",
    "makeup-artists": "Bridal Makeup Artist",
    "singers": "Vocalist & Band",
    "djs": "Sound & DJ Professional",
    "studios": "Production Studio",
    "decorators": "Event Decor Designer",
    "caterers": "Premium Culinary Caterer",
    "planners": "Elite Event Planner",
    "rentals": "Equipment Rental Partner"
  }

  const label = categoryLabels[category] || "Event Partner"
  const formattedCategory = category.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())

  // Return a generic layout tailored to that category
  return {
    id: id,
    name: `Premium ${label} - ${id}`,
    category: category,
    categoryLabel: formattedCategory,
    rating: 4.7,
    reviewsCount: 38,
    location: "Lahore, Pakistan",
    tagline: `Elite ${label.toLowerCase()} services tailored for premium celebrations.`,
    about: `This high-end ${label.toLowerCase()} is verified under the Nexus Partner system. We provide bespoke arrangements, top-tier reliability, and premium service to make your dream event a reality.`,
    priceRange: "Custom Quote",
    coverImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=80",
    avatarImage: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=300&q=80",
    stats: [
      { label: "Verified", value: "Yes" },
      { label: "Satisfaction", value: "98%" },
      { label: "Response", value: "Under 1 Hour" },
      { label: "Location", value: "Lahore" }
    ],
    portfolioTags: ["All", "Work Highlights"],
    portfolio: [
      { title: "Signature Highlight Shoot 1", tag: "Work Highlights", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80" },
      { title: "Signature Highlight Shoot 2", tag: "Work Highlights", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80" },
      { title: "Signature Highlight Shoot 3", tag: "Work Highlights", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80" }
    ],
    packages: [
      {
        name: "Standard Package",
        price: "Price on Request",
        description: "Flexible entry options for customized bookings.",
        inclusions: [
          "Bespoke Consultation",
          "Dedicated Day Coordinator",
          "High Quality Deliverables",
          "Booking Protection Guarantee"
        ]
      }
    ],
    reviews: [
      { author: "Sara Butt", rating: 5, date: "Oct 2025", comment: "Bespoke setups and prompt responses. Highly professional experience from begining to end." }
    ]
  }
}

// Generate dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ category: string; id: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const vendor = getDynamicVendorData(resolvedParams.category, resolvedParams.id)

  return {
    title: `${vendor.name} | Nexus Marketplace`,
    description: vendor.tagline,
  }
}

// Server Component Page entry
export default async function VendorProfilePage({ params }: { params: Promise<{ category: string; id: string }> }) {
  const resolvedParams = await params
  const vendor = getDynamicVendorData(resolvedParams.category, resolvedParams.id)

  if (!vendor) {
    notFound()
  }

  return (
    <PublicLayout>
      <ProfileClient vendor={vendor} />
    </PublicLayout>
  )
}
