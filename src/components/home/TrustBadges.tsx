import * as React from "react"
import { ShieldCheck, MessageCircle, CreditCard } from "lucide-react"
import { Container } from "@/components/ui/Container"

export function TrustBadges() {
  const pillars = [
    {
      title: "Verified Vendors",
      desc: "Every marquee, studio, and coordinator is verified by our team for slot schedules, credentials, and portfolios.",
      icon: ShieldCheck,
      badge: "✅ VERIFIED",
      color: "from-emerald-500/10 to-transparent border-emerald-500/20 text-[#0F5B3E]"
    },
    {
      title: "WhatsApp Native",
      desc: "Say goodbye to endless phone tags. Message vendors directly, get custom quotation attachments, and finalize drafts.",
      icon: MessageCircle,
      badge: "💬 DIRECT CHAT",
      color: "from-amber-500/10 to-transparent border-amber-500/20 text-[#D4AF37]"
    },
    {
      title: "Secure Escrow",
      desc: "Your booking deposit is secure. Payments are logged transparently and held securely to protect client budgets.",
      icon: CreditCard,
      badge: "💰 PROTECTED",
      color: "from-pink-500/10 to-transparent border-pink-500/20 text-[#EC4899]"
    }
  ]

  return (
    <section className="py-16 bg-[#FDF8F0] border-t border-[#E6E2DA]">
      <Container>
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] font-black uppercase text-[#D4AF37] tracking-widest bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20">
            🔒 Safe & Secure
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1A1A1A]">
            Your Trust, Our Priority
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
            Nexus coordinates booking pipelines, logs payment records, and screens participants to guarantee peace of mind.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-[#E6E2DA] rounded-[20px] p-6.5 text-left flex flex-col justify-between hover:border-[#D4AF37]/30 transition-all duration-300 relative overflow-hidden group shadow-2xs hover:shadow-xs"
            >
              <div className="space-y-4">
                {/* Icon & Badge */}
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E6E2DA] flex items-center justify-center text-[#0F5B3E] group-hover:bg-[#0F5B3E]/10 transition-colors">
                    <item.icon className="w-6 h-6 shrink-0" />
                  </div>
                  <span className="text-[8.5px] font-black tracking-widest border border-[#E6E2DA] bg-slate-50 text-slate-400 px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-lg text-[#1A1A1A]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </Container>
    </section>
  )
}
