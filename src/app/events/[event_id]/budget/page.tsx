"use client"

import React from 'react';
import { Calculator, Plus, DollarSign, PieChart } from 'lucide-react';

export default function EventBudgetPage() {
  const expenses = [
    { category: 'Venue', amount: 'Rs. 1,200,000', paid: 'Rs. 500,000', status: 'Partial' },
    { category: 'Catering', amount: 'Rs. 800,000', paid: 'Rs. 0', status: 'Unpaid' },
    { type: 'Decor', amount: 'Rs. 300,000', paid: 'Rs. 300,000', status: 'Paid' },
  ];

  return (
    <div className="p-8 md:p-12 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1D1C17] mb-2">Budget Tracker</h1>
          <p className="text-[#5E6460]">Manage expenses and track your payments.</p>
        </div>
        <button className="px-4 py-2 bg-[#0F5B3E] text-white font-bold text-sm rounded-xl shadow-md hover:bg-[#0A422C] transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Expense
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1D1C17] text-white p-6 rounded-2xl shadow-xl">
          <div className="text-white/50 text-sm font-bold uppercase tracking-wider mb-2">Total Budget</div>
          <div className="text-3xl font-bold">Rs. 3,500,000</div>
        </div>
        <div className="bg-white border border-[#E6E2DA] p-6 rounded-2xl shadow-sm">
          <div className="text-[#5E6460] text-sm font-bold uppercase tracking-wider mb-2">Total Paid</div>
          <div className="text-3xl font-bold text-[#0F5B3E]">Rs. 800,000</div>
        </div>
        <div className="bg-white border border-[#E6E2DA] p-6 rounded-2xl shadow-sm">
          <div className="text-[#5E6460] text-sm font-bold uppercase tracking-wider mb-2">Remaining</div>
          <div className="text-3xl font-bold text-[#C9A227]">Rs. 2,700,000</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#E6E2DA] overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#FAF7F2] border-b border-[#E6E2DA]">
            <tr>
              <th className="p-4 font-bold text-[#5E6460] text-sm">Expense Category</th>
              <th className="p-4 font-bold text-[#5E6460] text-sm">Total Amount</th>
              <th className="p-4 font-bold text-[#5E6460] text-sm">Amount Paid</th>
              <th className="p-4 font-bold text-[#5E6460] text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, i) => (
              <tr key={i} className="border-b border-[#E6E2DA] hover:bg-[#FAF7F2] transition-colors">
                <td className="p-4 font-bold text-[#1D1C17]">{exp.category || exp.type}</td>
                <td className="p-4 text-[#1D1C17]">{exp.amount}</td>
                <td className="p-4 text-[#5E6460]">{exp.paid}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    exp.status === 'Paid' ? 'bg-[#E6F0EC] text-[#0F5B3E]' :
                    exp.status === 'Partial' ? 'bg-[#FDF8EA] text-[#C9A227]' :
                    'bg-red-50 text-red-600'
                  }`}>
                    {exp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
