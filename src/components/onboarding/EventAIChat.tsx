"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Sparkles, CheckCircle2, User, Loader2, MapPin, Calendar, 
  Users, Wallet, Camera, Mic, Globe, MicOff, Volume2
} from 'lucide-react';
import { useLanguage } from "@/contexts/LanguageContext";

type Message = {
  id: string;
  role: 'ai' | 'user';
  content: string;
  options?: string[];
  isAudio?: boolean;
};

type ExtractedData = {
  type: string;
  name: string;
  date: string;
  city: string;
  guests: string;
  budget: string;
  services: string[];
};

export function EventAIChat({ onSuccess }: { onSuccess: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: "Hi! I'm your Nexus AI Architect. Let's build your perfect event workspace together. To start, what kind of event are we planning?",
      options: ['Wedding', 'Engagement', 'Mehndi', 'Barat', 'Walima', 'Birthday', 'Anniversary', 'Corporate Event']
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // New UI States
  const { isRomanUrdu, setIsRomanUrdu } = useLanguage();
  const language = isRomanUrdu ? 'UR' : 'EN';
  const [inputMode, setInputMode] = useState<'text' | 'audio'>('text');
  const [isRecording, setIsRecording] = useState(false);
  
  const [extractedData, setExtractedData] = useState<ExtractedData>({
    type: '',
    name: '',
    date: '',
    city: '',
    guests: '',
    budget: '',
    services: []
  });

  const [step, setStep] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  // Load browser fallback voices
  useEffect(() => {
    const loadVoices = () => {
      if ('speechSynthesis' in window) {
        setVoices(window.speechSynthesis.getVoices());
      }
    };
    loadVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Stop any playing audio
  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Cloud TTS Helper (OpenAI 'Nova' Voice)
  const speakText = async (text: string, langCode: 'EN' | 'UR') => {
    stopAudio();
    
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, lang: langCode })
      });

      if (!res.ok) {
        // Fallback to offline browser TTS if no API key is provided
        if (res.status === 503 && 'speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(text);
          let selectedVoice = voices.find(v => 
            (v.lang.includes('ur-PK') || v.lang.includes('hi-IN') || v.lang.includes('en-IN')) && 
            v.name.toLowerCase().includes('female')
          );
          if (!selectedVoice) selectedVoice = voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira'));
          
          if (selectedVoice) utterance.voice = selectedVoice;
          utterance.rate = 0.95;
          utterance.pitch = 1.15;
          window.speechSynthesis.speak(utterance);
        }
        return;
      }

      // Play the hyper-realistic audio buffer
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      setCurrentAudio(audio);
      audio.play();
      
    } catch (err) {
      console.error("Failed to play TTS audio", err);
    }
  };

  // Speak the last AI message immediately when switching to Voice Mode
  useEffect(() => {
    if (inputMode === 'audio' && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === 'ai') {
        speakText(lastMsg.content, language);
      }
    } else {
      stopAudio();
    }
  }, [inputMode]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Mocked AI Logic for Demo Purposes
  const handleSimulatedAIResponse = (userText: string) => {
    setIsTyping(true);
    
    // Remove options from the previous AI message
    setMessages(prev => {
      const newMsgs = [...prev];
      const lastAiIndex = newMsgs.map(m => m.role).lastIndexOf('ai');
      if (lastAiIndex >= 0) {
        newMsgs[lastAiIndex] = { ...newMsgs[lastAiIndex], options: undefined };
      }
      return newMsgs;
    });

    setTimeout(() => {
      let aiResponse = "";
      let nextOptions: string[] | undefined = undefined;
      const newData = { ...extractedData };
      let nextStep = step;

      const lowerText = userText.toLowerCase();
      const isUrdu = language === 'UR';

      if (step === 1) {
        // Looking for Event Type
        if (lowerText.includes('wedding') || lowerText.includes('shadi')) newData.type = 'Wedding';
        else if (lowerText.includes('engagement') || lowerText.includes('mangni')) newData.type = 'Engagement';
        else if (lowerText.includes('mehndi') || lowerText.includes('rasm')) newData.type = 'Mehndi';
        else if (lowerText.includes('barat')) newData.type = 'Barat';
        else if (lowerText.includes('walima')) newData.type = 'Walima';
        else if (lowerText.includes('birthday') || lowerText.includes('saalgirah')) newData.type = 'Birthday';
        else if (lowerText.includes('anniversary') || lowerText.includes('saalgira')) newData.type = 'Anniversary';
        else if (lowerText.includes('corporate')) newData.type = 'Corporate Event';
        else newData.type = userText || 'Custom Event';
        
        newData.name = `${newData.type} Celebration`;

        aiResponse = isUrdu 
          ? `${newData.type} ka plan, bohat khoob! 🎊 Yeh event kab hoga?`
          : `A ${newData.type}, how exciting! 🎊 When will this take place?`;
        nextOptions = isUrdu ? ['Is Mahinay', 'Aglay Mahinay', '6 Mahinay Baad'] : ['This Month', 'Next Month', 'In 6 Months'];
        nextStep = 2;
      } 
      else if (step === 2) {
        // Looking for Date
        if (lowerText.includes('this') || lowerText.includes('is mahinay')) newData.date = 'November 2026';
        else if (lowerText.includes('next') || lowerText.includes('aglay')) newData.date = 'December 2026';
        else newData.date = userText || 'TBD';

        aiResponse = isUrdu 
          ? `Behtareen! Yeh event kis sheher mein hoga?`
          : `Perfect, I've noted the timeline. Which city are you planning this in?`;
        nextOptions = ['Lahore', 'Karachi', 'Islamabad', 'Other'];
        nextStep = 3;
      }
      else if (step === 3) {
        // Looking for City
        newData.city = userText || 'TBD Location';

        aiResponse = isUrdu
          ? `${newData.city} bohat acha intikhab hai! Taqreeban kitne mehman mutawaqqa hain?`
          : `${newData.city} is a great choice! Roughly how many guests are you expecting?`;
        nextOptions = ['Micro (< 100)', 'Medium (100-250)', 'Large (250-500)', 'Grand (500+)'];
        nextStep = 4;
      }
      else if (step === 4) {
        // Looking for Guests
        newData.guests = userText;

        aiResponse = isUrdu
          ? `Theek hai. Aur is event ka andazan budget kitna hoga?`
          : `Got it! And what's your estimated budget range?`;
        nextOptions = ['Under 5 Lakh', '5 - 15 Lakh', '15 - 30 Lakh', '30 Lakh+'];
        nextStep = 5;
      }
      else if (step === 5) {
        // Looking for Budget
        newData.budget = userText;

        // Enhanced Suggestion Logic Based on Inputs
        let recommendations = "";
        let suggestionOptions = [];
        
        const isWeddingSubEvent = ['Wedding', 'Engagement', 'Mehndi', 'Barat', 'Walima'].includes(newData.type);
        if (isWeddingSubEvent) {
          recommendations = isUrdu
            ? `Apke ${newData.guests} mehmanon aur ${newData.budget} ke budget ke mutabiq, main humare Premium Decorators, specialized Wedding Photographers, aur Valet service tajweez karunga. Sath hi humari 'Digital Invitations' service bhi bohat mufeed rahegi. Ap kya shamil karna chahenge?`
            : `Based on a ${newData.type} with ${newData.guests} guests and a ${newData.budget} budget, I highly recommend our Premium Decorators, specialized Wedding Photographers, and Valet service to handle the crowd. Our Digital Invitations and Memories Portal is also a perfect match! What would you like to explore?`;
          suggestionOptions = ['Essential (Venue & Food)', 'Full Experience (+Decor, Photo)', 'Add Digital Services', 'Browse All'];
        } else if (newData.type === 'Corporate Event') {
          recommendations = isUrdu
            ? `Corporate event ke liye, humare top-tier Venues, Catering, aur Event Managers best rahenge. Ap kis cheez ko tarjeeh denge?`
            : `For a Corporate Event of this scale, our top-tier Venues, premium Catering, and experienced Event Managers will guarantee success. What are your priorities?`;
          suggestionOptions = ['Venue & AV Setup', 'Catering & Logistics', 'Hire an Event Manager', 'Browse All'];
        } else {
          recommendations = isUrdu
            ? `Bohat khoob! Humare paas top Venues, Photographers, aur Decorators hain. Ap kin khidmat ki talash mein hain?`
            : `Excellent! We have top-rated Venues, Photographers, and Decorators in ${newData.city}. Which services are you looking for right now?`;
          suggestionOptions = ['Venue & Decor', 'Photographer', 'Catering', 'All of the above'];
        }

        aiResponse = recommendations;
        nextOptions = suggestionOptions;
        nextStep = 6;
      }
      else if (step === 6) {
        // Looking for Services
        const services = [];
        if (lowerText.includes('venue') || lowerText.includes('essential') || lowerText.includes('all')) services.push('Venue', 'Catering');
        if (lowerText.includes('photo') || lowerText.includes('full') || lowerText.includes('all')) services.push('Photographer', 'Decorator');
        if (lowerText.includes('digital')) services.push('Digital Invitations', 'Memories Portal');
        if (lowerText.includes('manager')) services.push('Event Manager');
        
        if (services.length === 0) services.push(userText); 
        
        newData.services = services;
        
        aiResponse = isUrdu
          ? `Zabardast! Main ne tammam tafseelat darj kar li hain. Dayen janib apna blueprint check karein aur Generate Workspace par click karein! 🚀`
          : `Excellent selections! I've extracted all the requirements and formulated your plan. Review the blueprint on the right and click Generate Workspace! 🚀`;
        nextOptions = undefined;
        nextStep = 7;
      }
      else {
        aiResponse = isUrdu ? "Bas Workspace Generate button dabayein!" : "I have everything I need! Feel free to click Generate Workspace below.";
      }

      setExtractedData(newData);
      setStep(nextStep);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: aiResponse, options: nextOptions }]);
      setIsTyping(false);

      // Play Audio if in Voice Mode
      if (inputMode === 'audio') {
        speakText(aiResponse, language);
      }
    }, 1500);
  };

  const submitText = (text: string, isAudio = false) => {
    if (!text.trim() && !isAudio) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: text, isAudio };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    handleSimulatedAIResponse(text);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    submitText(input);
  };

  const handleAudioRecord = () => {
    if (isRecording) {
      // Stop recording and submit a mock transcribed text
      setIsRecording(false);
      submitText("Yes, I would like to include the full experience with photography and decor.", true);
    } else {
      setIsRecording(true);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Parse budget range to number
    let budgetNum = 2000000;
    const bStr = (extractedData.budget || "").toLowerCase();
    if (bStr.includes('under 5') || bStr.includes('5 lakh')) budgetNum = 500000;
    else if (bStr.includes('5 - 15') || bStr.includes('15 lakh')) budgetNum = 1200000;
    else if (bStr.includes('15 - 30') || bStr.includes('30 lakh')) budgetNum = 2500000;
    else if (bStr.includes('30 lakh+')) budgetNum = 4500000;

    // Parse guest count to number
    let guestCountVal = 200;
    const gStr = (extractedData.guests || "").toLowerCase();
    if (gStr.includes('micro') || gStr.includes('< 100')) guestCountVal = 80;
    else if (gStr.includes('medium') || gStr.includes('100-250')) guestCountVal = 180;
    else if (gStr.includes('large') || gStr.includes('250-500')) guestCountVal = 380;
    else if (gStr.includes('grand') || gStr.includes('500+')) guestCountVal = 600;

    // Save profile to localStorage
    const weddingProfile = {
      brideName: "Sarah Ahmed",
      groomName: "Ahmed Ali",
      weddingDate: extractedData.date || "2026-10-15",
      location: extractedData.city || "Islamabad, Pakistan",
      monogramInitials: "SA",
      accentTheme: "emerald"
    };

    // Save Guest List
    const mockGuests = [
      { id: 1, name: "Ali Raza & Family", count: Math.min(6, Math.max(1, Math.round(guestCountVal * 0.05))), side: "Groom", status: "Attending" },
      { id: 2, name: "Sana Malik & Friends", count: Math.min(10, Math.max(1, Math.round(guestCountVal * 0.1))), side: "Bride", status: "Attending" },
      { id: 3, name: "Uncle Tariq", count: 2, side: "Groom", status: "Pending" },
      { id: 4, name: "Auntie Yasmin", count: 4, side: "Bride", status: "Pending" }
    ];

    // Save Budget Items
    const defaultItems = [];
    if (extractedData.services.includes('Venue')) {
      defaultItems.push({ id: 1, name: "Banquet Hall / Venue Booking", allocated: Math.round(budgetNum * 0.45), spent: 0, paymentMethod: "Raast" as const, status: "Unpaid" as const });
    }
    if (extractedData.services.includes('Catering')) {
      defaultItems.push({ id: 2, name: "Catering & Shadi Feasts", allocated: Math.round(budgetNum * 0.25), spent: 0, paymentMethod: "Raast" as const, status: "Unpaid" as const });
    }
    if (extractedData.services.includes('Photographer')) {
      defaultItems.push({ id: 3, name: "Photography & Video Coverage", allocated: Math.round(budgetNum * 0.15), spent: 0, paymentMethod: "Cash" as const, status: "Unpaid" as const });
    }
    if (extractedData.services.includes('Decorator')) {
      defaultItems.push({ id: 4, name: "Stage Decoration & Florals", allocated: Math.round(budgetNum * 0.15), spent: 0, paymentMethod: "Raast" as const, status: "Unpaid" as const });
    }
    if (defaultItems.length === 0) {
      defaultItems.push({ id: 1, name: "Venue Booking & Catering", allocated: Math.round(budgetNum * 0.65), spent: 0, paymentMethod: "Raast" as const, status: "Unpaid" as const });
      defaultItems.push({ id: 2, name: "Photography & Videography", allocated: Math.round(budgetNum * 0.15), spent: 0, paymentMethod: "Cash" as const, status: "Unpaid" as const });
      defaultItems.push({ id: 3, name: "Decorations & Stages", allocated: Math.round(budgetNum * 0.2), spent: 0, paymentMethod: "Raast" as const, status: "Unpaid" as const });
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("nexus_crm_wedding_profile", JSON.stringify(weddingProfile));
      localStorage.setItem("nexus_crm_total_budget", String(budgetNum));
      localStorage.setItem("nexus_crm_guest_list", JSON.stringify(mockGuests));
      localStorage.setItem("nexus_crm_budget_list", JSON.stringify(defaultItems));
    }

    setTimeout(() => {
      setIsGenerating(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="w-full mx-auto flex flex-col lg:flex-row gap-6 h-[75vh] min-h-[600px]">
      
      {/* Left: Chat Area */}
      <div className="flex-1 bg-white rounded-[2rem] border border-[#E6E2DA] shadow-sm flex flex-col overflow-hidden relative">
        
        {/* Chat Header */}
        <div className="h-16 border-b border-[#E6E2DA] flex items-center justify-between px-6 bg-[#FAF7F2]/50 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0F5B3E] flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-[#1D1C17] text-sm leading-tight">Nexus AI Architect</h3>
              <p className="text-xs text-[#0F5B3E] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F5B3E] animate-pulse"></span>
                Online
              </p>
            </div>
          </div>

          {/* AI Settings Toggles */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button 
              onClick={() => setIsRomanUrdu(!isRomanUrdu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E6E2DA] hover:bg-[#F2EFE9] transition-colors shadow-sm"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#5E6460]" />
              <span className="text-xs font-bold text-[#1D1C17]">{language}</span>
            </button>
            
            {/* Input Mode Toggle */}
            <button 
              onClick={() => setInputMode(mode => mode === 'text' ? 'audio' : 'text')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors shadow-sm ${
                inputMode === 'audio' 
                  ? 'bg-[#E6F0EC] border-[#0F5B3E]/30 text-[#0F5B3E]' 
                  : 'bg-white border-[#E6E2DA] hover:bg-[#F2EFE9] text-[#5E6460]'
              }`}
              title="Toggle Audio/Text Mode"
            >
              {inputMode === 'audio' ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
              <span className="text-xs font-bold">{inputMode === 'audio' ? 'Voice Mode' : 'Text Mode'}</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm ${
                  msg.role === 'ai' ? 'bg-[#0F5B3E] text-white' : 'bg-[#E6E2DA] text-[#5E6460]'
                }`}>
                  {msg.role === 'ai' ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Bubble Container */}
                <div className="flex flex-col gap-2">
                  <div className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#0F5B3E] text-white rounded-tr-sm' 
                      : 'bg-[#F2EFE9] text-[#1D1C17] rounded-tl-sm border border-[#E6E2DA]'
                  }`}>
                    {msg.isAudio ? (
                      <div className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4 opacity-70" />
                        <span className="italic">"{msg.content}"</span>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                  
                  {/* Options */}
                  {msg.options && msg.options.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-2 mt-1"
                    >
                      {msg.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => submitText(opt)}
                          disabled={isTyping}
                          className="px-4 py-2 bg-white border border-[#0F5B3E]/30 text-[#0F5B3E] font-bold text-sm rounded-full hover:bg-[#E6F0EC] transition-colors shadow-sm disabled:opacity-50"
                        >
                          {opt}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 max-w-[85%]"
            >
              <div className="w-8 h-8 rounded-full bg-[#0F5B3E] flex items-center justify-center shrink-0 shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="p-4 rounded-2xl bg-[#F2EFE9] rounded-tl-sm border border-[#E6E2DA] flex items-center gap-1 shadow-sm">
                <span className="w-2 h-2 bg-[#A1A6A2] rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-[#A1A6A2] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-[#A1A6A2] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-[#E6E2DA] shrink-0">
          <AnimatePresence mode="wait">
            {inputMode === 'text' ? (
              <motion.form 
                key="text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit} 
                className="relative flex items-center"
              >
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={language === 'UR' ? "Yahan apna jawab likhein..." : "Type your answer here..."}
                  disabled={isTyping || step >= 7}
                  className="w-full bg-[#FAF7F2] border border-[#E6E2DA] rounded-full pl-6 pr-14 py-4 text-[#1D1C17] focus:outline-none focus:ring-2 focus:ring-[#0F5B3E]/50 focus:border-[#0F5B3E] transition-all disabled:opacity-50 font-medium"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping || step >= 7}
                  className="absolute right-2 w-10 h-10 rounded-full bg-[#0F5B3E] text-white flex items-center justify-center hover:bg-[#0A422C] disabled:bg-[#E6E2DA] disabled:text-[#A1A6A2] transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="audio"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-center py-2"
              >
                <button
                  onClick={handleAudioRecord}
                  disabled={isTyping || step >= 7}
                  className={`relative flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-white transition-all ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30' 
                      : 'bg-[#0F5B3E] hover:bg-[#0A422C] shadow-lg shadow-[#0F5B3E]/30'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isRecording ? (
                    <>
                      <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping"></div>
                      <MicOff className="w-5 h-5 relative z-10" />
                      <span className="relative z-10">Stop Recording</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5" />
                      <span>Hold to Speak</span>
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right: Extracted Live Data */}
      <div className="w-full lg:w-[400px] bg-white rounded-[2rem] border border-[#E6E2DA] shadow-sm flex flex-col overflow-hidden shrink-0">
        <div className="p-6 border-b border-[#E6E2DA] bg-[#FAF7F2]">
          <h3 className="font-bold text-[#1D1C17] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#C9A227]" />
            Live Blueprint
          </h3>
          <p className="text-xs text-[#5E6460] mt-1">AI is actively formulating your event plan.</p>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          <div className="space-y-4">
            <ExtractionItem icon={<Sparkles />} label="Event Type" value={extractedData.type} />
            <ExtractionItem icon={<Calendar />} label="Timeline" value={extractedData.date} />
            <ExtractionItem icon={<MapPin />} label="City" value={extractedData.city} />
            <ExtractionItem icon={<Users />} label="Expected Guests" value={extractedData.guests} />
            <ExtractionItem icon={<Wallet />} label="Budget Range" value={extractedData.budget} />
            
            <div className="pt-2 border-t border-[#E6E2DA]">
              <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider mb-3">Vendors Needed</p>
              <div className="flex flex-wrap gap-2 min-h-[30px]">
                <AnimatePresence>
                  {extractedData.services.length === 0 ? (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-[#A1A6A2] italic">Waiting for input...</motion.span>
                  ) : (
                    extractedData.services.map(s => (
                      <motion.span 
                        key={s}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="px-3 py-1 bg-[#E6F0EC] text-[#0F5B3E] text-xs font-bold rounded-md flex items-center gap-1 border border-[#0F5B3E]/10"
                      >
                        <Camera className="w-3 h-3" />
                        {s}
                      </motion.span>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button (Reveals at step 7) */}
        <div className="p-6 border-t border-[#E6E2DA] bg-white">
          <button 
            onClick={handleGenerate}
            disabled={step < 7 || isGenerating}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
              step >= 7 
                ? 'bg-[#0F5B3E] hover:bg-[#0A422C] text-white shadow-lg hover:-translate-y-0.5 cursor-pointer' 
                : 'bg-[#F2EFE9] text-[#A1A6A2] cursor-not-allowed border border-[#E6E2DA]'
            }`}
          >
            {isGenerating ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Finalizing...</>
            ) : (
              <><Sparkles className="w-5 h-5" /> Generate Workspace</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function ExtractionItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-3 group">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
        value ? 'bg-[#0F5B3E] text-white shadow-sm' : 'bg-[#F2EFE9] text-[#A1A6A2]'
      }`}>
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4" })}
      </div>
      <div className="flex-1 border-b border-dashed border-[#E6E2DA] pb-2 group-last:border-0">
        <p className="text-[10px] font-bold text-[#5E6460] uppercase tracking-wider mb-0.5">{label}</p>
        <p className={`text-sm font-medium transition-all ${value ? 'text-[#1D1C17]' : 'text-[#A1A6A2] italic'}`}>
          {value || 'Listening...'}
        </p>
      </div>
    </div>
  );
}
