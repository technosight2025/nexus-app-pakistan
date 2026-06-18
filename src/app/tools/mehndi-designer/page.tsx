import { PublicLayout } from "@/components/layout/PublicLayout"
import { AIMehndiDesigner } from "@/components/tools/AIMehndiDesigner"

export default function MehndiDesignerPage() {
  return (
    <PublicLayout>
      <div className="py-8">
        <AIMehndiDesigner />
      </div>
    </PublicLayout>
  )
}
