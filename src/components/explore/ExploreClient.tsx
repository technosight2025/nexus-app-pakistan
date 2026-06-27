"use client"

import React, { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Globe, Menu, User, SlidersHorizontal, Heart, 
  Star, ChevronLeft, ChevronRight, Map, List, Plus, Minus, X, Calendar, MapPin, Plane, ShoppingBag, Check
} from 'lucide-react'
import { NexusLogo } from '@/components/layout/NexusLogo'
import { HeaderSearchCapsule } from '@/components/layout/HeaderSearchCapsule'
import { useFavorites } from '@/contexts/FavoritesContext'
import { FavoritesTray } from '@/components/marketplace/FavoritesTray'

// Define Categories with Lucide-Icons
interface CategoryItem {
  id: string
  name: string
  icon: string
  subcategories: { id: string, name: string }[]
}

const CATEGORIES: CategoryItem[] = [
  // VENUES
  { 
    id: 'halls', name: 'Banquet Halls', icon: '🏛️',
    subcategories: [{ id: 'all_halls', name: 'All Halls' }, { id: 'luxury_halls', name: 'Luxury' }, { id: 'budget_halls', name: 'Budget-Friendly' }, { id: 'indoor_halls', name: 'Indoor Only' }]
  },
  { 
    id: 'marquees', name: 'Marquees', icon: '⛺',
    subcategories: [{ id: 'all_marquees', name: 'All Marquees' }, { id: 'ac_marquees', name: 'Air Conditioned' }, { id: 'glass_marquees', name: 'Glass Marquees' }, { id: 'outdoor_marquees', name: 'Open Air' }]
  },
  { 
    id: 'farmhouses', name: 'Farmhouses', icon: '🏡',
    subcategories: [{ id: 'all_farmhouses', name: 'All Farmhouses' }, { id: 'pool_farmhouses', name: 'With Pool' }, { id: 'stay_farmhouses', name: 'Overnight Stay' }, { id: 'event_farmhouses', name: 'Large Events' }]
  },
  { 
    id: 'lawns', name: 'Outdoor Lawns', icon: '🌳',
    subcategories: [{ id: 'all_lawns', name: 'All Lawns' }, { id: 'garden_lawns', name: 'Botanical Gardens' }, { id: 'lake_lawns', name: 'Lake View' }, { id: 'hotel_lawns', name: 'Hotel Lawns' }]
  },
  { 
    id: 'restaurants', name: 'Restaurants', icon: '🍽️',
    subcategories: [{ id: 'all_restaurants', name: 'All Restaurants' }, { id: 'fine_dining', name: 'Fine Dining' }, { id: 'rooftop', name: 'Rooftop' }, { id: 'private_rooms', name: 'Private Rooms' }]
  },
  { 
    id: 'historical', name: 'Heritage Sites', icon: '🕌',
    subcategories: [{ id: 'all_historical', name: 'All Sites' }, { id: 'forts', name: 'Forts' }, { id: 'havelis', name: 'Havelis' }, { id: 'museums', name: 'Museums' }]
  },

  // VENDORS
  { 
    id: 'catering', name: 'Catering', icon: '🍲',
    subcategories: [{ id: 'all_catering', name: 'All Catering' }, { id: 'desi_catering', name: 'Desi Traditional' }, { id: 'continental_catering', name: 'Continental' }, { id: 'live_cooking', name: 'Live Stations' }]
  },
  { 
    id: 'decor', name: 'Event Decor', icon: '✨',
    subcategories: [{ id: 'all_decor', name: 'All Decorators' }, { id: 'floral', name: 'Floral Arrangements' }, { id: 'lighting', name: 'Lighting & AV' }, { id: 'thematic', name: 'Thematic Setup' }]
  },
  { 
    id: 'suits', name: 'Apparel', icon: '👗',
    subcategories: [{ id: 'all_suits', name: 'All Attire' }, { id: 'bridal_suits', name: 'Bridal Lehngas' }, { id: 'groom_suits', name: 'Sherwanis' }, { id: 'party_suits', name: 'Party Wear' }]
  },
  { 
    id: 'jewelry', name: 'Jewelry', icon: '💎',
    subcategories: [{ id: 'all_jewelry', name: 'All Jewelry' }, { id: 'bridal_sets', name: 'Bridal Sets' }, { id: 'artificial', name: 'Artificial & Imitation' }, { id: 'gold', name: 'Gold & Diamond' }]
  },
  { 
    id: 'invitations', name: 'Invitations', icon: '💌',
    subcategories: [{ id: 'all_invites', name: 'All Invites' }, { id: 'digital', name: 'Digital & Video' }, { id: 'traditional', name: 'Traditional Cards' }, { id: 'luxury_boxes', name: 'Luxury Boxes' }]
  },
  { 
    id: 'cars', name: 'Transport', icon: '🚗',
    subcategories: [{ id: 'all_cars', name: 'All Transport' }, { id: 'vintage_cars', name: 'Vintage Classics' }, { id: 'suv_cars', name: 'Premium SUVs' }, { id: 'limo_cars', name: 'Limousines' }]
  },
  { 
    id: 'gifts', name: 'Gifts & Favors', icon: '🎁',
    subcategories: [{ id: 'all_gifts', name: 'All Gifts' }, { id: 'bidh', name: 'Bidh Boxes' }, { id: 'giveaways', name: 'Giveaways' }, { id: 'mithai', name: 'Mithai Packaging' }]
  },

  // PROFESSIONALS
  { 
    id: 'photographers', name: 'Photography', icon: '📸',
    subcategories: [{ id: 'all_photo', name: 'All Studios' }, { id: 'wedding_photo', name: 'Wedding Photography' }, { id: 'cinematography', name: 'Cinematography' }, { id: 'drone', name: 'Drone Coverage' }]
  },
  { 
    id: 'salons', name: 'Bridal Salons', icon: '💄',
    subcategories: [{ id: 'all_salons', name: 'All Salons' }, { id: 'makeup_salons', name: 'Bridal Makeup' }, { id: 'hair_salons', name: 'Hair Styling' }, { id: 'spa_salons', name: 'Spa & Relax' }]
  },
  { 
    id: 'planners', name: 'Event Planners', icon: '📋',
    subcategories: [{ id: 'all_planners', name: 'All Planners' }, { id: 'full_service', name: 'Full Service' }, { id: 'day_of', name: 'Day-of Coordination' }, { id: 'destination', name: 'Destination Weddings' }]
  },
  { 
    id: 'mehendi', name: 'Mehendi Artists', icon: '🌿',
    subcategories: [{ id: 'all_mehendi', name: 'All Artists' }, { id: 'bridal_mehendi', name: 'Bridal Mehendi' }, { id: 'party_mehendi', name: 'Party Mehendi' }, { id: 'arabic', name: 'Arabic Designs' }]
  },
  { 
    id: 'djs', name: 'DJs & Music', icon: '🎵',
    subcategories: [{ id: 'all_djs', name: 'All Entertainment' }, { id: 'djs', name: 'Club DJs' }, { id: 'live_bands', name: 'Live Bands' }, { id: 'qawwali', name: 'Qawwali Nights' }]
  },
  { 
    id: 'choreographers', name: 'Choreographers', icon: '💃',
    subcategories: [{ id: 'all_choreo', name: 'All Choreographers' }, { id: 'mehndi_dances', name: 'Mehndi Dances' }, { id: 'couple_dance', name: 'Couple First Dance' }, { id: 'flash_mobs', name: 'Flash Mobs' }]
  },
  { 
    id: 'stages', name: 'Stages & Sets', icon: '👑',
    subcategories: [{ id: 'all_stages', name: 'All Stages' }, { id: 'floral_stages', name: 'Floral Décor' }, { id: 'royal_stages', name: 'Royal Setup' }, { id: 'modern_stages', name: 'Modern Minimal' }]
  },
  { 
    id: 'rentals', name: 'Equipment Rentals', icon: '🎥',
    subcategories: [{ id: 'all_rentals', name: 'All Rentals' }, { id: 'camera_gear', name: 'Cameras & Lenses' }, { id: 'lighting_gear', name: 'Lighting Kits' }, { id: 'audio_gear', name: 'Audio & Mics' }]
  }
]

// Mock Listings Data
interface ExploreListing {
  id: string
  title: string
  category: string
  location: string
  rating: number
  distance: string
  dates: string
  price: number
  unit: string
  images: string[]
  lat: number
  lng: number
  maxGuests?: number
  bookedDates?: string[]
}

