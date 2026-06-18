"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, CheckCircle2, Circle, Gift, Users, Share2, Plus, Sparkles, AlertCircle, Sofa, Monitor, Utensils, Shirt } from "lucide-react"
import { Button } from "@/components/ui/button"

const CATEGORIES = [
  { id: 'furniture', name: 'Furniture', icon: Sofa, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-200' },
  { id: 'electronics', name: 'Electronics', icon: Monitor, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200' },
  { id: 'crockery', name: 'Kitchen & Crockery', icon: Utensils, color: 'text-rose-600', bg: 'bg-rose-100', border: 'border-rose-200' },
  { id: 'wardrobe', name: 'Wardrobe & Extras', icon: Shirt, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-200' },
]

const INITIAL_ITEMS = [
  { id: 1, category: 'furniture', name: 'Master Bed Set (King Size)', estCost: 150000, actCost: 0, status: 'pending', claimedBy: null },
  { id: 2, category: 'furniture', name: '7-Seater Sofa Set', estCost: 85000, actCost: 85000, status: 'purchased', claimedBy: null },
  { id: 3, category: 'furniture', name: 'Dining Table (6 chairs)', estCost: 70000, actCost: 0, status: 'claimed', claimedBy: 'Taya Abu' },
  
  { id: 4, category: 'electronics', name: 'Refrigerator (Double Door)', estCost: 120000, actCost: 115000, status: 'purchased', claimedBy: null },
  { id: 5, category: 'electronics', name: 'Split AC (1.5 Ton)', estCost: 135000, actCost: 0, status: 'pending', claimedBy: null },
  { id: 6, category: 'electronics', name: 'Microwave Oven', estCost: 25000, actCost: 0, status: 'claimed', claimedBy: 'Khalid Uncle' },
  { id: 7, category: 'electronics', name: 'Iron & Ironing Board', estCost: 12000, actCost: 0, status: 'pending', claimedBy: null },

  { id: 8, category: 'crockery', name: '72-Piece Dinner Set', estCost: 45000, actCost: 42000, status: 'purchased', claimedBy: null },
  { id: 9, category: 'crockery', name: 'Non-Stick Cookware Set', estCost: 35000, actCost: 0, status: 'pending', claimedBy: null },
  { id: 10, category: 'crockery', name: 'Tea Set (Bone China)', estCost: 15000, actCost: 0, status: 'claimed', claimedBy: 'Cousin Sara' },

  { id: 11, category: 'wardrobe', name: 'Unstitched Suits (Winter)', estCost: 60000, actCost: 0, status: 'pending', claimedBy: null },
  { id: 12, category: 'wardrobe', name: 'Bridal Shoes & Bags', estCost: 30000, actCost: 28000, status: 'purchased', claimedBy: null },
]

export function JahaizTracker() {
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [activeCategory, setActiveCategory] = useState('furniture')
  const [isRegistryMode, setIsRegistryMode] = useState(false)

  const toggleStatus = (id: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        if (item.status === 'pending') return { ...item, status: 'purchased', actCost: item.estCost }
        if (item.status === 'purchased') return { ...item, status: 'pending', actCost: 0 }
        // Claimed items can't be toggled by the host directly in this simple demo
        return item
      }
      return item
    }))
  }

  // Budget Math
  const totalBudget = items.reduce((sum, item) => sum + item.estCost, 0)
  const totalSpent = items.filter(i => i.status === 'purchased').reduce((sum, item) => sum + item.actCost, 0)
  const familyContribution = items.filter(i => i.status === 'claimed').reduce((sum, item) => sum + item.estCost, 0)
  
  const currentCategoryItems = items.filter(i => i.category === activeCategory)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 font-bold mb-4 text-xs tracking-wider">
            <ShoppingBag className="w-4 h-4" /> SMART TRACKER
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Jahaiz & Trousseau Tracker</h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl">
            Manage the complete bridal home setup without the stress. Track your budget, or share the list with family to turn the Jahaiz into a collaborative gift registry.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button onClick={() => setIsRegistryMode(!isRegistryMode)} variant={isRegistryMode ? "default" : "outline"} className={`rounded-xl font-bold transition-all ${isRegistryMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20' : 'border-indigo-200 text-indigo-700 hover:bg-indigo-50'}`}>
            <Gift className="w-5 h-5 mr-2" /> {isRegistryMode ? 'View as Parent' : 'View as Family (Registry Mode)'}
          </Button>
          {!isRegistryMode && (
            <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-md">
              <Share2 className="w-5 h-5 mr-2" /> Share Registry Link
            </Button>
          )}
        </div>
      </div>

      {/* Budget Overview Cards (Only shown to Parents) */}
      <AnimatePresence mode="wait">
        {!isRegistryMode ? (
          <motion.div key="parents" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-10">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-slate-900">Budget Progress</h3>
                <div className="flex items-center gap-2 text-sm font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg border border-emerald-100">
                  <Sparkles className="w-4 h-4" /> Rs {familyContribution.toLocaleString()} saved via Family Registry!
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-6 bg-slate-100 rounded-full mb-6 overflow-hidden flex border border-slate-200/50">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${(totalSpent / totalBudget) * 100}%` }} 
                  className="h-full bg-slate-900" title="Purchased"
                />
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${(familyContribution / totalBudget) * 100}%` }} 
                  className="h-full bg-indigo-500" title="Claimed by Family"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-bold text-slate-500 mb-1">Estimated Budget</p>
                  <p className="text-2xl font-black text-slate-900">Rs {totalBudget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 mb-1 flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-slate-900"/> Spent So Far</p>
                  <p className="text-2xl font-black text-slate-900">Rs {totalSpent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-indigo-500 mb-1 flex items-center gap-1"><Gift className="w-4 h-4"/> Family Contributions</p>
                  <p className="text-2xl font-black text-indigo-600">Rs {familyContribution.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="registry" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-10">
            <div className="bg-indigo-900 text-white rounded-xl p-6 md:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-20 -mt-20" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 backdrop-blur-md">
                  <Gift className="w-10 h-10 text-indigo-200" />
                </div>
                <div>
                  <h2 className="text-3xl font-black mb-2">Ali & Fatima's Wedding Registry</h2>
                  <p className="text-indigo-200 font-medium text-lg">
                    Browse the list below and claim an item to gift the couple for their new home. Your generous contribution takes the pressure off the parents!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
        {/* Categories Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="font-bold text-lg text-slate-900 mb-4 px-2">Setup Categories</h3>
          {CATEGORIES.map(category => {
            const catItems = items.filter(i => i.category === category.id)
            const completed = catItems.filter(i => i.status !== 'pending').length
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                  activeCategory === category.id 
                    ? `bg-white shadow-md ${category.border}` 
                    : 'border-transparent hover:bg-slate-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${category.bg} ${category.color}`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold text-lg ${activeCategory === category.id ? 'text-slate-900' : 'text-slate-700'}`}>
                    {category.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${category.bg.replace('100', '500')}`} style={{ width: `${(completed / catItems.length) * 100}%` }} />
                    </div>
                    <span className="text-xs font-bold text-slate-500">{completed}/{catItems.length}</span>
                  </div>
                </div>
              </button>
            )
          })}

          {!isRegistryMode && (
            <Button variant="outline" className="w-full rounded-2xl py-6 border-dashed border-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-bold">
              <Plus className="w-5 h-5 mr-2" /> Add Custom Category
            </Button>
          )}
        </div>

        {/* Checklist Area */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-slate-200 min-h-[600px]">
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{CATEGORIES.find(c => c.id === activeCategory)?.name}</h2>
                <p className="text-slate-500 font-medium mt-1">
                  {isRegistryMode ? "Select an item to gift the couple." : "Track purchases and manage budget."}
                </p>
              </div>
              {!isRegistryMode && (
                <Button className="bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl font-bold transition-colors">
                  <Plus className="w-4 h-4 mr-2" /> Add Item
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {currentCategoryItems.map((item, index) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.id} 
                    className={`border-2 rounded-2xl p-4 transition-all ${
                      item.status === 'purchased' ? 'border-slate-200 bg-slate-50 opacity-70' :
                      item.status === 'claimed' ? 'border-indigo-200 bg-indigo-50' :
                      'border-slate-100 hover:border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      
                      {/* Checkbox (Parent View) or Gift Icon (Registry View) */}
                      {!isRegistryMode ? (
                        <button 
                          onClick={() => toggleStatus(item.id)}
                          disabled={item.status === 'claimed'}
                          className={`w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center transition-colors ${
                            item.status === 'purchased' ? 'bg-slate-900 text-white' : 
                            item.status === 'claimed' ? 'bg-indigo-100 text-indigo-400 cursor-not-allowed' :
                            'border-2 border-slate-300 text-transparent hover:border-slate-400'
                          }`}
                        >
                          <CheckCircle2 className="w-5 h-5 fill-current" />
                        </button>
                      ) : (
                        <div className={`w-10 h-10 rounded-full flex flex-shrink-0 items-center justify-center ${
                          item.status === 'pending' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-400'
                        }`}>
                          <Gift className="w-5 h-5" />
                        </div>
                      )}
                      
                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-bold truncate text-lg ${item.status !== 'pending' ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                          {item.name}
                        </h4>
                        {item.status === 'claimed' ? (
                          <p className="text-indigo-600 text-sm font-bold flex items-center gap-1 mt-1">
                            <Users className="w-4 h-4" /> Claimed by {item.claimedBy}
                          </p>
                        ) : (
                          <p className="text-slate-500 text-sm font-medium mt-1">
                            Est: Rs {item.estCost.toLocaleString()}
                          </p>
                        )}
                      </div>

                      {/* Action / Cost Area */}
                      <div className="flex flex-col items-end">
                        {!isRegistryMode ? (
                          <>
                            {item.status === 'purchased' ? (
                              <div className="text-right">
                                <span className="text-xs font-bold text-slate-400 uppercase">Spent</span>
                                <p className="font-black text-slate-900">Rs {item.actCost.toLocaleString()}</p>
                              </div>
                            ) : item.status === 'claimed' ? (
                              <div className="text-right">
                                <span className="text-xs font-bold text-indigo-400 uppercase">Saved</span>
                                <p className="font-black text-indigo-600">Rs {item.estCost.toLocaleString()}</p>
                              </div>
                            ) : (
                              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-900">Edit</Button>
                            )}
                          </>
                        ) : (
                          <>
                            {item.status === 'pending' ? (
                              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md font-bold">
                                Claim Gift
                              </Button>
                            ) : (
                              <span className="text-sm font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg">Already Gifted</span>
                            )}
                          </>
                        )}
                      </div>

                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State / Hint */}
            <div className="mt-8 flex items-center gap-3 bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-blue-600" />
              <p className="text-sm font-medium">Our AI has pre-populated this list based on standard Pakistani Jahaiz requirements for a new home. You can add or remove items as needed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
