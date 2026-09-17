import React, { useState, useId } from 'react';
import { 
  Calculator, 
  Coins, 
  Percent, 
  Calendar, 
  Info, 
  Building2, 
  ArrowRight,
  Sparkles,
  PieChart as PieIcon
} from 'lucide-react';
import { formatCurrency } from '../lib/whatsapp';

interface MortgageCalculatorProps {
  initialPrice?: number;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  initialPrice = 45000000
}) => {
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(10);
  const [interestRatePercent, setInterestRatePercent] = useState<number>(18);
  const [planType, setPlanType] = useState<'mortgage' | 'developer_milestone'>('developer_milestone');

  const downPaymentAmountId = useId();
  const loanTenureYearsId = useId();
  const interestRatePercentId = useId();

  // Calculations
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanPrincipal = propertyPrice - downPaymentAmount;

  // Monthly Mortgage Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
  const monthlyInterestRate = (interestRatePercent / 100) / 12;
  const totalMonths = loanTenureYears * 12;

  const monthlyPayment = monthlyInterestRate > 0 && totalMonths > 0
    ? (loanPrincipal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths))) /
      (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)
    : loanPrincipal / (totalMonths || 1);

  const totalMortgageRepayment = monthlyPayment * totalMonths;
  const totalInterest = totalMortgageRepayment - loanPrincipal;

  // Milestone breakdown for Off-plan (Estate Shelters Structure)
  const milestone1 = propertyPrice * 0.30; // Initial Commitment & Foundation
  const milestone2 = propertyPrice * 0.30; // Carcass / Lintels
  const milestone3 = propertyPrice * 0.30; // Roofing & Plastering / Mechanical
  const milestone4 = propertyPrice * 0.10; // Keys & Deed Handover

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl p-6 md:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Abuja Property Mortgage & Payment Estimator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Calculate commercial bank mortgages or developer structured milestone plans
            </p>
          </div>
        </div>

        {/* Plan Mode Selector */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setPlanType('developer_milestone')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              planType === 'developer_milestone'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Developer Milestones (0% Int.)
          </button>
          <button
            type="button"
            onClick={() => setPlanType('mortgage')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              planType === 'mortgage'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Bank Mortgage
          </button>
        </div>
      </div>

      {/* Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Inputs */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Property Target Value (₦ NGN)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₦</span>
              <input
                type="number"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Math.max(1000000, Number(e.target.value)))}
                step={1000000}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
              />
            </div>
            {/* Quick value buttons */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[10000000, 25000000, 45000000, 55000000, 135000000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setPropertyPrice(val)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                    propertyPrice === val
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  ₦{(val / 1000000)}M
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <label htmlFor={downPaymentAmountId}>Equity Down Payment ({downPaymentPercent}%)</label>
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                {formatCurrency(downPaymentAmount, 'NGN')}
              </span>
            </div>
            <input
              id={downPaymentAmountId}
              type="range"
              min="10"
              max="70"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {planType === 'mortgage' ? (
            <>
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  <label htmlFor={loanTenureYearsId}>Loan Tenure ({loanTenureYears} Years)</label>
                  <span className="text-slate-500">{loanTenureYears * 12} Months</span>
                </div>
                <input
                  id={loanTenureYearsId}
                  type="range"
                  min="1"
                  max="25"
                  value={loanTenureYears}
                  onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  <label htmlFor={interestRatePercentId}>Commercial Interest Rate ({interestRatePercent}% p.a.)</label>
                  <span className="text-slate-500">Nigeria Average: 16-22%</span>
                </div>
                <input
                  id={interestRatePercentId}
                  type="range"
                  min="5"
                  max="28"
                  step="0.5"
                  value={interestRatePercent}
                  onChange={(e) => setInterestRatePercent(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </>
          ) : (
            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-xs space-y-1 text-slate-600 dark:text-slate-300">
              <span className="font-bold text-blue-900 dark:text-blue-300 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Zero Interest Developer Milestone Scheme</span>
              </span>
              <p>
                Estate Shelters syndicates direct developer installment options over 6 to 18 months linked to actual construction milestones with 0% interest charges.
              </p>
            </div>
          )}
        </div>

        {/* Right Calculation Display */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 flex flex-col justify-between space-y-4">
          
          {planType === 'mortgage' ? (
            <>
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Estimated Monthly Repayment
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                  {formatCurrency(monthlyPayment, 'NGN')} <span className="text-xs font-normal text-slate-500">/ month</span>
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-200 dark:border-slate-700 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Loan Principal:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{formatCurrency(loanPrincipal, 'NGN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Down Payment Required:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{formatCurrency(downPaymentAmount, 'NGN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Interest Payable:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{formatCurrency(totalInterest, 'NGN')}</span>
                </div>
                <div className="flex justify-between font-bold text-sm pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-800 dark:text-slate-200">Total Repayment:</span>
                  <span className="text-blue-900 dark:text-blue-300">{formatCurrency(totalMortgageRepayment, 'NGN')}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Developer 4-Stage Milestone Schedule
                </span>
                <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  Total Commitment: {formatCurrency(propertyPrice, 'NGN')}
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-200 dark:border-slate-700 pt-3">
                <div className="flex justify-between p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span><strong>1. Foundation & Substructure (30%):</strong></span>
                  <strong className="text-blue-600 dark:text-blue-400">{formatCurrency(milestone1, 'NGN')}</strong>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span><strong>2. Carcass & Blockwork (30%):</strong></span>
                  <strong className="text-blue-600 dark:text-blue-400">{formatCurrency(milestone2, 'NGN')}</strong>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span><strong>3. Roofing & Plastering (30%):</strong></span>
                  <strong className="text-blue-600 dark:text-blue-400">{formatCurrency(milestone3, 'NGN')}</strong>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span><strong>4. Handover & Title Deed (10%):</strong></span>
                  <strong className="text-emerald-600 dark:text-emerald-400">{formatCurrency(milestone4, 'NGN')}</strong>
                </div>
              </div>
            </>
          )}

          <button
            type="button"
            onClick={() => {
              const text = `Hello Estate Shelters, I calculated a payment plan for a ₦${(propertyPrice / 1000000).toFixed(1)}M property with ${downPaymentPercent}% initial deposit. Please advise on available Abuja units matching this structure.`;
              window.open(`https://wa.me/2348136656679?text=${encodeURIComponent(text)}`, '_blank');
            }}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs flex items-center justify-center space-x-2 transition-colors shadow-md"
          >
            <span>Request Payment Plan Approval on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
