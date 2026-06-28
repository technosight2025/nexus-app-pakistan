"use client"

export const DEFAULT_TERMS = "1. Quotation is valid for 14 days.\n2. 50% non-refundable advance required to secure booking.\n3. All raw files remain property of the studio unless explicitly purchased.\n4. Standard delivery time is 4-6 weeks from the event date.";
export const DEFAULT_PAYMENT = "• 50% Advance Booking\n• 30% On Event Day\n• 20% Before Final Delivery";
export const DEFAULT_DELIVERABLES = "• All Raw Photos & Videos\n• 1 Cinematic Highlight Reel (5-7 mins)\n• 1 Signature Premium Photo Album (40 Pages)";

const DEFAULT_QUOTATIONS = [
  { id: "QT-0198", client: "Ayesha & Hamza", event: "Walima", date: "Jun 13, 2025", total: 120000, status: "Approved", items: [
    { name: "Photography", desc: "Full day coverage", qty: 1, price: 50000 },
    { name: "Videography", desc: "Full day + Highlights", qty: 1, price: 70000 }
  ], initials: "A", color: "bg-indigo-500", terms: DEFAULT_TERMS, paymentSteps: DEFAULT_PAYMENT, deliverables: DEFAULT_DELIVERABLES, pin: "1234", actionHistory: [{ date: "Jun 10, 2025", action: "Quotation Created", description: "Initial draft created by studio." }] },
  { id: "QT-0199", client: "Sara Imran", event: "Bridal Shoot", date: "Jun 14, 2025", total: 45000, status: "Sent", items: [
    { name: "Studio Shoot", desc: "4 hours in studio", qty: 1, price: 45000 }
  ], initials: "S", color: "bg-sky-500", terms: DEFAULT_TERMS, paymentSteps: DEFAULT_PAYMENT, deliverables: DEFAULT_DELIVERABLES, pin: "5678", actionHistory: [{ date: "Jun 12, 2025", action: "Quotation Sent", description: "Sent to client via WhatsApp." }] },
  { id: "QT-0200", client: "Malik Family", event: "Engagement", date: "Jun 15, 2025", total: 65000, status: "Draft", items: [
    { name: "Event Coverage", desc: "Photo & Video", qty: 1, price: 65000 }
  ], initials: "M", color: "bg-emerald-500", terms: DEFAULT_TERMS, paymentSteps: DEFAULT_PAYMENT, deliverables: DEFAULT_DELIVERABLES, pin: null, actionHistory: [{ date: "Jun 14, 2025", action: "Quotation Created", description: "Initial draft created by studio." }] },
]

const DEFAULT_INVOICES = [
  { id: "INV-2401", client: "Ayesha Khan", event: "Walima Photography", date: "Jun 20, 2025", due: "Jul 5, 2025", amount: 120000, paid: 60000, status: "Partial", items: [
    { name: "Walima Coverage", desc: "Photo and Video", qty: 1, price: 120000 }
  ]},
  { id: "INV-2402", client: "Hassan Ali", event: "Wedding Coverage", date: "Jun 22, 2025", due: "Jul 10, 2025", amount: 65000, paid: 65000, status: "Paid", items: [
    { name: "Wedding Coverage", desc: "Photography only", qty: 1, price: 65000 }
  ]}
]

export function getQuotations() {
  if (typeof window === 'undefined') return DEFAULT_QUOTATIONS;
  const stored = localStorage.getItem("nexus_quotations");
  if (stored) return JSON.parse(stored);
  
  localStorage.setItem("nexus_quotations", JSON.stringify(DEFAULT_QUOTATIONS));
  return DEFAULT_QUOTATIONS;
}

export function getQuotation(id: string) {
  const quotes = getQuotations();
  return quotes.find((q: any) => q.id === id);
}

export function updateQuotation(id: string, updates: any) {
  if (typeof window === 'undefined') return;
  const quotes = getQuotations();
  const index = quotes.findIndex((q: any) => q.id === id);
  if (index !== -1) {
    quotes[index] = { ...quotes[index], ...updates };
    localStorage.setItem("nexus_quotations", JSON.stringify(quotes));
  }
}

