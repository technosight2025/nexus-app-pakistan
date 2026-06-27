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
