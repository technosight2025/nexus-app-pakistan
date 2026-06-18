export const MOCK_VENUES = [
  {
    id: "v1",
    name: "The Royal Palm Golf & Country Club",
    location: "Lahore",
    area: "DHA",
    type: "Marquee",
    capacity: 1200,
    pricePerHead: 4500,
    rating: 4.9,
    reviews: 342,
    images: [
      "/images/pakistani_wedding_venue.png",
      "/images/pakistani_wedding_couple.png"
    ],
    features: ["Valet Parking", "Catering", "Bridal Room", "Outdoor Area"],
    coordinates: { lat: 31.5204, lng: 74.3587 },
    isFeatured: true
  },
  {
    id: "v2",
    name: "Serena Hotel",
    location: "Islamabad",
    area: "Sector G-5",
    type: "Hotel Banquet",
    capacity: 800,
    pricePerHead: 6500,
    rating: 5.0,
    reviews: 512,
    images: [
      "/images/pakistani_mehndi_hands.png",
      "/images/pakistani_wedding_venue.png"
    ],
    features: ["5-Star Catering", "Accommodation", "Helipad", "Security"],
    coordinates: { lat: 33.7294, lng: 73.0931 },
    isFeatured: true
  },
  {
    id: "v3",
    name: "Pearl Continental",
    location: "Karachi",
    area: "Saddar",
    type: "Hotel Banquet",
    capacity: 2000,
    pricePerHead: 5500,
    rating: 4.8,
    reviews: 890,
    images: [
      "/images/pakistani_bride_makeup.png",
      "/images/pakistani_mehndi_hands.png"
    ],
    features: ["Central AC", "Valet Parking", "In-house Decor", "Generator"],
    coordinates: { lat: 24.8510, lng: 67.0270 },
    isFeatured: false
  },
  {
    id: "v4",
    name: "Bagh-e-Jinnah Gardens",
    location: "Lahore",
    area: "Mall Road",
    type: "Outdoor",
    capacity: 500,
    pricePerHead: 2500,
    rating: 4.7,
    reviews: 124,
    images: [
      "/images/pakistani_wedding_venue.png",
      "/images/pakistani_wedding_venue.png"
    ],
    features: ["Nature View", "Open Air", "Historical"],
    coordinates: { lat: 31.5540, lng: 74.3312 },
    isFeatured: false
  }
];

export const MOCK_VENDORS = [
  {
    id: "ven1",
    name: "Maha's Photography",
    category: "Photography",
    location: "Lahore",
    startingPrice: 150000,
    rating: 4.9,
    reviews: 420,
    images: [
      "/images/pakistani_wedding_couple.png",
      "/images/pakistani_bride_makeup.png"
    ],
    features: ["Cinematography", "Drone", "Photo Album", "Same Day Edit"],
    isFeatured: true
  },
  {
    id: "ven2",
    name: "Qasim Ali Mureed Films",
    category: "Videography",
    location: "Karachi",
    startingPrice: 200000,
    rating: 5.0,
    reviews: 156,
    images: [
      "/images/pakistani_wedding_venue.png",
      "/images/pakistani_mehndi_hands.png"
    ],
    features: ["Feature Films", "Interviews", "4K Resolution"],
    isFeatured: true
  },
  {
    id: "ven5",
    name: "Zardozi Lehnga Boutique",
    category: "Lehnga Rental",
    location: "Gulberg, Lahore",
    startingPrice: 15000,
    rating: 4.9,
    reviews: 142,
    images: [
      "/images/pakistani_bride_makeup.png",
      "/images/pakistani_mehndi_hands.png"
    ],
    features: ["Designer Rental", "Traditional", "Modern"],
    isFeatured: true
  },
  {
    id: "ven3",
    name: "Sana Safinaz Bridals",
    category: "Bridal Wear",
    location: "Islamabad",
    startingPrice: 500000,
    rating: 4.8,
    reviews: 89,
    images: [
      "/images/pakistani_bride_makeup.png",
      "/images/pakistani_bride_makeup.png"
    ],
    features: ["Custom Fittings", "Designer Label", "Accessories"],
    isFeatured: false
  },
  {
    id: "ven4",
    name: "Nabila's Salon",
    category: "Makeup",
    location: "Lahore",
    startingPrice: 80000,
    rating: 4.9,
    reviews: 632,
    images: [
      "/images/pakistani_mehndi_hands.png",
      "/images/pakistani_bride_makeup.png"
    ],
    features: ["Bridal Makeup", "Party Makeup", "Hair Styling"],
    isFeatured: false
  }
];