const MOCK_LISTINGS: ExploreListing[] = [
  {
    id: 'l-1',
    title: "Royal Palm Grand Ballroom",
    category: "halls",
    location: "DHA Phase 5, Lahore",
    rating: 4.92,
    distance: "12 km away",
    dates: "Oct 12 – 17",
    price: 350000,
    unit: "day",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507504038482-76210374c27d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop"
    ],
    lat: 31.47,
    lng: 74.38,
    maxGuests: 1200,
    bookedDates: ["2026-06-20", "2026-06-21", "2026-06-22"]
  },
  {
    id: 'l-rental-1',
    title: "Cinematic 4K Camera Package",
    category: "rentals",
    location: "Gulberg III, Lahore",
    rating: 4.95,
    distance: "5 km away",
    dates: "Available Today",
    price: 15000,
    unit: "day",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?q=80&w=600&auto=format&fit=crop"
    ],
    lat: 31.52,
    lng: 74.34
  },
  {
    id: 'l-2',
    title: "Monal Scenic Marquee",
    category: "marquees",
    location: "Margalla Hills, Islamabad",
    rating: 4.88,
    distance: "8 km away",
    dates: "Nov 02 – 07",
    price: 450000,
    unit: "day",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519225495810-7512c696af05?q=80&w=600&auto=format&fit=crop"
    ],
    lat: 33.72,
    lng: 73.06,
    maxGuests: 800,
    bookedDates: ["2026-06-24", "2026-06-25"]
  },
  {
    id: 'l-3',
    title: "Green Meadows Farmhouse",
    category: "farmhouses",
    location: "Bedian Road, Lahore",
    rating: 4.75,
    distance: "24 km away",
    dates: "Sep 20 – 25",
    price: 180000,
    unit: "night",
    images: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
    ],
    lat: 31.40,
    lng: 74.45,
    maxGuests: 250,
    bookedDates: ["2026-06-18", "2026-06-19"]
  },
  {
    id: 'l-4',
    title: "Zardozi Boutique Lehnga Suite",
    category: "suits",
    location: "Gulberg III, Lahore",
    rating: 4.95,
    distance: "3 km away",
    dates: "Oct 05 – 10",
    price: 35000,
    unit: "rental",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop"
    ],
    lat: 31.52,
    lng: 74.35,
    maxGuests: 10,
    bookedDates: []
  },
  {
    id: 'l-5',
    title: "The Creative Loft Studio",
    category: "studios",
    location: "Clifton, Karachi",
    rating: 4.80,
    distance: "5 km away",
    dates: "Sep 28 – Oct 03",
    price: 15000,
    unit: "hour",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop"
    ],
    lat: 24.81,
    lng: 67.03,
    maxGuests: 30,
    bookedDates: ["2026-06-20"]
  },
  {
    id: 'l-6',
    title: "Rolls Royce Phantom VIP",
    category: "cars",
    location: "DHA Phase 2, Karachi",
    rating: 4.68,
    distance: "10 km away",
    dates: "Nov 15 – 17",
    price: 95000,
    unit: "day",
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=600&auto=format&fit=crop"
    ],
    lat: 24.83,
    lng: 67.07,
    maxGuests: 4,
    bookedDates: []
  },
  {
    id: 'l-7',
    title: "Mughal Heritage Fine Catering & Banquet",
    category: "halls",
    location: "DHA Phase 5, Lahore",
    rating: 4.98,
    distance: "15 km away",
    dates: "Dec 01 – 05",
    price: 5000,
    unit: "guest",
    images: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606214588494-dfaf448d37aa?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e3a9?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=600&auto=format&fit=crop"
    ],
    lat: 31.47,
    lng: 74.38,
    maxGuests: 2000,
    bookedDates: []
  }
]

