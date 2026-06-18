import { Card } from "@/components/ui/card"

const MOCK_PIPELINE = [
  { id: 1, client: "Zainab Sheikh", service: "Bridal Floral Concept", stage: "Negotiating", value: "PKR 45,000", stageBg: "bg-secondary-container", stageText: "text-secondary-foreground" },
  { id: 2, client: "Arsalan Khan", service: "Corporate Gala Lighting", stage: "Quotation Sent", value: "PKR 82,000", stageBg: "bg-primary-container", stageText: "text-primary" }
]

export function PipelineTable() {
  return (
    <Card className="overflow-hidden border-outline">
      <div className="p-4 border-b border-outline bg-background/50 flex justify-between items-center">
        <h3 className="text-sm font-bold text-foreground">Active Pipeline</h3>
        <button className="text-xs text-primary font-bold hover:underline">View All Records</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-background/30 text-[11px] text-muted-foreground uppercase tracking-wider">
              <th className="px-6 py-3 font-bold">Client</th>
              <th className="px-6 py-3 font-bold">Service Category</th>
              <th className="px-6 py-3 font-bold">Stage</th>
              <th className="px-6 py-3 font-bold text-right">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline">
            {MOCK_PIPELINE.map((item) => (
              <tr key={item.id} className="hover:bg-background transition-colors cursor-pointer group">
                <td className="px-6 py-4 font-bold text-primary">{item.client}</td>
                <td className="px-6 py-4 text-muted-foreground">{item.service}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 ${item.stageBg} ${item.stageText} text-[10px] font-bold rounded-full`}>
                    {item.stage}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-bold">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
