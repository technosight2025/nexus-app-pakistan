import { Card } from "@/components/ui/card"
import { Inbox, CheckCircle2, Handshake, CheckSquare } from "lucide-react"

export function WorkflowPipeline() {
  return (
    <div className="pt-4">
      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Service Workflow</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="relative p-4 border-outline hover:border-primary/50 transition-colors cursor-pointer">
          <div className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-background rounded-full text-xs font-bold text-muted-foreground">1</div>
          <Inbox className="w-6 h-6 text-primary mb-2" />
          <h4 className="text-sm font-bold text-foreground">New Inquiries</h4>
          <p className="text-xs text-muted-foreground mt-1">4 pending</p>
        </Card>
        
        <Card className="relative p-4 border-primary/20 bg-primary-container/20 hover:border-primary/50 transition-colors cursor-pointer shadow-sm">
          <div className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-primary rounded-full text-xs font-bold text-primary-foreground">2</div>
          <CheckCircle2 className="w-6 h-6 text-primary mb-2" />
          <h4 className="text-sm font-bold text-foreground">Quotes Sent</h4>
          <p className="text-xs text-muted-foreground mt-1">2 waiting</p>
        </Card>
        
        <Card className="relative p-4 border-outline hover:border-primary/50 transition-colors cursor-pointer">
          <div className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-background rounded-full text-xs font-bold text-muted-foreground">3</div>
          <Handshake className="w-6 h-6 text-primary mb-2" />
          <h4 className="text-sm font-bold text-foreground">Negotiations</h4>
          <p className="text-xs text-muted-foreground mt-1">5 active</p>
        </Card>

        <Card className="relative p-4 border-outline hover:border-primary/50 transition-colors cursor-pointer">
          <div className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-background rounded-full text-xs font-bold text-muted-foreground">4</div>
          <CheckSquare className="w-6 h-6 text-primary mb-2" />
          <h4 className="text-sm font-bold text-foreground">Completed</h4>
          <p className="text-xs text-muted-foreground mt-1">12 total</p>
        </Card>
      </div>
    </div>
  )
}
