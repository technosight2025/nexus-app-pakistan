import { InquireClient } from './InquireClient'

// Re-using the same mock DB as the product page for demonstration
const MOCK_PRODUCT_DB: Record<string, any> = {
  "crimson-bridal-set": {
    id: "crimson-bridal-set",
    title: "Crimson Bridal Set",
    tag: "Bridal",
    price: "65,000",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1600&q=80"
    ],
    sizes: ["S", "M", "L", "Custom Fit"],
    vendorName: "Zardozi Lehnga Boutique",
    vendorId: "prof-lehnga",
    categorySlug: "rentals"
  }
}

export default function InquirePage({ params }: { params: { category: string, id: string, productId: string } }) {
  // Use the mocked crimson product data as fallback
  const productData = MOCK_PRODUCT_DB[params.productId] || MOCK_PRODUCT_DB["crimson-bridal-set"]

  return <InquireClient product={productData} />
}
