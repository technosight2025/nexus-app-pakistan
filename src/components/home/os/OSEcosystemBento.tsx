"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/Container"
import {
  Users, Building, Briefcase, Camera, Music, Utensils,
  Mail, Search, Image as ImageIcon, FileText, CheckSquare, Settings,
  Monitor, BarChart, Smartphone, Calendar, UserCheck
} from "lucide-react"

export function OSEcosystemBento() {
  const bentoItems = [
    {
      title: "For Customers",
      icon: Users,
      features: [
        { name: "Invitations", icon: Mail },
        { name: "CRM-based Discovery", icon: Search },
        { name: "Memories", icon: ImageIcon }
      ]
    },
    {
      title: "For Businesses",
      icon: Briefcase,
      features: [
        { name: "Quotations", icon: FileText },
        { name: "Workforce", icon: Users },
        { name: "Customer Portals", icon: Smartphone },
        { name: "Operations", icon: Settings }
      ]
    },
    {
      title: "For Venues",
      icon: Building,
      features: [
        { name: "Displays", icon: Monitor },
        { name: "CRM", icon: UserCheck },
        { name: "Venue Analytics", icon: BarChart }
      ]
    },
    {
      title: "For Hotels",
      icon: Building,
      features: [
        { name: "Room Blocks", icon: Calendar },
        { name: "Event Spaces", icon: CheckSquare },
        { name: "Banquet Ops", icon: Settings }
      ]
    },
    {
      title: "For Planners",
      icon: CheckSquare,
      features: [
        { name: "Task Management", icon: CheckSquare },
        { name: "Vendor Network", icon: Search },
        { name: "Client Approvals", icon: FileText }
      ]
    },
    {
      title: "For Creatives",
      icon: Camera,
      features: [
        { name: "Portfolio", icon: ImageIcon },
        { name: "Booking Calendar", icon: Calendar },
        { name: "Client Delivery", icon: Mail }
      ]
    }
  ]

  return (
    <section className="pt-48 pb-24 bg-[#FAF7F2]">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-left mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">Ecosystem Breakdown</h2>
            <p className="text-sm text-[#6B7280]">Tools designed specifically for every participant in the network.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bentoItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E6E2DA] hover:border-[#D4AF37]/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="p-2 bg-slate-50 rounded-lg text-[#0F5B3E]">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#1A1A1A]">{item.title}</h3>
                </div>

                <ul className="space-y-4">
                  {item.features.map((feature) => (
                    <li key={feature.name} className="flex items-center gap-3 text-sm text-[#6B7280] group cursor-default">
                      <div className="p-1.5 rounded-md bg-[#FDF8F0] text-[#0F5B3E] group-hover:bg-[#0F5B3E] group-hover:text-white transition-colors">
                        <feature.icon className="w-4 h-4" />
                      </div>
                      <span className="group-hover:text-[#1A1A1A] transition-colors font-medium">
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