export function ExploreClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const focusParam = searchParams ? searchParams.get('focus') : null

  const getListingLink = (listing: ExploreListing) => {
    if (listing.id === 'l-3') {
      return '/venues/green-meadows-farmhouse'
    }
    if (listing.id === 'l-4') {
      return '/vendors/prof-lehnga'
    }
    
    const venueCategories = ['halls', 'marquees', 'farmhouses', 'lawns', 'stages']
    const vendorCategories = ['suits', 'cars', 'catering']
    const professionalCategories = ['studios', 'salons']
    
    if (venueCategories.includes(listing.category)) {
      return `/venues/${listing.id}`
    } else if (vendorCategories.includes(listing.category)) {
      return `/vendors/${listing.id}`
    } else if (professionalCategories.includes(listing.category)) {
      return `/professionals/${listing.id}`
    }
    
    return `/explore`
  }

  const [activeMainTab, setActiveMainTab] = useState<'venues' | 'vendors' | 'professionals'>('venues')
  const [activeCategory, setActiveCategory] = useState<string>('halls')
  const [activeSubcategory, setActiveSubcategory] = useState<string>('all_halls')
  const [showMap, setShowMap] = useState<boolean>(false)
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()
  const [imageIndices, setImageIndices] = useState<Record<string, number>>({})
  const [selectedListing, setSelectedListing] = useState<ExploreListing | null>(null)

  // Advanced Filters State
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [filterMinPrice, setFilterMinPrice] = useState<number>(0)
  const [filterMaxPrice, setFilterMaxPrice] = useState<number>(1000000)
  const [filterCity, setFilterCity] = useState<string>("All")
  const [filterMinGuests, setFilterMinGuests] = useState<number>(0)

  const handleMainTabChange = (tab: 'venues' | 'vendors' | 'professionals') => {
    setActiveMainTab(tab)
    if (tab === 'venues') {
      setActiveCategory('halls')
      setActiveSubcategory('all_halls')
    } else if (tab === 'vendors') {
      setActiveCategory('suits')
      setActiveSubcategory('all_suits')
    } else if (tab === 'professionals') {
      setActiveCategory('studios')
      setActiveSubcategory('all_studios')
    }
  }
  
  // Search Overlay states
  const [searchDest, setSearchDest] = useState("")
  const [startDate, setStartDate] = useState<string | null>(null)
  const [endDate, setEndDate] = useState<string | null>(null)
  const [guestsCount, setGuestsCount] = useState({ couples: 1, organisers: 0 })

  // Sticky header scroll & expansion states
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchExpandedOverride, setIsSearchExpandedOverride] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
        setIsSearchExpandedOverride(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isSearchExpanded = !isScrolled || isSearchExpandedOverride
  
  // Flexible Dates Selection states
  const [calendarTab, setCalendarTab] = useState<'dates' | 'flexible'>('dates')
  const [flexibleStay, setFlexibleStay] = useState<'day' | 'weekend' | 'week'>('day')
  const [selectedFlexibleMonths, setSelectedFlexibleMonths] = useState<string[]>(['June 2026'])
// Calendar Month Navigation states
  const [currentMonthIndex, setCurrentMonthIndex] = useState(5) // June 2026 (index 5)
  const [currentYear, setCurrentYear] = useState(2026)
  
  const [mergedListings, setMergedListings] = useState<ExploreListing[]>(MOCK_LISTINGS)

  useEffect(() => {
    try {
      const custom = localStorage.getItem("nexus_custom_listings")
      if (custom) {
        const parsed = JSON.parse(custom)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMergedListings([...parsed, ...MOCK_LISTINGS])
        }
      }
    } catch (e) {}
  }, [])

  const handlePrevMonth = () => {
    if (currentYear === 2026 && currentMonthIndex === 5) return
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonthIndex(currentMonthIndex - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonthIndex(currentMonthIndex + 1)
    }
  }

  const getMonthDetails = (year: number, monthZeroIndexed: number) => {
    const date = new Date(year, monthZeroIndexed, 1)
    const name = date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
    const startPadding = date.getDay()
    const days = new Date(year, monthZeroIndexed + 1, 0).getDate()
    return { name, year, month: monthZeroIndexed + 1, days, startPadding }
  }


  const getWhoDisplay = () => {
    const parts = []
    if (guestsCount.couples > 0) {
      parts.push(`${guestsCount.couples} ${guestsCount.couples === 1 ? 'couple' : 'couples'}`)
    }
    if (guestsCount.organisers > 0) {
      parts.push(`${guestsCount.organisers} ${guestsCount.organisers === 1 ? 'organiser' : 'organisers'}`)
    }
    return parts.length > 0 ? parts.join(", ") : "Add guests"
  }
  
  const [activeSearchField, setActiveSearchField] = useState<'where' | 'when' | 'who' | null>(null)

  useEffect(() => {
    if (searchParams) {
      const focus = searchParams.get('focus')
      if (focus === 'where' || focus === 'when' || focus === 'who') {
        setActiveSearchField(focus as any)
      }

      const locationParam = searchParams.get('location')
      const categoryParam = searchParams.get('category')
      const dateParam = searchParams.get('date')
      const endDateParam = searchParams.get('endDate')
      const couplesParam = searchParams.get('couples')
      const organisersParam = searchParams.get('organisers')

      if (locationParam) setSearchDest(locationParam)
      if (categoryParam) {
        const matchedCategory = CATEGORIES.find(c => c.name.toLowerCase().includes(categoryParam.toLowerCase()) || c.id === categoryParam.toLowerCase())
        if (matchedCategory) {
          setActiveCategory(matchedCategory.id)
          // Find main tab for category
          if (['halls', 'marquees', 'farmhouses', 'lawns', 'stages'].includes(matchedCategory.id)) {
            setActiveMainTab('venues')
          } else if (['suits', 'cars', 'catering'].includes(matchedCategory.id)) {
            setActiveMainTab('vendors')
          } else if (['studios', 'salons'].includes(matchedCategory.id)) {
            setActiveMainTab('professionals')
          }
        }
      }
      if (dateParam) {
        setStartDate(dateParam)
        setCalendarTab('dates')
      }
      if (endDateParam) {
        setEndDate(endDateParam)
      }
      if (couplesParam || organisersParam) {
        setGuestsCount({
          couples: couplesParam ? parseInt(couplesParam) : 0,
          organisers: organisersParam ? parseInt(organisersParam) : 0
        })
      }
    }
  }, [searchParams])

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setActiveSearchField(null)
    setIsMobileSearchOpen(false)
    setIsSearchExpandedOverride(false)

    // Update URL query parameters
    const params = new URLSearchParams()
    if (searchDest) params.set('location', searchDest)
    if (activeCategory) params.set('category', activeCategory)
    if (startDate) params.set('date', startDate)
    if (endDate) params.set('endDate', endDate)
    if (guestsCount.couples > 0) params.set('couples', String(guestsCount.couples))
    if (guestsCount.organisers > 0) params.set('organisers', String(guestsCount.organisers))

    router.replace(`/explore?${params.toString()}`, { scroll: false })
  }

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const searchBarRef = useRef<HTMLDivElement>(null)
  const destInputRef = useRef<HTMLInputElement>(null)
  const monthsContainerRef = useRef<HTMLDivElement>(null)
  const accountMenuRef = useRef<HTMLDivElement>(null)

  const scrollMonthsLeft = () => {
    if (monthsContainerRef.current) {
      monthsContainerRef.current.scrollBy({ left: -220, behavior: 'smooth' })
    }
  }

  const scrollMonthsRight = () => {
    if (monthsContainerRef.current) {
      monthsContainerRef.current.scrollBy({ left: 220, behavior: 'smooth' })
    }
  }


  // Click outside to collapse searchbar dropdowns & account menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setActiveSearchField(null)
        setIsSearchExpandedOverride(false)
      }
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Focus destination input when active field becomes 'where'
  useEffect(() => {
    if (activeSearchField === 'where' && destInputRef.current) {
      destInputRef.current.focus()
    }
  }, [activeSearchField])

  const handleDateClick = (dateStr: string) => {
    // Prevent selection if date is in the past
    if (dateStr < "2026-06-17") return

    if (!startDate || (startDate && endDate)) {
      setStartDate(dateStr)
      setEndDate(null)
    } else {
      if (dateStr < startDate) {
        setStartDate(dateStr)
        setEndDate(null)
      } else {
        setEndDate(dateStr)
        // Automatically slide to Who panel after selecting range
        setTimeout(() => {
          setActiveSearchField('who')
        }, 300)
      }
    }
  }

  const getDatesDisplay = () => {
    if (calendarTab === 'flexible') {
      const monthName = selectedFlexibleMonths[0] ? selectedFlexibleMonths[0].split(' ')[0] : "June"
      return `Any ${flexibleStay} in ${monthName}`
    }

    if (!startDate) return "Add dates"
    
    const formatDateStr = (str: string) => {
      const parts = str.split('-')
      const monthNum = parseInt(parts[1])
      const dayNum = parseInt(parts[2])
      const monthLabel = monthNum === 6 ? "Jun" : monthNum === 7 ? "Jul" : "Aug"
      return `${monthLabel} ${dayNum}`
    }

    if (!endDate) {
      return formatDateStr(startDate)
    }
    
    const startParts = startDate.split('-')
    const endParts = endDate.split('-')
    if (startParts[1] === endParts[1]) {
      const monthNum = parseInt(startParts[1])
      const monthLabel = monthNum === 6 ? "Jun" : monthNum === 7 ? "Jul" : "Aug"
      return `${monthLabel} ${parseInt(startParts[2])} – ${parseInt(endParts[2])}`
    }
    
    return `${formatDateStr(startDate)} – ${formatDateStr(endDate)}`
  }

  // Carousel Next/Prev controls
  const handlePrevImage = (e: React.MouseEvent, id: string, imagesCount: number) => {
    e.stopPropagation()
    const current = imageIndices[id] || 0
    const nextIdx = current === 0 ? imagesCount - 1 : current - 1
    setImageIndices({ ...imageIndices, [id]: nextIdx })
  }

  const handleNextImage = (e: React.MouseEvent, id: string, imagesCount: number) => {
    e.stopPropagation()
    const current = imageIndices[id] || 0
    const nextIdx = current === imagesCount - 1 ? 0 : current + 1
    setImageIndices({ ...imageIndices, [id]: nextIdx })
  }

  // Toggle Favorite
  const toggleWishlist = (e: React.MouseEvent, listing: ExploreListing) => {
    e.stopPropagation()
    if (isFavorite(listing.id)) {
      removeFavorite(listing.id)
    } else {
      addFavorite({
        id: listing.id,
        name: listing.title,
        category: listing.category,
        type: 'rental', // Or gig depending on category if needed
        price: listing.price.toString(),
        image: listing.images[0]
      })
    }
  }

  const isListingAvailable = (listing: ExploreListing) => {
    if (!startDate) return true
    const booked = listing.bookedDates || []
    
    if (!endDate) {
      return !booked.includes(startDate)
    }

    try {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const current = new Date(start)
      
      while (current <= end) {
        const dateStr = current.toISOString().split('T')[0]
        if (booked.includes(dateStr)) {
          return false
        }
        current.setDate(current.getDate() + 1)
      }
    } catch (e) {
      console.error("Date availability check error:", e)
    }
    
    return true
  }

  const filteredListings = mergedListings.filter(item => {
    // Category Filter
    if (item.category !== activeCategory) return false

    // Search Destination Filter
    if (searchDest && !item.location.toLowerCase().includes(searchDest.toLowerCase())) return false

    // Date Availability Filter
    if (!isListingAvailable(item)) return false

    // Guest Capacity Filter based on Who selection
    if (guestsCount.organisers > 0) {
      if (item.maxGuests !== undefined && item.maxGuests < 100) return false
    }

    // Advanced Price Filter
    if (item.price < filterMinPrice || item.price > filterMaxPrice) return false

    // Advanced City Filter
    if (filterCity !== "All" && !item.location.toLowerCase().includes(filterCity.toLowerCase())) return false

    // Advanced Guest Capacity Filter
    if (filterMinGuests > 0 && item.maxGuests !== undefined && item.maxGuests < filterMinGuests) return false
    
    return true
  })

  const totalGuests = guestsCount.couples + guestsCount.organisers

  return (
    <div className="explore-page min-h-screen bg-white text-[#222222] font-sans antialiased">
      <style dangerouslySetInnerHTML={{__html: `
        .explore-page, .explore-page h1, .explore-page h2, .explore-page h3, .explore-page h4, .explore-page h5, .explore-page h6, .explore-page button, .explore-page input, .explore-page span, .explore-page label, .explore-page select, .explore-page option {
          font-family: var(--font-inter), sans-serif;
        }
      `}} />
      {/* Search backdrop overlay for scrolled state */}
      {isScrolled && isSearchExpandedOverride && (
        <div 
          onClick={() => {
            setIsSearchExpandedOverride(false)
            setActiveSearchField(null)
          }}
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-xs transition-opacity duration-300"
        />
      )}

      {/* 1. STICKY AIRBNB HEADER BAR */}
      <header className={`bg-white border-b border-slate-200 sticky top-0 z-45 transition-all duration-300 ${
        isScrolled ? 'py-3 shadow-sm h-[72px] flex items-center' : 'pb-8 pt-6'
      }`}>
        <div className={`max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 flex flex-col transition-all duration-300 w-full ${
          isSearchExpanded ? 'gap-6' : 'gap-0'
        }`}>
          
          {/* Top Row: Logo, Tabs, Profile */}
          <div className="flex items-center justify-between relative z-[60] w-full">
            
            {/* Left: Beautiful Nexus Logo */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.location.href = "/"}>
              <NexusLogo iconSize={40} />
            </div>

            {/* Center: Main Tabs or Search Capsule */}
            <div className="hidden md:flex items-center justify-center flex-1 max-w-2xl px-4">
              <AnimatePresence mode="wait">
                {isSearchExpanded ? (
                  <motion.div 
                    key="tabs"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="flex gap-10 text-[16px] font-bold text-slate-500 items-center"
                  >
                    {/* Venues Tab */}
                    <button 
                      onClick={() => handleMainTabChange('venues')}
                      className={`flex items-center gap-3 pb-3 cursor-pointer transition-all relative ${
                        activeMainTab === 'venues' 
                          ? 'text-slate-900 font-semibold' 
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <img 
                        src="/images/nexus_shadi_hall_icon.png?v=2" 
                        alt="Venues" 
                        className="w-12 h-12 object-contain"
                      />
                      <span>Venues</span>
                      {activeMainTab === 'venues' && (
                        <motion.div 
                          layoutId="activeHeaderTab" 
                          className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-900 rounded-full" 
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    {/* Vendors Tab */}
                    <button 
                      onClick={() => handleMainTabChange('vendors')}
                      className={`flex items-center gap-3 pb-3 cursor-pointer transition-all relative ${
                        activeMainTab === 'vendors' 
                          ? 'text-slate-900 font-semibold' 
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <div className="relative w-12 h-12 shrink-0">
                        <img 
                          src="/images/nexus_company_icon.png?v=2" 
                          alt="Vendors" 
                          className="w-full h-full object-contain"
                        />
                        <span className="absolute -top-1.5 -right-2 px-1 py-0.2 text-[8px] font-black text-white bg-gradient-to-b from-[#3a587d] to-[#20344d] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.25)] border border-[#1b2b41]/40 flex items-center justify-center tracking-wider leading-none">
                          NEW
                        </span>
                      </div>
                      <span>Vendors</span>
                      {activeMainTab === 'vendors' && (
                        <motion.div 
                          layoutId="activeHeaderTab" 
                          className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-900 rounded-full" 
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    {/* Professionals Tab */}
                    <button 
                      onClick={() => handleMainTabChange('professionals')}
                      className={`flex items-center gap-3 pb-3 cursor-pointer transition-all relative ${
                        activeMainTab === 'professionals' 
                          ? 'text-slate-900 font-semibold' 
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <div className="relative w-12 h-12 shrink-0">
                        <img 
                          src="/images/nexus_photographer_icon.png?v=2" 
                          alt="Professionals" 
                          className="w-full h-full object-contain"
                        />
                        <span className="absolute -top-1.5 -right-2 px-1 py-0.2 text-[8px] font-black text-white bg-gradient-to-b from-[#3a587d] to-[#20344d] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.25)] border border-[#1b2b41]/40 flex items-center justify-center tracking-wider leading-none">
                          NEW
                        </span>
                      </div>
                      <span>Professionals</span>
                      {activeMainTab === 'professionals' && (
                        <motion.div 
                          layoutId="activeHeaderTab" 
                          className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-900 rounded-full" 
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="capsule"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                  >
                    <HeaderSearchCapsule 
                      searchDest={searchDest}
                      datesDisplay={getDatesDisplay()}
                      whoDisplay={getWhoDisplay()}
                      onClick={(field) => {
                        setIsSearchExpandedOverride(true)
                        setActiveSearchField(field || 'where')
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Actions and account menu */}
            <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-750 mt-1">
              <span 
                onClick={() => alert("Welcome to Nexus Hosting! Redirecting to list a venue or service...")}
                className="hover:bg-slate-100 px-4 py-2.5 rounded-full cursor-pointer transition-colors text-sm font-semibold text-slate-800"
              >
                Become a Host
              </span>

              <button className="p-2.5 hover:bg-slate-100 rounded-full cursor-pointer transition-colors">
                <Globe className="w-4 h-4 text-slate-800" />
              </button>

              {/* Hamburger Account menu */}
              <div 
                ref={accountMenuRef}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsAccountMenuOpen(!isAccountMenuOpen)
                }}
                className="flex items-center gap-3 border border-slate-300 rounded-full py-1.5 px-2 hover:shadow-md transition-shadow cursor-pointer bg-white relative ml-2"
              >
                <Menu className="w-4 h-4 text-slate-600 ml-2" />
                <div className="w-8 h-8 rounded-full bg-slate-500 text-white flex items-center justify-center overflow-hidden">
                  <User className="w-5 h-5 text-white" />
                </div>

                {/* Dropdown Menu Panel (Airbnb style, adapted to Nexus ecosystem) */}
                {isAccountMenuOpen && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 top-12 w-[320px] bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 py-3 z-50 cursor-default text-left flex flex-col gap-1.5"
                  >
                    {/* Item 1: Help Center */}
                    <div 
                      onClick={() => {
                        alert("Opening Nexus Help Center...")
                        setIsAccountMenuOpen(false)
                      }}
                      className="hover:bg-slate-50 p-3 py-2.5 rounded-xl cursor-pointer transition-colors font-semibold text-sm text-slate-700 flex items-center gap-2.5"
                    >
                      <Globe className="w-4 h-4 text-slate-500" />
                      <span>Help Center</span>
                    </div>

                    <div className="h-[1px] bg-slate-100 my-0.5" />

                    {/* Item 2: Become a Host (Featured card with image) */}
                    <div 
                      onClick={() => {
                        alert("Redirecting to Become a Host / Vendor portal...")
                        setIsAccountMenuOpen(false)
                      }}
                      className="hover:bg-slate-50 p-3 rounded-xl cursor-pointer transition-colors flex justify-between items-center gap-4 text-left"
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 text-sm">Become a Host</div>
                        <div className="text-xs text-slate-500 leading-normal mt-0.5">
                          It's easy to list your venue or service and earn.
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200/50 flex items-center justify-center">
                        <img 
                          src="/images/host_families_circle.png" 
                          alt="Become a Host" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </div>

                    <div className="h-[1px] bg-slate-100 my-0.5" />

                    {/* Item 3: Refer a Partner */}
                    <div 
                      onClick={() => {
                        alert("Refer a Partner / Host option selected")
                        setIsAccountMenuOpen(false)
                      }}
                      className="hover:bg-slate-50 p-3 py-2.5 rounded-xl cursor-pointer transition-colors font-semibold text-sm text-slate-700"
                    >
                      Refer a Partner
                    </div>

                    {/* Item 4: Find a co-manager */}
                    <div 
                      onClick={() => {
                        alert("Find a co-host/co-manager selected")
                        setIsAccountMenuOpen(false)
                      }}
                      className="hover:bg-slate-50 p-3 py-2.5 rounded-xl cursor-pointer transition-colors font-semibold text-sm text-slate-700"
                    >
                      Find a co-manager
                    </div>

                    {/* Item 5: Gift cards */}
                    <div 
                      onClick={() => {
                        alert("Gift cards selected")
                        setIsAccountMenuOpen(false)
                      }}
                      className="hover:bg-slate-50 p-3 py-2.5 rounded-xl cursor-pointer transition-colors font-semibold text-sm text-slate-700"
                    >
                      Gift Cards
                    </div>

                    <div className="h-[1px] bg-slate-100 my-0.5" />

                    {/* Item 6: Log in or sign up */}
                    <div 
                      onClick={() => {
                        alert("Sign up / Log in dialog opened!")
                        setIsAccountMenuOpen(false)
                      }}
                      className="hover:bg-slate-50 p-3 py-2.5 rounded-xl cursor-pointer transition-colors font-bold text-sm text-slate-900"
                    >
                      Log in or sign up
                    </div>
                  </div>
                )}
              </div>
            </div>
            
          </div>

          {/* Mobile Search Trigger Button (visible only on mobile) */}
          <div className="md:hidden w-full px-2">
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              className="w-full flex items-center justify-between border border-slate-200/80 shadow-[0_3px_10px_rgba(0,0,0,0.05)] rounded-full px-5 py-3.5 bg-white hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <Search className="w-5 h-5 text-[#FF385C] stroke-[2.5]" />
                <div className="text-left">
                  <div className="text-xs font-black text-slate-800">
                    {searchDest || "Where to?"}
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold">
                    {getDatesDisplay()} • {getWhoDisplay()}
                  </div>
                </div>
              </div>
              <div className="p-2 border border-slate-100 rounded-full">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              </div>
            </button>
          </div>

          {/* Mobile Main Tabs Row (visible only on mobile) */}
          <div className="flex md:hidden gap-3 overflow-x-auto no-scrollbar py-1 px-2">
            {[
              { id: 'venues', label: 'Venues', icon: "/images/nexus_shadi_hall_icon.png?v=2" },
              { id: 'vendors', label: 'Vendors', icon: "/images/nexus_company_icon.png?v=2", isNew: true },
              { id: 'professionals', label: 'Professionals', icon: "/images/nexus_photographer_icon.png?v=2", isNew: true }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleMainTabChange(tab.id as any)}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all border ${
                  activeMainTab === tab.id
                    ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-650 hover:border-slate-400'
                }`}
              >
                <img src={tab.icon} alt={tab.label} className="w-5 h-5 object-contain" />
                <span>{tab.label}</span>
                {tab.isNew && (
                  <span className="px-1 py-0.2 text-[6px] font-black text-white bg-slate-500 rounded-full leading-none">
                    NEW
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Bottom Row: The Big Search Bar */}
          <div 
            ref={searchBarRef}
            className={`${
              isScrolled 
                ? isSearchExpandedOverride
                  ? "absolute top-full left-1/2 -translate-x-1/2 mt-3 w-full max-w-[850px] h-[66px] bg-slate-100 border border-slate-200/80 shadow-2xl rounded-full p-[4px] flex items-center justify-between text-left z-50 cursor-default"
                  : "hidden"
                : "hidden md:flex mx-auto w-full max-w-[850px] h-[66px] bg-slate-100 border border-[#E2E8F0] shadow-[0_3px_12px_rgba(0,0,0,0.06)] rounded-full p-[4px] items-center justify-between text-left relative z-50 transition-all cursor-default"
            }`}
          >
             
             {/* Where input */}
             <div 
               onClick={(e) => {
                 e.stopPropagation()
                 setActiveSearchField('where')
               }}
               className={`flex-1 h-full px-8 flex items-center justify-between cursor-pointer rounded-full relative group transition-colors ${
                 activeSearchField === 'where' ? '' : 'hover:bg-slate-200/40'
               }`}
             >
               {activeSearchField === 'where' && (
                 <motion.div 
                   layoutId="activeSearchFieldHighlight"
                   className="absolute inset-0 bg-white shadow-[0_6px_20px_rgba(0,0,0,0.07)] rounded-full z-0"
                   transition={{ type: "spring", stiffness: 380, damping: 30 }}
                 />
               )}
               <div className="flex-1 flex flex-col justify-center relative z-10">
                 <label className="block text-[12px] font-bold text-slate-800 mb-0.5">Where</label>
                 <input 
                   ref={destInputRef}
                   type="text" 
                   placeholder="Search destinations" 
                   value={searchDest}
                   onChange={(e) => setSearchDest(e.target.value)}
                   className="w-full bg-transparent border-none outline-none text-slate-500 font-normal text-[14px] placeholder:text-slate-400 cursor-pointer focus:cursor-text leading-tight"
                 />
               </div>
               {searchDest && activeSearchField === 'where' && (
                 <button 
                   onClick={(e) => {
                     e.stopPropagation()
                     setSearchDest("")
                   }}
                   className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 transition-colors ml-2 relative z-10"
                 >
                   <X className="w-3.5 h-3.5" />
                 </button>
               )}
             </div>

             {/* Divider 1 */}
             {activeSearchField !== 'where' && activeSearchField !== 'when' && (
               <div className="w-[1px] h-8 bg-slate-200 shrink-0"></div>
             )}

             {/* Dates segment */}
             <div 
               onClick={(e) => {
                 e.stopPropagation()
                 setActiveSearchField('when')
               }}
               className={`flex-1 h-full px-8 flex items-center justify-between cursor-pointer rounded-full relative transition-colors ${
                 activeSearchField === 'when' ? '' : 'hover:bg-slate-200/40'
               }`}
             >
               {activeSearchField === 'when' && (
                 <motion.div 
                   layoutId="activeSearchFieldHighlight"
                   className="absolute inset-0 bg-white shadow-[0_6px_20px_rgba(0,0,0,0.07)] rounded-full z-0"
                   transition={{ type: "spring", stiffness: 380, damping: 30 }}
                 />
               )}
               <div className="flex-1 flex flex-col justify-center relative z-10">
                 <label className="block text-[12px] font-bold text-slate-800 mb-0.5">When</label>
                 <span className={`text-[14px] font-normal block truncate leading-tight ${startDate ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                   {getDatesDisplay()}
                 </span>
               </div>
               {startDate && activeSearchField === 'when' && (
                 <button 
                   onClick={(e) => {
                     e.stopPropagation()
                     setStartDate(null)
                     setEndDate(null)
                   }}
                   className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 transition-colors ml-2 relative z-10"
                 >
                   <X className="w-3.5 h-3.5" />
                 </button>
               )}
             </div>

             {/* Divider 2 */}
             {activeSearchField !== 'when' && activeSearchField !== 'who' && (
               <div className="w-[1px] h-8 bg-slate-200 shrink-0"></div>
             )}

             {/* Who Guests segment */}
             <div 
               onClick={(e) => {
                 e.stopPropagation()
                 setActiveSearchField('who')
               }}
               className={`flex-[1.2] h-full pl-8 pr-2 flex items-center justify-between cursor-pointer rounded-full relative transition-colors ${
                 activeSearchField === 'who' ? '' : 'hover:bg-slate-200/40'
               }`}
             >
               {activeSearchField === 'who' && (
                 <motion.div 
                   layoutId="activeSearchFieldHighlight"
                   className="absolute inset-0 bg-white shadow-[0_6px_20px_rgba(0,0,0,0.07)] rounded-full z-0"
                   transition={{ type: "spring", stiffness: 380, damping: 30 }}
                 />
               )}
               <div className="flex-1 flex flex-col justify-center relative z-10">
                 <label className="block text-[12px] font-bold text-slate-800 mb-0.5">Who</label>
                 <span className={`text-[14px] font-normal block truncate leading-tight ${totalGuests > 0 ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                   {getWhoDisplay()}
                 </span>
               </div>
               
               <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSearchSubmit()
                  }}
                  className="h-[50px] px-6 rounded-full bg-[#FF385C] hover:bg-[#e62248] text-white flex items-center justify-center shrink-0 transition-colors shadow-md ml-4 gap-2 font-semibold text-sm relative z-10"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                  <span>Search</span>
                </button>
              </div>

             {/* Desktop Search Dropdown Overlays */}
             <AnimatePresence>
               {activeSearchField && (
                 <motion.div
                   initial={{ opacity: 0, y: 15, scale: 0.95 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, y: 10, scale: 0.95 }}
                   transition={{ duration: 0.2 }}
                   className="absolute top-[76px] bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 z-[100] cursor-default text-slate-850"
                   style={{
                     left: activeSearchField === 'where' ? '0' : activeSearchField === 'when' ? '15%' : 'auto',
                     right: activeSearchField === 'who' ? '0' : 'auto',
                     width: activeSearchField === 'when' ? '500px' : '450px',
                   }}
                 >
                   {activeSearchField === 'where' && (
                     <div>
                       <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Popular Cities in Pakistan</h4>
                       <div className="grid grid-cols-3 gap-3">
                         {[
                           { name: 'Lahore', image: '/images/host_luxury_wedding.png', desc: 'Punjab events' },
                           { name: 'Karachi', image: '/images/host_families_circle.png', desc: 'Coastal style' },
                           { name: 'Islamabad', image: '/images/pakistani_wedding_couple.png', desc: 'Scenic vistas' },
                         ].map((city) => (
                           <div 
                             key={city.name}
                             onClick={() => {
                               setSearchDest(city.name)
                               setActiveSearchField('when')
                             }}
                             className="flex flex-col gap-2 p-2 rounded-2xl hover:bg-slate-100 cursor-pointer transition-all active:scale-95 group text-left"
                           >
                             <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200/50">
                               <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                             </div>
                             <div>
                               <span className="text-xs font-bold text-slate-800 block">{city.name}</span>
                               <span className="text-[10px] text-slate-400 font-semibold">{city.desc}</span>
                             </div>
                           </div>
                         ))}
                       </div>
                     </div>
                   )}

                   {activeSearchField === 'when' && (
                     <div className="space-y-4">
                       <div className="flex bg-slate-100 p-1 rounded-full w-fit mx-auto gap-1">
                         <button 
                           type="button"
                           onClick={() => setCalendarTab('dates')}
                           className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${calendarTab === 'dates' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                         >
                           Choose Dates
                         </button>
                         <button 
                           type="button"
                           onClick={() => setCalendarTab('flexible')}
                           className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${calendarTab === 'flexible' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                         >
                           I'm Flexible
                         </button>
                       </div>

                       {calendarTab === 'dates' ? (
                         <div className="space-y-3">
                           <div className="flex justify-between items-center px-2">
                             <button type="button" onClick={handlePrevMonth} className="p-1 hover:bg-slate-100 rounded-full cursor-pointer"><ChevronLeft className="w-4 h-4 text-slate-800" /></button>
                             <span className="text-xs font-bold text-slate-800">
                               {getMonthDetails(currentYear, currentMonthIndex).name}
                             </span>
                             <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-slate-100 rounded-full cursor-pointer"><ChevronRight className="w-4 h-4 text-slate-800" /></button>
                           </div>

                           <div className="grid grid-cols-7 gap-1 text-center">
                             {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                               <span key={d} className="text-[10px] font-black text-slate-400 uppercase tracking-wider py-1">{d}</span>
                             ))}
                             {Array.from({ length: getMonthDetails(currentYear, currentMonthIndex).startPadding }).map((_, i) => (
                               <div key={`pad-${i}`} />
                             ))}
                             {Array.from({ length: getMonthDetails(currentYear, currentMonthIndex).days }).map((_, i) => {
                               const day = i + 1
                               const dateStr = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                               const isPast = dateStr < "2026-06-17"
                               const isSelected = startDate === dateStr || endDate === dateStr
                               const inRange = startDate && endDate && dateStr > startDate && dateStr < endDate
                               
                               return (
                                 <button
                                   key={day}
                                   type="button"
                                   disabled={isPast}
                                   onClick={() => handleDateClick(dateStr)}
                                   className={`w-8 h-8 rounded-full text-[11px] font-bold flex items-center justify-center transition-all ${
                                     isPast ? 'opacity-25 cursor-not-allowed' :
                                     isSelected ? 'bg-[#FF385C] text-white' :
                                     inRange ? 'bg-rose-50 text-slate-800' :
                                     'hover:bg-slate-100 text-slate-800'
                                   }`}
                                 >
                                   {day}
                                 </button>
                               )
                             })}
                           </div>
                         </div>
                       ) : (
                         <div className="space-y-4">
                           <h4 className="text-xs font-bold text-slate-700 text-center">How long would you like to plan?</h4>
                           <div className="flex justify-center gap-2">
                             {['day', 'weekend', 'week'].map((stay) => (
                               <button
                                 key={stay}
                                 type="button"
                                 onClick={() => setFlexibleStay(stay as any)}
                                 className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${flexibleStay === stay ? 'border-slate-900 bg-slate-50 text-slate-900 shadow-sm' : 'border-slate-200 bg-white text-slate-650 hover:border-slate-400'}`}
                               >
                                 {stay === 'day' ? 'Single Day' : stay === 'weekend' ? 'A Weekend' : 'A Full Week'}
                               </button>
                             ))}
                           </div>
                           
                           <h4 className="text-xs font-bold text-slate-700 text-center mt-2">Go when?</h4>
                           <div className="flex gap-2 overflow-x-auto py-1 justify-center">
                             {[
                               { label: 'June 2026', name: 'June' },
                               { label: 'July 2026', name: 'July' },
                               { label: 'August 2026', name: 'August' },
                               { label: 'September 2026', name: 'September' },
                             ].map((m) => {
                               const isSel = selectedFlexibleMonths.includes(m.label)
                               return (
                                 <button
                                   key={m.label}
                                   type="button"
                                   onClick={() => setSelectedFlexibleMonths([m.label])}
                                   className={`px-4 py-3 rounded-2xl border text-center transition-all min-w-[70px] ${isSel ? 'border-slate-900 bg-slate-50 text-slate-900' : 'border-slate-200 bg-white text-slate-650 hover:border-slate-350'}`}
                                 >
                                   <Calendar className="w-3.5 h-3.5 mx-auto mb-1 opacity-70" />
                                   <span className="text-[10px] font-bold block">{m.name}</span>
                                   <span className="text-[8px] opacity-60">2026</span>
                                 </button>
                               )
                             })}
                           </div>
                         </div>
                       )}
                     </div>
                   )}

                   {activeSearchField === 'who' && (
                     <div className="space-y-4 w-[280px]">
                       <button
                         type="button"
                         onClick={() => setGuestsCount({ couples: guestsCount.couples === 1 ? 0 : 1, organisers: 0 })}
                         className="w-full flex justify-between items-center pb-3 border-b border-slate-100 text-left cursor-pointer"
                       >
                         <div>
                           <div className="font-extrabold text-xs text-slate-800">Couples / Families</div>
                           <div className="text-[10px] text-slate-400 mt-0.5 font-semibold font-sans">Bride & Groom / Families</div>
                         </div>
                         <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ml-4 ${
                           guestsCount.couples === 1
                             ? 'bg-[#FF385C] border-[#FF385C] text-white shadow-xs'
                             : 'border-[#b0b0b0] bg-white'
                         }`}>
                           {guestsCount.couples === 1 && <Check className="w-3 h-3 stroke-[3]" />}
                         </div>
                       </button>

                       <button
                         type="button"
                         onClick={() => setGuestsCount({ couples: 0, organisers: guestsCount.organisers === 1 ? 0 : 1 })}
                         className="w-full flex justify-between items-center text-left cursor-pointer"
                       >
                         <div>
                           <div className="font-extrabold text-xs text-slate-800">Event Organisers</div>
                           <div className="text-[10px] text-slate-400 mt-0.5 font-semibold font-sans">Professional planners</div>
                         </div>
                         <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ml-4 ${
                           guestsCount.organisers === 1
                             ? 'bg-[#FF385C] border-[#FF385C] text-white shadow-xs'
                             : 'border-[#b0b0b0] bg-white'
                         }`}>
                           {guestsCount.organisers === 1 && <Check className="w-3 h-3 stroke-[3]" />}
                         </div>
                       </button>
                     </div>
                   )}
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>
      </header>

      {/* 2. HORIZONTAL CATEGORY SELECTOR SLIDER (Airbnb style) */}
      <section className="bg-white border-b border-slate-100 sticky top-[72px] z-30 shadow-xs transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 pt-4 pb-2 flex items-center justify-between gap-6 overflow-hidden">
          
          {/* Scrollable list */}
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar scroll-smooth flex-1 py-1">
            {CATEGORIES.filter(cat => {
              if (activeMainTab === 'venues') {
                return ['halls', 'marquees', 'farmhouses', 'lawns', 'restaurants', 'historical'].includes(cat.id)
              } else if (activeMainTab === 'vendors') {
                return ['catering', 'decor', 'suits', 'jewelry', 'invitations', 'cars', 'gifts'].includes(cat.id)
              } else {
                return ['photographers', 'salons', 'planners', 'mehendi', 'djs', 'choreographers', 'stages', 'rentals'].includes(cat.id)
              }
            }).map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    setActiveSubcategory(cat.subcategories[0].id)
                  }}
                  className={`flex flex-col items-center gap-2 pb-2.5 transition-all cursor-pointer whitespace-nowrap group shrink-0 relative ${
                    isActive 
                      ? 'text-[#222222]' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span className="text-xl group-hover:scale-105 transition-transform">{cat.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider">{cat.name}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeCategoryUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#222222] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Filters Button */}
          <button 
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-2 border border-slate-200 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-700 bg-white hover:border-slate-800 transition-colors shrink-0 cursor-pointer shadow-3xs mb-2"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
          </button>
        </div>

        {/* SUBCATEGORIES PILL ROW */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 pb-3 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {CATEGORIES.find(c => c.id === activeCategory)?.subcategories.map(sub => (
            <button
              key={sub.id}
              onClick={() => setActiveSubcategory(sub.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${
                activeSubcategory === sub.id 
                  ? 'bg-slate-100 border-slate-900 text-slate-900 shadow-sm' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-slate-50'
              } cursor-pointer`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      </section>

      {/* 3. MAIN DUAL VIEW LAYOUT (List View vs. Split Map View) */}
      <main className="max-w-[1440px] mx-auto min-h-screen">
        
        <div className="transition-all duration-300">
          {!showMap ? (
            /* LIST VIEW GRID (Standard 4-column) */
            <div className="px-6 md:px-10 lg:px-20 py-8">
              {filteredListings.length === 0 ? (
                <div className="py-24 text-center max-w-sm mx-auto">
                  <span className="text-4xl">🔍</span>
                  <h4 className="text-sm font-black text-slate-800 mt-4">No listings match filters</h4>
                  <p className="text-xs text-slate-400 font-bold mt-1">Try adjusting the search pill inputs or selector categories.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
                  {filteredListings.map((listing) => {
                    const activeIdx = imageIndices[listing.id] || 0
                    return (
                      <div 
                        key={listing.id}
                        onClick={() => setSelectedListing(listing)}
                        className="flex flex-col gap-3 group cursor-pointer relative"
                      >
                        {/* Thumbnail Image Carousel with Arrows */}
                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 shadow-3xs">
                          <img 
                            src={listing.images[activeIdx]} 
                            alt={listing.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-101"
                          />
                          
                          {/* Heart favorite icon */}
                          <button
                            onClick={(e) => toggleWishlist(e, listing)}
                            className="absolute top-3 right-3 z-10 p-1 rounded-full bg-transparent text-white drop-shadow-md cursor-pointer"
                          >
                            <Heart className={`w-5 h-5 transition-all active:scale-90 ${isFavorite(listing.id) ? 'fill-[#FF385C] text-[#FF385C]' : 'fill-black/30 text-white'}`} />
                          </button>

                          {/* Left Arrow hover */}
                          {listing.images.length > 1 && (
                            <button
                              onClick={(e) => handlePrevImage(e, listing.id, listing.images.length)}
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                          )}

                          {/* Right Arrow hover */}
                          {listing.images.length > 1 && (
                            <button
                              onClick={(e) => handleNextImage(e, listing.id, listing.images.length)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          )}

                          {/* Slide dots indicator */}
                          {listing.images.length > 1 && (
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                              {listing.images.map((_, dotIdx) => (
                                <div 
                                  key={dotIdx} 
                                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                                    dotIdx === activeIdx ? 'bg-white scale-120' : 'bg-white/50'
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Text labels */}
                        <div className="flex flex-col text-left">
                          <div className="flex justify-between items-baseline font-bold text-xs text-slate-900 leading-tight">
                            <span className="line-clamp-1">{listing.title}</span>
                            <span className="flex items-center gap-0.5 text-slate-800 shrink-0 font-extrabold">
                              <Star className="w-3 h-3 text-slate-900 fill-slate-900" /> {listing.rating.toFixed(2)}
                            </span>
                          </div>
                          
                          <span className="text-[10px] text-slate-400 font-semibold mt-1 block">{listing.location} • {listing.distance}</span>
                          <span className="text-[10px] text-slate-400 font-semibold block">{listing.dates}</span>
                          
                          <div className="text-xs font-bold text-slate-900 mt-1.5">
                            Rs. {listing.price.toLocaleString()} <span className="font-normal text-slate-500">/ {listing.unit}</span>
                          </div>
                        </div>

                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ) : (
            /* SPLIT SCREEN MAP VIEW (60% List, 40% Map) */
            <div className="flex h-[calc(100vh-172px)] overflow-hidden">
              
              {/* Left Column Listings (Compact Grid) */}
              <div className="hidden lg:block lg:w-[60%] w-full overflow-y-auto px-6 py-6 border-r border-slate-200 no-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredListings.map((listing) => {
                    const activeIdx = imageIndices[listing.id] || 0
                    return (
                      <div 
                        key={listing.id}
                        onClick={() => setSelectedListing(listing)}
                        className="flex flex-col gap-3 group cursor-pointer relative"
                      >
                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 shadow-3xs">
                          <img src={listing.images[activeIdx]} className="w-full h-full object-cover" alt="" />
                          <button
                            onClick={(e) => toggleWishlist(e, listing)}
                            className="absolute top-2.5 right-2.5 z-10 p-1"
                          >
                            <Heart className={`w-4 h-4 ${isFavorite(listing.id) ? 'fill-[#FF385C] text-[#FF385C]' : 'fill-black/30 text-white'}`} />
                          </button>
                        </div>
                        
                        <div className="text-left">
                          <div className="flex justify-between items-baseline font-bold text-[11px] text-slate-900 leading-tight">
                            <span className="truncate">{listing.title}</span>
                            <span className="flex items-center gap-0.5 shrink-0">
                              <Star className="w-2.5 h-2.5 fill-slate-900" /> {listing.rating.toFixed(2)}
                            </span>
                          </div>
                          <span className="text-[9px] text-slate-400 block mt-0.5">{listing.location}</span>
                          <span className="text-[11px] font-black text-slate-900 block mt-1">Rs. {listing.price.toLocaleString()}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Right Column Map Pane (Simulated interactive map) */}
              <div className="w-full lg:w-[40%] bg-[#FAF7F2] relative border-l border-slate-200">
                
                {/* Map landmarks overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 bg-[#FAF7F2]">
                  {/* Styled Grid Lines for Map layout */}
                  <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-[0.03] pointer-events-none border-collapse">
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div key={i} className="border border-slate-800" />
                    ))}
                  </div>

                  {/* Street labels */}
                  <div className="absolute top-[25%] left-[20%] text-[10px] font-black uppercase text-slate-400 tracking-wider rotate-12 pointer-events-none">M.M. Alam Road</div>
                  <div className="absolute bottom-[35%] right-[25%] text-[10px] font-black uppercase text-slate-400 tracking-wider -rotate-12 pointer-events-none">Margalla Highway</div>

                  {/* Pin points displaying price */}
                  {filteredListings.map((listing) => (
                    <button
                      key={listing.id}
                      onClick={() => setSelectedListing(listing)}
                      className="absolute bg-white hover:bg-[#222222] text-slate-800 hover:text-white border border-slate-300 shadow-md px-2.5 py-1.5 rounded-full font-black text-[10px] transition-all hover:scale-110 z-10 cursor-pointer"
                      style={{
                        top: `${(listing.lat - 24) * 5 + 40}%`,
                        left: `${(listing.lng - 67) * 4 + 35}%`
                      }}
                    >
                      Rs. {(listing.price / 1000).toFixed(0)}k
                    </button>
                  ))}

                  {/* Floating map controls */}
                  <div className="absolute top-4 left-4 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-[10px] font-black text-slate-500 shadow-sm flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FF385C]" /> Location Pins Active
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>

      </main>

      {/* 4. FLOATING BOTTOM-CENTER TOGGLE BUTTON */}
      <button
        onClick={() => setShowMap(!showMap)}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-[#222222] hover:bg-black text-white px-5 py-3.5 rounded-full font-black text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
      >
        {showMap ? (
          <>
            Show List <List className="w-4 h-4 text-white" />
          </>
        ) : (
          <>
            Show Map <Map className="w-4 h-4 text-white" />
          </>
        )}
      </button>

      {/* Fullscreen Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed inset-0 bg-white z-[100] flex flex-col md:hidden text-slate-900"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <button 
                onClick={() => setIsMobileSearchOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="font-bold text-sm text-slate-800">Stays & Services Search</span>
              <button
                onClick={() => {
                  setSearchDest("")
                  setStartDate(null)
                  setEndDate(null)
                  setGuestsCount({ couples: 1, organisers: 0 })
                }}
                className="text-xs font-bold text-slate-505 underline"
              >
                Clear all
              </button>
            </div>

            {/* Collapsible search cards */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar bg-slate-50">
              {/* Where card */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm space-y-3">
                <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">1. Where to?</h3>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search destinations"
                    value={searchDest}
                    onChange={(e) => setSearchDest(e.target.value)}
                    className="w-full bg-slate-100 border-none outline-none rounded-xl pl-10 pr-4 py-3 text-sm font-semibold placeholder:text-slate-400 focus:bg-slate-100"
                  />
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto no-scrollbar pt-2">
                  {[
                    "Islamabad", "Centaurus Mall", "Islamabad International Airport (ISB)", "Lahore", "Karachi"
                  ].map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setSearchDest(loc)}
                      className="w-full flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-slate-50 text-left transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="text-xs font-bold text-slate-800">{loc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* When card */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm space-y-3">
                <h3 className="text-xs font-extrabold text-slate-505 uppercase tracking-widest">2. When's your event?</h3>
                <div className="flex gap-2 justify-center border-b border-slate-100 pb-3 mb-2">
                  <button
                    type="button"
                    onClick={() => setCalendarTab('dates')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${
                      calendarTab === 'dates'
                        ? 'bg-slate-100 border-slate-300 text-slate-800'
                        : 'border-transparent text-slate-500'
                    }`}
                  >
                    Dates
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalendarTab('flexible')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${
                      calendarTab === 'flexible'
                        ? 'bg-slate-100 border-slate-300 text-slate-800'
                        : 'border-transparent text-slate-500'
                    }`}
                  >
                    Flexible
                  </button>
                </div>

                {calendarTab === 'dates' ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        disabled={currentYear === 2026 && currentMonthIndex === 5}
                        className="p-1.5 rounded-full border border-slate-200 text-slate-600 disabled:opacity-30"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-bold text-slate-800">{getMonthDetails(currentYear, currentMonthIndex).name}</span>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1.5 rounded-full border border-slate-200 text-slate-600"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {(() => {
                      const m1 = getMonthDetails(currentYear, currentMonthIndex)
                      return (
                        <div>
                          <div className="grid grid-cols-7 gap-y-1 text-center text-[10px] font-semibold text-slate-500 mb-2">
                            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                          </div>
                          <div className="grid grid-cols-7 gap-y-1 text-center text-xs font-bold">
                            {Array.from({ length: m1.startPadding }).map((_, idx) => (
                              <span key={`pad-m-${idx}`}></span>
                            ))}
                            {Array.from({ length: m1.days }).map((_, i) => {
                              const dayNum = i + 1
                              const dateStr = `${m1.year}-${String(m1.month).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
                              const isPast = dateStr < "2026-06-17"
                              const isSelected = dateStr === startDate || dateStr === endDate
                              const isInRange = startDate && endDate && dateStr > startDate && dateStr < endDate

                              return (
                                <button
                                  key={i}
                                  type="button"
                                  disabled={isPast}
                                  onClick={() => handleDateClick(dateStr)}
                                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center transition-colors relative ${
                                    isPast
                                      ? 'text-slate-205 cursor-default pointer-events-none'
                                      : isSelected
                                        ? 'bg-[#222222] text-white font-bold'
                                        : isInRange
                                          ? 'bg-slate-100 text-slate-900 rounded-none w-full'
                                          : 'hover:bg-slate-100 text-slate-800'
                                  }`}
                                >
                                  {dayNum}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center gap-2">
                      {['day', 'weekend', 'week'].map((stay) => (
                        <button
                          key={stay}
                          type="button"
                          onClick={() => setFlexibleStay(stay as any)}
                          className={`px-4 py-1.5 rounded-full text-xs font-bold border capitalize ${
                            flexibleStay === stay
                              ? 'border-slate-900 bg-slate-50 text-slate-900 shadow-3xs'
                              : 'border-slate-200 text-slate-500 bg-white'
                          }`}
                        >
                          {stay}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 px-1">
                      {[
                        { name: "June", label: "June 2026", year: "2026" },
                        { name: "July", label: "July 2026", year: "2026" },
                        { name: "August", label: "August 2026", year: "2026" },
                        { name: "September", label: "September 2026", year: "2026" }
                      ].map((m) => {
                        const isSelected = selectedFlexibleMonths.includes(m.label)
                        return (
                          <button
                            key={m.label}
                            type="button"
                            onClick={() => setSelectedFlexibleMonths([m.label])}
                            className={`w-20 aspect-[4/5] flex flex-col items-center justify-center border rounded-xl p-2 transition-all shrink-0 ${
                              isSelected
                                ? 'border-slate-900 bg-slate-50 text-slate-900 shadow-3xs'
                                : 'border-slate-200 bg-white'
                            }`}
                          >
                            <Calendar className="w-4 h-4 mb-1 text-slate-400" />
                            <span className="text-xs font-semibold text-[#222222]">{m.name}</span>
                            <span className="text-[10px] text-slate-500">{m.year}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Who card */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-extrabold text-slate-550 uppercase tracking-widest">3. Who's attending?</h3>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setGuestsCount({ couples: guestsCount.couples === 1 ? 0 : 1, organisers: 0 })}
                    className="w-full flex justify-between items-center pb-2 border-b border-slate-100 text-left"
                  >
                    <div>
                      <div className="font-extrabold text-xs text-slate-800">Couples</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Bride & Groom / Families</div>
                    </div>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                      guestsCount.couples === 1
                        ? 'bg-[#FF385C] border-[#FF385C] text-white shadow-xs'
                        : 'border-[#b0b0b0] bg-white'
                    }`}>
                      {guestsCount.couples === 1 && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGuestsCount({ couples: 0, organisers: guestsCount.organisers === 1 ? 0 : 1 })}
                    className="w-full flex justify-between items-center text-left"
                  >
                    <div>
                      <div className="font-extrabold text-xs text-slate-800">Event Organisers</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Professional planners</div>
                    </div>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                      guestsCount.organisers === 1
                        ? 'bg-[#FF385C] border-[#FF385C] text-white shadow-xs'
                        : 'border-[#b0b0b0] bg-white'
                    }`}>
                      {guestsCount.organisers === 1 && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer with Search button */}
            <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total guests</span>
                <span className="text-sm font-black text-slate-800 block mt-0.5">{getWhoDisplay()}</span>
              </div>
              <button
                onClick={() => {
                  handleSearchSubmit()
                }}
                className="px-8 py-3.5 rounded-2xl bg-[#FF385C] hover:bg-[#e62248] text-white font-extrabold text-sm flex items-center gap-2 shadow-md"
              >
                <Search className="w-4 h-4 stroke-[3]" />
                <span>Search Now</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedListing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedListing(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl overflow-hidden w-full max-w-3xl flex flex-col md:flex-row shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedListing(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white backdrop-blur-md rounded-full shadow-sm cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-800" />
              </button>
              
              <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-slate-100">
                <img src={selectedListing.images[imageIndices[selectedListing.id] || 0]} alt={selectedListing.title} className="w-full h-full object-cover" />
                <button
                  onClick={(e) => toggleWishlist(e, selectedListing)}
                  className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/60 hover:bg-white/90 backdrop-blur-md transition-colors cursor-pointer"
                >
                  <Heart className={`w-5 h-5 transition-all ${isFavorite(selectedListing.id) ? 'fill-[#FF385C] text-[#FF385C]' : 'fill-black/30 text-slate-800'}`} />
                </button>
              </div>

              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">{selectedListing.title}</h2>
                    <div className="flex items-center gap-1 shrink-0 bg-slate-100 px-2 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
                      <span className="text-xs font-black">{selectedListing.rating.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 mb-6">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedListing.location} • {selectedListing.distance}</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                      <span className="text-sm font-bold text-slate-600">Availability</span>
                      <span className="text-sm font-bold text-slate-900">{selectedListing.dates}</span>
                    </div>
                    {selectedListing.maxGuests && (
                      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                        <span className="text-sm font-bold text-slate-600">Capacity</span>
                        <span className="text-sm font-bold text-slate-900">Up to {selectedListing.maxGuests} {selectedListing.category === 'cars' ? 'passengers' : 'guests'}</span>
                      </div>
                    )}
                    <div className="pt-2">
                      <div className="text-sm font-bold text-slate-500 mb-1">Pricing</div>
                      <div className="text-2xl font-black text-[#FF385C]">
                        Rs. {selectedListing.price.toLocaleString()} <span className="text-sm font-semibold text-slate-500">/ {selectedListing.unit}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button 
                    onClick={() => router.push(getListingLink(selectedListing))}
                    className="w-full py-4 rounded-xl bg-[#222222] hover:bg-black text-white font-black text-sm transition-colors shadow-lg cursor-pointer"
                  >
                    View Details & Book
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FavoritesTray />

      {/* Advanced Filters Modal */}
      <AnimatePresence>
        {showFilterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowFilterModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl overflow-hidden w-full max-w-lg shadow-2xl relative p-6 sm:p-8"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowFilterModal(false)}
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-800" />
              </button>

              <h3 className="text-xl font-black text-slate-900 mb-6 text-left">Advanced Filters</h3>

              <div className="space-y-6 text-left">
                {/* City Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">City</label>
                  <select
                    value={filterCity}
                    onChange={(e) => setFilterCity(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-slate-900 bg-white"
                  >
                    <option value="All">All Cities</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                  </select>
                </div>

                {/* Guest Capacity Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Minimum Capacity (Guests)</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="2000" 
                      step="50"
                      value={filterMinGuests} 
                      onChange={(e) => setFilterMinGuests(Number(e.target.value))}
                      className="flex-1 accent-[#FF385C]"
                    />
                    <span className="text-sm font-bold text-slate-900 min-w-[70px] text-right">{filterMinGuests === 0 ? "Any" : `${filterMinGuests}+`}</span>
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Price Range (PKR)</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block mb-1 font-sans">Min Price</span>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">Rs.</span>
                        <input 
                          type="number"
                          value={filterMinPrice}
                          onChange={(e) => setFilterMinPrice(Number(e.target.value))}
                          className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-slate-900"
                        />
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block mb-1 font-sans">Max Price</span>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">Rs.</span>
                        <input 
                          type="number"
                          value={filterMaxPrice}
                          onChange={(e) => setFilterMaxPrice(Number(e.target.value))}
                          className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="pt-4 flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setFilterMinPrice(0)
                      setFilterMaxPrice(1000000)
                      setFilterCity("All")
                      setFilterMinGuests(0)
                    }}
                    className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-sm transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFilterModal(false)}
                    className="flex-1 py-3 bg-[#FF385C] hover:bg-[#e62248] text-white rounded-xl font-bold text-sm transition-colors cursor-pointer"
                  >
                    Apply Filters
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FavoritesTray />

    </div>
  )
}
