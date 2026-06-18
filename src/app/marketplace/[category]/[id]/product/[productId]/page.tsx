import { ProductClient } from './ProductClient'
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// In a real app, we'd fetch all product data based on `productId`. 
// Here we are mocking detailed data for static legacy items.
const MOCK_PRODUCT_DB: Record<string, any> = {
  "crimson-bridal-set": {
    id: "crimson-bridal-set",
    title: "Crimson Bridal Set",
    tag: "Bridal",
    price: "65,000",
    description: "An incredibly detailed, heavy embroidered pure raw silk lehnga with a rich crimson hue. The set includes a heavily embellished double dupatta with intricate zardozi, crystals, and thread work. Designed for a royal aesthetic with traditional motifs, this piece offers an unmatched blend of elegance and heritage.",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1600&q=80",
      "https://images.unsplash.com/photo-1596450514735-111a2faefa25?w=1600&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=80",
      "https://images.unsplash.com/photo-1583391733958-650fac5ceb7c?w=1600&q=80",
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=1600&q=80"
    ],
    features: [
      "Heavy Embroidery", 
      "Includes Double Dupatta", 
      "Premium Zardozi & Crystals",
      "Dry Clean Included",
      "Custom Adjustments Free"
    ],
    bookedDates: ["Dec 15", "Dec 20"],
    sizes: ["S", "M", "L", "Custom Fit"],
    material: "Pure Raw Silk & Net",
    vendorName: "Zardozi Lehnga Boutique",
    vendorId: "prof-lehnga",
    categorySlug: "rentals"
  }
}

export default async function ProductPage({ params }: { params: Promise<{ category: string, id: string, productId: string }> }) {
  const resolvedParams = await params;
  let productData = MOCK_PRODUCT_DB[resolvedParams.productId]

  // If not found in static mock, try fetching from Supabase
  if (!productData) {
    const { data, error } = await supabase
      .from("rental_outfits")
      .select("*")
      .eq("id", resolvedParams.productId)
      .single()

    if (data && !error) {
      productData = {
        id: data.id,
        title: data.name,
        tag: data.tag,
        price: data.price,
        description: data.description || "",
        images: data.image_url ? [data.image_url] : ["/images/wardrobe/1.png"],
        features: data.features || [],
        bookedDates: data.due_back ? [data.due_back] : [],
        sizes: data.sizes || [],
        material: data.material || "",
        vendorName: "Nexus Partner",
        vendorId: resolvedParams.id,
        categorySlug: resolvedParams.category
      }
    } else {
      // Ultimate fallback
      productData = MOCK_PRODUCT_DB["crimson-bridal-set"]
    }
  }

  return <ProductClient product={productData} />
}
