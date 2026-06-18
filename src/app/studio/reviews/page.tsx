"use client"

import { Card } from "@/components/ui/card"
import { Star, StarHalf, MessageSquare, Search, Filter, MoreVertical, Plus } from "lucide-react"

export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      client: "Ayesha & Hamza",
      event: "Wedding Ceremony",
      rating: 5,
      comment: "Absolutely outstanding photography! The team captured every little emotion perfectly. Highly recommended for any premium wedding in Islamabad.",
      date: "Oct 13, 2026",
      avatar: "AH"
    },
    {
      id: 2,
      client: "Sarah Khan",
      event: "TechCorp Corporate Gala",
      rating: 5,
      comment: "Professional, punctual, and delivered the highest quality highlight videos. The team worked seamlessly with our venue organizers.",
      date: "Oct 15, 2026",
      avatar: "SK"
    },
    {
      id: 3,
      client: "Zainab & Hassan",
      event: "Mehndi Night",
      rating: 4.5,
      comment: "The mehndi photographs are vibrant and beautiful. Minor delay in the initial raw draft but the final delivery was exceptional.",
      date: "Oct 06, 2026",
      avatar: "ZH"
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-poppins text-gray-900 dark:text-white tracking-tight">
            Reviews & Feedback
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Monitor client reviews, ratings, and feedback for your studio.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-[#0A3B2A] dark:bg-cyan-600 text-white rounded-full font-bold text-sm hover:bg-[#0F5B3E] dark:hover:bg-cyan-500 transition-colors shadow-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Share Link
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] transition-all">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Average Rating</h3>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-black text-gray-900 dark:text-white">4.9</span>
            <div className="flex flex-col">
              <div className="flex gap-0.5 text-amber-400">
                <Star className="w-4.5 h-4.5 fill-current" />
                <Star className="w-4.5 h-4.5 fill-current" />
                <Star className="w-4.5 h-4.5 fill-current" />
                <Star className="w-4.5 h-4.5 fill-current" />
                <Star className="w-4.5 h-4.5 fill-current" />
              </div>
              <span className="text-xs text-gray-400 mt-1">Based on 48 reviews</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] transition-all">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Total Reviews</h3>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-black text-gray-900 dark:text-white">128</span>
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 ml-auto">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] transition-all">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Response Rate</h3>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-black text-gray-900 dark:text-white">98%</span>
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 ml-auto">
              <Star className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search & Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input 
            type="text" 
            placeholder="Search reviews..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 focus:border-[#0A3B2A] text-sm"
          />
        </div>
        <button className="px-4 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 flex items-center gap-2 shadow-sm">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <Card key={rev.id} className="p-6 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E6F0EC] dark:bg-emerald-500/20 text-[#0F5B3E] dark:text-emerald-400 font-extrabold flex items-center justify-center text-sm">
                  {rev.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{rev.client}</h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold">{rev.event} • {rev.date}</p>
                </div>
              </div>
              <div className="flex gap-0.5 text-amber-400">
                {[...Array(Math.floor(rev.rating))].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
                {rev.rating % 1 !== 0 && <StarHalf className="w-4 h-4 fill-current" />}
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 leading-relaxed font-medium">
              "{rev.comment}"
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}
