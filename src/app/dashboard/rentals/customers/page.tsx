import CustomersClient from "./CustomersClient"

export const metadata = {
  title: "Customers CRM | Nexus OS",
  description: "Manage your rental customers, view lifetime value, and track past orders.",
}

export default function CustomersPage() {
  return <CustomersClient />
}
