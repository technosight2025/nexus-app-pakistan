"use client"

import { useSearchParams } from "next/navigation"
import { ReviewForm } from "@/components/reviews/ReviewForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

function ReviewFormContainer() {
  const searchParams = useSearchParams()
  const businessId = searchParams.get("businessId") || "default-business-id"
  const businessName = searchParams.get("businessName") || "the business"

  return (
    <ReviewForm 
      businessId={businessId} 
      businessName={businessName} 
      onSuccess={() => {
        // You could redirect here or show a success message
      }}
    />
  )
}

export default function NewReviewPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Link 
        href="/dashboard/planner" 
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-2">
          Rate your experience
        </h1>
        <p className="text-muted-foreground text-lg">
          Your feedback helps our community discover the best vendors and venues in Lahore.
        </p>
      </div>

      <Suspense fallback={<div className="text-sm font-medium text-gray-500">Loading form...</div>}>
        <ReviewFormContainer />
      </Suspense>
    </div>
  )
}
