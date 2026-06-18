import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  subtitle: string
  icon?: LucideIcon
  iconClassName?: string
  trend?: string
  trendIcon?: LucideIcon
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClassName,
  trend,
  trendIcon: TrendIcon,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{title}</span>
        <div className="mt-2">
          {Icon ? (
            <div className="flex items-center gap-1">
              <h4 className="text-2xl font-black text-foreground">{value}</h4>
              <Icon className={`w-5 h-5 ${iconClassName}`} />
            </div>
          ) : (
            <h4 className="text-2xl font-black text-foreground">{value}</h4>
          )}
          
          <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-0.5 font-medium">
            {TrendIcon && <TrendIcon className="w-3 h-3 text-primary" />}
            <span className={TrendIcon ? "text-primary" : ""}>{trend || subtitle}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