export function createQuotation(quoteData: any) {
  if (typeof window === 'undefined') return;
  const quotes = getQuotations();
  
  // Generate a random ID QT-XXXX
  const newId = `QT-${Math.floor(1000 + Math.random() * 9000)}`;
  
  const newQuote = {
    ...quoteData,
    id: newId,
    status: "Draft",
    color: ["bg-indigo-500", "bg-sky-500", "bg-emerald-500", "bg-purple-500", "bg-rose-500"][Math.floor(Math.random() * 5)],
    initials: quoteData.client ? quoteData.client.charAt(0).toUpperCase() : "C",
    pin: null,
    actionHistory: [{
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      action: "Quotation Created",
      description: "Initial draft created by studio."
    }]
  };
  
  quotes.unshift(newQuote);
  localStorage.setItem("nexus_quotations", JSON.stringify(quotes));
  
  return newQuote;
}

// --- INVOICES ---

export function getInvoices() {
  if (typeof window === 'undefined') return DEFAULT_INVOICES;
  const stored = localStorage.getItem("nexus_invoices");
  if (stored) return JSON.parse(stored);
  
  localStorage.setItem("nexus_invoices", JSON.stringify(DEFAULT_INVOICES));
  return DEFAULT_INVOICES;
}

export function getInvoice(id: string) {
  const invoices = getInvoices();
  return invoices.find((i: any) => i.id === id);
}

export function updateInvoice(id: string, updates: any) {
  if (typeof window === 'undefined') return;
  const invoices = getInvoices();
  const index = invoices.findIndex((i: any) => i.id === id);
  if (index !== -1) {
    invoices[index] = { ...invoices[index], ...updates };
    localStorage.setItem("nexus_invoices", JSON.stringify(invoices));
  }
}

export function createInvoice(quotation: any) {
  if (typeof window === 'undefined') return;
  const invoices = getInvoices();
  
  const newId = quotation.id.replace("QT", "INV");
  
  // Check if it already exists
  if (invoices.find((i: any) => i.id === newId)) return newId;
  
  const due = new Date();
  due.setDate(due.getDate() + 7); // Due in 7 days
  
  const newInvoice = {
    id: newId,
    client: quotation.client,
    event: quotation.event,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    due: due.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    amount: quotation.total,
    paid: 0,
    status: "Unpaid",
    items: quotation.items,
    color: quotation.color || "bg-indigo-500",
    initials: quotation.initials || "C"
  };
  
  invoices.unshift(newInvoice);
  localStorage.setItem("nexus_invoices", JSON.stringify(invoices));
  
  return newId;
}

// --- CONTACTS ---

