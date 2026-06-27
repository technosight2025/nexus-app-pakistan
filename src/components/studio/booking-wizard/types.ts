// Shared form data type for the entire booking wizard
export interface BookingFormData {
  // Step 1
  clientMode: "existing" | "new"
  selectedClientId: string | null
  selectedClient: {
    id: string; name: string; type: string; city: string; phone: string; email: string; initials: string; color: string
  } | null
  newClient: {
    name: string; phone: string; email: string; city: string; type: string
  }

  // Step 2
  eventType: string
  eventDate: string
  shift: string
  guestCount: string
  venueName: string
  venueCity: string

  // Step 3
  teamMembers: string[]
  services: ServiceItem[]
  customServices: CustomServiceItem[]

  // Step 4
  packageName: string
  totalAmount: string
  advanceAmount: string
  paymentDueDate: string
  notes: string
}

export interface ServiceItem {
  id: string
  name: string
  defaultPrice: number
  price: string
  selected: boolean
}

export interface CustomServiceItem {
  id: string
  name: string
  price: string
}
