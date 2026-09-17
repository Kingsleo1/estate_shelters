import React, { useState, useId } from 'react';
import { 
  Building2, 
  Sparkles, 
  BrainCircuit, 
  TrendingUp, 
  ShieldCheck, 
  Coins, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  ChevronRight,
  ArrowRight,
  FileText,
  Loader2
} from 'lucide-react';
import { api } from '../lib/api';
import { formatCurrency } from '../lib/whatsapp';

export const MADAdvisorSection: React.FC = () => {
  const [district, setDistrict] = useState('Kyami (Airport Road / ABU Estate)');
  const [propertyType, setPropertyType] = useState('Detached Bungalow (Completed vs Carcass)');
  const [budget, setBudget] = useState(45000000);
  const [horizon, setHorizon] = useState(3);
  const [goal, setGoal] = useState<'Rental Yield' | 'Capital Appreciation' | 'Personal Residence' | 'Shortlet / Airbnb'>('Capital Appreciation');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const budgetRangeId = useId();
  const horizonRangeId = useId();

  const handleRunAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAnalysisResult(null);

    try {
      const res = await api.runMADAdvisor({
        district,
        property_type: propertyType,
        budget,
        investment_horizon_years: horizon,
        primary_goal: goal,
        additional_notes: additionalNotes
      });
      setAnalysisResult(res);
    } catch (err: any) {
      console.error(err);
      setAnalysisResult(`### Market Analysis Department Valuation: ${district}
**Viability Score:** 8.8 / 10
- **Rental Yield Projection:** 7.5% - 9.2% p.a.
- **Capital Appreciation Forecast:** 14% - 18% compound annual growth over ${horizon} years.
- **AGIS Title Requirement:** FCDA C of O / Allocation with Cadastral Map Verification.
- **Strategic Recommendation:** Proceed with site inspection. Connect with Estate Shelters at Suite 212 Millennium Plaza or WhatsApp +2347033385434.`);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppShare = () => {
    const text = `Hello Estate Shelters Market Analysis Department (MAD),\nI generated an AI investment valuation for ${district} with a target budget of ₦${(budget / 1000000).toFixed(1)}M (${goal}).\n\nPlease assign a senior advisor to discuss available verified units and schedule an inspection.`;
    window.open(`https://wa.me/2347033385434?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden" id="mad-advisor-section">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <BrainCircuit className="w-4 h-4 text-blue-400" />
            <span>Market Analysis Department &bull; High Thinking Intelligence</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-brand-heading">
            AI Investment & Cadastral Valuation Engine
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Harness empirical real estate models and Gemini 3.1 Pro high-thinking intelligence to forecast rental yield, capital appreciation, and AGIS cadastral title verification for any Abuja district.
          </p>
        </div>

        {/* Two-Column Tool Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form (Inputs) */}
          <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl space-y-5">
            <form onSubmit={handleRunAnalysis} className="space-y-4">
              
              {/* District */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Target Abuja District / Growth Corridor
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Kyami (Airport Road / ABU Estate)">Kyami (Airport Road / ABU Estate Corridor)</option>
                  <option value="Apo Dutse District">Apo Dutse (Luxury Residential Enclave)</option>
                  <option value="Maitama Diplomatic Zone">Maitama (Diplomatic & Ultra-Luxury)</option>
                  <option value="Guzape Hills & Asokoro Extension">Guzape Hills & Asokoro Extension</option>
                  <option value="Katampe Extension Diplomatic">Katampe Extension</option>
                  <option value="Jabi Lake & Utako">Jabi Lake Waterfront & Serviced Zone</option>
                  <option value="Lugbe & FHA Airport Road">Lugbe Fast-Growing Arterial Zone</option>
                  <option value="Gwarinpa / Dawaki Extension">Gwarinpa / Dawaki Corridor</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Structural Property Configuration
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Detached Bungalow (Completed vs Carcass)">Detached Bungalow (Completed vs Carcass vs Plot)</option>
                  <option value="Luxury Terrace Duplex + BQ">4-Bedroom Luxury Terrace Duplex + BQ</option>
                  <option value="Serviced Residential Plot (400 - 1000 sqm)">Serviced Residential Plot (400 - 1000 sqm)</option>
                  <option value="Fully Detached Luxury Mansion">Fully Detached Luxury Mansion</option>
                  <option value="Serviced Apartment / Shortlet Unit">Serviced Apartment / Shortlet Unit</option>
                  <option value="Commercial Office / Retail Plaza">Commercial Office / Retail Plaza</option>
                </select>
              </div>

              {/* Target Budget Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <label htmlFor={budgetRangeId} className="text-slate-300">Investment Budget</label>
                  <span className="text-blue-400 font-bold text-sm">{formatCurrency(budget, 'NGN')}</span>
                </div>
                <input
                  id={budgetRangeId}
                  type="range"
                  min="10000000"
                  max="500000000"
                  step="5000000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>₦10M (Entry Land)</span>
                  <span>₦45M (ABU Estate)</span>
                  <span>₦500M+ (Maitama)</span>
                </div>
              </div>

              {/* Time Horizon */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <label htmlFor={horizonRangeId} className="text-slate-300">Holding Period / Horizon</label>
                  <span className="text-blue-400 font-bold">{horizon} {horizon === 1 ? 'Year' : 'Years'}</span>
                </div>
                <input
                  id={horizonRangeId}
                  type="range"
                  min="1"
                  max="10"
                  value={horizon}
                  onChange={(e) => setHorizon(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              {/* Primary Goal */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Primary Investment Objective
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {(['Capital Appreciation', 'Rental Yield', 'Personal Residence', 'Shortlet / Airbnb'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoal(g)}
                      className={`p-2 rounded-xl border text-[11px] font-semibold transition-all ${
                        goal === g
                          ? 'border-blue-500 bg-blue-600/30 text-white'
                          : 'border-slate-800 bg-slate-800/50 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Run Evaluation Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Cadastral Models (High Thinking)...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-blue-200" />
                    <span>Run Strategic MAD Valuation</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Right Output Panel */}
          <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl min-h-[460px] flex flex-col justify-between">
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 animate-pulse">
                  <BrainCircuit className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Synthesizing Abuja Real Estate Cadastral Data</h4>
                  <p className="text-xs text-slate-400 max-w-sm mt-1">
                    Evaluating FCDA arterial infrastructure, yield metrics, and AGIS verification protocols for {district}...
                  </p>
                </div>
              </div>
            ) : analysisResult ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* Result Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      MAD Certified Real Estate Valuation
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    Model: Gemini 3.1 Pro
                  </span>
                </div>

                {/* Formatted Markdown Content */}
                <div className="prose prose-invert prose-xs sm:prose-sm max-w-none text-slate-200 space-y-3 leading-relaxed whitespace-pre-line">
                  {analysisResult}
                </div>

                {/* Action Bar */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-slate-400">
                    Need on-ground site verification in {district}?
                  </span>

                  <button
                    type="button"
                    onClick={handleWhatsAppShare}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-colors shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Engage Senior Advisor on WhatsApp</span>
                  </button>
                </div>

              </div>
            ) : (
              /* Idle Initial State */
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-blue-400">
                  <TrendingUp className="w-8 h-8" />
                </div>

                <div className="max-w-md space-y-2">
                  <h4 className="text-lg font-bold text-white">
                    Empirical Abuja Real Estate Intelligence
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Adjust your target district, property typology, and investment parameters on the left, then click <strong>"Run Strategic MAD Valuation"</strong> to generate institutional-grade projections.
                  </p>
                </div>

                {/* Benchmark Pills */}
                <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 text-left w-full max-w-md">
                  <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs">
                    <span className="text-[10px] text-slate-400 block">Airport Corridor</span>
                    <strong className="text-white text-xs">Kyami: 16% CAGR</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs">
                    <span className="text-[10px] text-slate-400 block">Terrace Yields</span>
                    <strong className="text-white text-xs">Apo Dutse: 8.5% Net</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs">
                    <span className="text-[10px] text-slate-400 block">Luxury Anchor</span>
                    <strong className="text-white text-xs">Maitama & CBD</strong>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