export const DEFAULT_CONTACTS = [
  {
    id: "CL-001", name: "Ayesha Khan", type: "Bride", city: "Lahore",
    email: "ayesha@gmail.com", phone: "+92-300-1234567",
    homeAddress: "DHA Phase 6, Lahore", businessAddress: "",
    bookings: 3, totalValue: 245000, lastEvent: "Walima – Jul 5",
    rating: 5, status: "Active", initials: "AK", color: "bg-indigo-500",
    tags: ["Wedding","VIP"], joined: "Jan 2024",
    timeline: [
      { date: "Jun 20", event: "Final album delivered" },
      { date: "May 25", event: "Walima shoot completed" },
      { date: "May 1", event: "Booking confirmed – ₨1,20,000" },
    ]
  },
  {
    id: "CL-002", name: "Hassan Ali", type: "Groom", city: "Islamabad",
    email: "hassan@hotmail.com", phone: "+92-321-9876543",
    homeAddress: "F-8/4, Islamabad", businessAddress: "",
    bookings: 2, totalValue: 120000, lastEvent: "Walima – Jul 18",
    rating: 5, status: "Active", initials: "HA", color: "bg-emerald-500",
    tags: ["Wedding"], joined: "Mar 2024",
    timeline: [
      { date: "Jul 2", event: "Advance payment received" },
      { date: "Jun 15", event: "Contract signed" },
    ]
  },
  {
    id: "CL-003", name: "Sara Imran", type: "Client", city: "Karachi",
    email: "sara.imran@corp.pk", phone: "+92-333-5551234",
    homeAddress: "Clifton Block 5, Karachi", businessAddress: "",
    bookings: 1, totalValue: 45000, lastEvent: "Bridal Shoot – Jul 10",
    rating: 4, status: "Pending", initials: "SI", color: "bg-sky-500",
    tags: ["Shoot"], joined: "Jun 2024",
    timeline: [
      { date: "Jun 28", event: "Inquiry submitted" },
    ]
  },
  {
    id: "CL-004", name: "Farhan Malik", type: "Corporate", city: "Lahore",
    email: "farhan@techcorp.pk", phone: "+92-300-7890123",
    homeAddress: "Askari 11, Lahore", businessAddress: "TechCorp Plaza, Gulberg III",
    bookings: 4, totalValue: 380000, lastEvent: "Product Launch – Jul 22",
    rating: 5, status: "Active", initials: "FM", color: "bg-amber-500",
    tags: ["Corporate","VIP","Repeat"], joined: "Oct 2023",
    timeline: [
      { date: "Jul 1", event: "New project created" },
      { date: "May 30", event: "Invoice #INV-098 paid" },
      { date: "Apr 12", event: "Corporate shoot completed" },
    ]
  },
  {
    id: "CL-005", name: "Nadia Hussain", type: "Bride", city: "Faisalabad",
    email: "nadia@gmail.com", phone: "+92-311-4445678",
    homeAddress: "Peoples Colony, Faisalabad", businessAddress: "",
    bookings: 1, totalValue: 35000, lastEvent: "Mehndi – Jul 18",
    rating: 4, status: "Active", initials: "NH", color: "bg-rose-500",
    tags: ["Wedding"], joined: "May 2024",
    timeline: [
      { date: "Jun 10", event: "Booking finalized" },
    ]
  },
  {
    id: "CT-006", name: "Bilal Khan", type: "Corporate", city: "Karachi",
    email: "bilal@brand.pk", phone: "+92-321-2223344",
    homeAddress: "", businessAddress: "I.I. Chundrigar Road, Karachi",
    bookings: 1, totalValue: 95000, lastEvent: "Product Launch – Aug 2",
    rating: 0, status: "Lead", initials: "BK", color: "bg-cyan-500",
    tags: ["Corporate","New Lead"], joined: "Jul 2024",
    timeline: [
      { date: "Jul 5", event: "Inquiry received via website" },
    ]
  },
  {
    id: "CT-007", name: "Alpha Prints", type: "Vendor", city: "Lahore",
    email: "orders@alphaprints.pk", phone: "+92-300-1112233",
    homeAddress: "", businessAddress: "Shop 12, Photography Market, Nisbat Road",
    bookings: 14, totalValue: 250000, lastEvent: "Album Printing",
    rating: 5, status: "Active", initials: "AP", color: "bg-orange-500",
    tags: ["Printing", "Vendor", "Reliable"], joined: "Jan 2023",
    timeline: [
      { date: "Jul 1", event: "Delivered 5 albums" },
      { date: "Jun 15", event: "Invoice paid" },
    ]
  },
  {
    id: "CT-008", name: "Zain Drone Pro", type: "Freelancer", city: "Islamabad",
    email: "zain.drones@gmail.com", phone: "+92-333-9998877",
    homeAddress: "G-11 Markaz, Islamabad", businessAddress: "",
    bookings: 8, totalValue: 160000, lastEvent: "Walima Coverage",
    rating: 4, status: "Active", initials: "ZD", color: "bg-violet-500",
    tags: ["Drone Operator", "Freelancer"], joined: "Nov 2023",
    timeline: [
      { date: "Jul 4", event: "Hired for BK-1024" },
    ]
  },
]

export function getContacts() {
  if (typeof window === 'undefined') return DEFAULT_CONTACTS;
  const stored = localStorage.getItem("nexus_contacts");
  if (stored) return JSON.parse(stored);
  
  localStorage.setItem("nexus_contacts", JSON.stringify(DEFAULT_CONTACTS));
  return DEFAULT_CONTACTS;
}
