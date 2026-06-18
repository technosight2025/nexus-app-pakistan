import { VendorWorkspace } from "@/components/dashboard/host/v2/VendorWorkspace"

export default function VendorWorkspacePage({ params }: { params: { vendorId: string } }) {
  return <VendorWorkspace vendorId={params.vendorId} />
}
