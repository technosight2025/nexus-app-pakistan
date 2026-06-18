import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const INQUIRIES = [
  { id: 1, initials: "ZS", name: "Zainab Sheikh", time: "2m", snippet: "Emerald and gold floral setup...", colorClass: "bg-primary-container text-primary", borderClass: "border-secondary" },
  { id: 2, initials: "AK", name: "Arsalan Khan", time: "45m", snippet: "Corporate lighting follow up...", colorClass: "bg-secondary-container text-secondary-foreground", borderClass: "border-transparent" }
]

export function LiveInquiries() {
  return (
    <Card className="overflow-hidden border-outline">
      <div className="p-4 border-b border-outline flex justify-between items-center bg-surface">
        <h3 className="text-sm font-bold text-foreground">Live Inquiries</h3>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
          <span className="text-[10px] font-bold text-muted-foreground">LIVE</span>
        </div>
      </div>
      <div className="p-2 space-y-1 bg-surface">
        {INQUIRIES.map((inq) => (
          <div key={inq.id} className={`p-3 hover:bg-background rounded transition-colors cursor-pointer border-l-2 ${inq.borderClass}`}>
            <div className="flex gap-3">
              <div className={`w-8 h-8 rounded ${inq.colorClass} flex items-center justify-center font-bold text-xs flex-shrink-0`}>{inq.initials}</div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-center">
                  <h5 className="text-xs font-bold text-foreground truncate">{inq.name}</h5>
                  <span className="text-[10px] text-muted-foreground">{inq.time}</span>
                </div>
                <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">{inq.snippet}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 bg-surface border-t border-outline">
        <Button className="w-full text-xs font-bold h-8 bg-primary/10 text-primary hover:bg-primary/20">
          Open Messenger
        </Button>
      </div>
    </Card>
  )
}
