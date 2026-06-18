import React from 'react';
import { Download, MessageSquare, CheckCircle, FileText, Smartphone, Building2 } from 'lucide-react';

export function ProfessionalQuotationView() {
  return (
    <div className="min-h-screen bg-[#F3F4F6] p-4 md:p-8 font-sans text-slate-800">
      {/* Main Container - Mobile First, Responsive 12-Column Grid Wrapper */}
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-[#003366] text-white p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col">
            {/* Logo Placeholder */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center text-[#003366] font-black text-xl">
                N
              </div>
              <span className="text-2xl font-bold tracking-tight">NEXUS EVENT OS</span>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end w-full md:w-auto">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 opacity-90">QUOTATION</h1>
            <div className="flex items-center justify-between w-full md:w-auto md:gap-4">
              <span className="text-sm font-medium text-slate-300 uppercase tracking-wider">Ref: SO-89241A</span>
              <span className="px-3 py-1 bg-amber-500 text-amber-950 text-xs font-bold uppercase rounded-sm tracking-wide">
                Pending Approval
              </span>
            </div>
          </div>
        </div>

        {/* Info Panel Section */}
        <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 border-b border-slate-200">
          
          {/* Issuer Details */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 border-b border-slate-100 pb-2">Issued By</h3>
            <p className="text-lg font-bold text-[#003366]">Nexus Event Management</p>
            <p className="text-sm text-slate-600">123 Corporate Avenue, Gulberg III</p>
            <p className="text-sm text-slate-600">Lahore, Pakistan 54000</p>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium"><span className="text-slate-400">NTN:</span> 892314-7</p>
              <p className="text-xs text-slate-500 font-medium"><span className="text-slate-400">STRN:</span> 32778761239</p>
            </div>
          </div>

          {/* Client Details */}
          <div className="flex flex-col space-y-2 md:text-right">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 border-b border-slate-100 pb-2">Billed To</h3>
            <p className="text-lg font-bold text-[#003366]">Deco Addict Corporation</p>
            <p className="text-sm text-slate-600">Attn: Mr. Tariq Jamil</p>
            <p className="text-sm text-slate-600">45-A Satellite Town, Rawalpindi</p>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium"><span className="text-slate-400">Date:</span> June 07, 2026</p>
              <p className="text-xs text-slate-500 font-medium"><span className="text-slate-400">Valid Until:</span> June 14, 2026</p>
            </div>
          </div>

        </div>

        {/* Dynamic Table Section */}
        <div className="p-6 md:p-10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[#003366] text-[#003366]">
                  <th className="py-3 px-4 font-bold text-sm">Description</th>
                  <th className="py-3 px-4 font-bold text-sm text-right">Quantity</th>
                  <th className="py-3 px-4 font-bold text-sm text-right">Unit Price</th>
                  <th className="py-3 px-4 font-bold text-sm text-center">GST (%)</th>
                  <th className="py-3 px-4 font-bold text-sm text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-800">Premium Marquee Rental</p>
                    <p className="text-xs text-slate-500 mt-1">Main Hall Booking for 3 Hours - Evening Slot</p>
                  </td>
                  <td className="py-4 px-4 text-right font-medium text-slate-600">1</td>
                  <td className="py-4 px-4 text-right font-medium text-slate-600">Rs 150,000</td>
                  <td className="py-4 px-4 text-center">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">16%</span>
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-slate-800">Rs 150,000</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-800">Standard Catering Menu</p>
                    <p className="text-xs text-slate-500 mt-1">Chicken Karahi, Biryani, Naan, Salad, Raita</p>
                  </td>
                  <td className="py-4 px-4 text-right font-medium text-slate-600">500</td>
                  <td className="py-4 px-4 text-right font-medium text-slate-600">Rs 3,500</td>
                  <td className="py-4 px-4 text-center">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">16%</span>
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-slate-800">Rs 1,750,000</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-800">Floral Stage Decor</p>
                    <p className="text-xs text-slate-500 mt-1">Imported fresh flowers setup</p>
                  </td>
                  <td className="py-4 px-4 text-right font-medium text-slate-600">1</td>
                  <td className="py-4 px-4 text-right font-medium text-slate-600">Rs 85,000</td>
                  <td className="py-4 px-4 text-center">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">16%</span>
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-slate-800">Rs 85,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Financial Totals */}
          <div className="flex flex-col items-end mt-8 border-t border-slate-200 pt-6">
            <div className="w-full md:w-80 space-y-3 text-sm">
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Untaxed Amount:</span>
                <span>Rs 1,985,000</span>
              </div>
              <div className="flex justify-between text-slate-600 font-medium">
                <span>GST (16%):</span>
                <span>Rs 317,600</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-200">
                <span className="text-xl font-bold text-[#003366]">Grand Total:</span>
                <span className="text-2xl font-black text-[#003366]">Rs 2,302,600</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Action Section */}
        <div className="bg-slate-50 border-t border-slate-200 p-6 md:p-10 flex flex-col lg:flex-row justify-between gap-8">
          
          {/* Payment Methods */}
          <div className="flex flex-col space-y-4 lg:w-1/2">
            <h3 className="text-sm font-bold text-[#003366] uppercase tracking-wider flex items-center gap-2">
              <FileText size={16} /> Payment Instructions
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-md">
              Please note that 50% advance payment is required to confirm the booking. The remaining balance must be cleared 24 hours prior to the event.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="bg-white border border-slate-200 p-3 rounded flex flex-col gap-1 items-center justify-center text-center">
                <Building2 className="text-[#003366]" size={20} />
                <span className="text-xs font-bold text-slate-700 mt-1">Bank Transfer</span>
                <span className="text-[10px] text-slate-500">Meezan Bank Ltd</span>
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded flex flex-col gap-1 items-center justify-center text-center">
                <Smartphone className="text-rose-600" size={20} />
                <span className="text-xs font-bold text-slate-700 mt-1">JazzCash</span>
                <span className="text-[10px] text-slate-500">0300-1234567</span>
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded flex flex-col gap-1 items-center justify-center text-center">
                <Smartphone className="text-emerald-500" size={20} />
                <span className="text-xs font-bold text-slate-700 mt-1">EasyPaisa</span>
                <span className="text-[10px] text-slate-500">0345-7654321</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col justify-end gap-3 lg:w-1/2">
            <button className="w-full py-4 bg-[#003366] hover:bg-[#002244] text-white font-bold rounded shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2 text-lg">
              <CheckCircle size={24} /> Accept Quotation
            </button>
            <div className="flex gap-3 w-full">
              <button className="flex-1 py-3 bg-white border border-slate-300 hover:border-[#003366] text-[#003366] font-bold rounded transition-all flex items-center justify-center gap-2 text-sm">
                <Download size={18} /> Download PDF
              </button>
              <button className="flex-1 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded transition-all flex items-center justify-center gap-2 text-sm">
                <MessageSquare size={18} /> Share on WhatsApp
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
