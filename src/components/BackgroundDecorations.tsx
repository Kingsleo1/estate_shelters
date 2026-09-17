import React from 'react';

interface BackgroundDecorationsProps {
  isDarkMode?: boolean;
}

export const BackgroundDecorations: React.FC<BackgroundDecorationsProps> = ({ isDarkMode = true }) => {
  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden"
    >
      {/* 1. Cadastral Architectural Blueprint Grid with Radial Mask */}
      <div 
        className="absolute inset-0 bg-cadastral-grid opacity-80 dark:opacity-45"
        style={{
          maskImage: 'radial-gradient(ellipse at 50% 30%, black 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 40%, transparent 90%)',
        }}
      />

      {/* 2. Secondary Dot-Matrix Texture Layer for Top and Bottom zones */}
      <div 
        className="absolute inset-0 bg-dot-matrix opacity-40 dark:opacity-25"
        style={{
          maskImage: 'radial-gradient(circle at 80% 20%, black 20%, transparent 60%)',
          WebkitMaskImage: 'radial-gradient(circle at 80% 20%, black 20%, transparent 60%)',
        }}
      />

      {/* 3. Top-Left Primary Royal Blue / Azure Aurora Glow */}
      <div 
        className="absolute -top-[12%] -left-[10%] w-[550px] sm:w-[850px] h-[550px] sm:h-[850px] rounded-full blur-[100px] sm:blur-[150px] animate-pulse-glow"
        style={{
          background: isDarkMode 
            ? 'radial-gradient(circle, rgba(37, 99, 235, 0.24) 0%, rgba(30, 64, 175, 0.10) 50%, transparent 70%)' 
            : 'radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, rgba(96, 165, 250, 0.14) 45%, rgba(191, 219, 254, 0.08) 65%, transparent 75%)',
        }}
      />

      {/* 4. Center-Right Golden Bronze / Amber Luxury Glow */}
      <div 
        className="absolute top-[28%] -right-[10%] w-[450px] sm:w-[750px] h-[450px] sm:h-[750px] rounded-full blur-[110px] sm:blur-[160px] animate-float-slow"
        style={{
          background: isDarkMode 
            ? 'radial-gradient(circle, rgba(202, 138, 4, 0.14) 0%, rgba(161, 98, 7, 0.05) 50%, transparent 70%)' 
            : 'radial-gradient(circle, rgba(217, 119, 6, 0.18) 0%, rgba(245, 158, 11, 0.12) 45%, rgba(254, 240, 138, 0.06) 65%, transparent 75%)',
        }}
      />

      {/* 5. Bottom-Left Cyan / Deep Teal Architectural Radiance */}
      <div 
        className="absolute top-[62%] -left-[12%] w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full blur-[120px] sm:blur-[170px] animate-float-reverse"
        style={{
          background: isDarkMode 
            ? 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(14, 116, 144, 0.05) 50%, transparent 70%)' 
            : 'radial-gradient(circle, rgba(13, 148, 136, 0.16) 0%, rgba(20, 184, 166, 0.10) 45%, rgba(204, 251, 241, 0.06) 65%, transparent 75%)',
        }}
      />

      {/* 6. Bottom-Right Indigo / Slate Executive Accent */}
      <div 
        className="absolute bottom-[-8%] right-[8%] w-[480px] sm:w-[700px] h-[480px] sm:h-[700px] rounded-full blur-[110px] sm:blur-[160px] animate-pulse-glow"
        style={{
          animationDelay: '3.5s',
          background: isDarkMode 
            ? 'radial-gradient(circle, rgba(79, 70, 229, 0.16) 0%, rgba(67, 56, 202, 0.05) 50%, transparent 70%)' 
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.16) 0%, rgba(129, 140, 248, 0.10) 45%, rgba(224, 231, 255, 0.06) 65%, transparent 75%)',
        }}
      />

      {/* 7. Architectural Surveyor Lines & Geometric Watermarks */}
      <div className="absolute inset-0 overflow-hidden">
        
        {/* Top-Right Abuja Coordinates Marker */}
        <div className="absolute top-20 sm:top-28 right-[8%] sm:right-[14%] flex items-center space-x-2 text-slate-500 dark:text-blue-400/80 font-mono text-[10px] tracking-widest animate-float-slow">
          <div className="w-4 h-4 rounded-full border border-blue-600/40 dark:border-blue-400/50 flex items-center justify-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-xs">
            <span className="w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
          </div>
          <span className="px-2 py-0.5 rounded-md bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-[9px] uppercase tracking-wider font-semibold shadow-xs">
            ABUJA CBD &bull; 9°04'N 7°29'E
          </span>
        </div>

        {/* Top-Left Surveyor Calibration Crosshair */}
        <div className="absolute top-[22%] left-[6%] sm:left-[10%] hidden md:flex items-center space-x-3 text-slate-500 dark:text-blue-400 font-mono text-[10px] animate-float-reverse">
          <span className="w-3 h-3 border border-slate-400/60 dark:border-blue-400/40 rotate-45 flex items-center justify-center">
            <span className="w-1 h-1 bg-slate-500 dark:bg-blue-400" />
          </span>
          <div className="w-16 h-[1px] bg-gradient-to-r from-slate-400/40 dark:from-blue-400/40 to-transparent" />
          <span className="text-[9px] uppercase tracking-wider font-medium opacity-70">
            AGIS DATUM &bull; ZONE 1
          </span>
        </div>

        {/* Mid-Right Geometric Diamond Outline */}
        <div className="absolute top-[48%] right-[6%] hidden lg:flex items-center space-x-3 text-amber-600/70 dark:text-amber-400/70 font-mono text-[10px] animate-float-slow">
          <div className="w-6 h-6 border border-dashed border-amber-500/40 dark:border-amber-400/40 rounded-lg rotate-12 flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-amber-500 dark:bg-amber-400 rounded-full" />
          </div>
          <span className="px-2 py-0.5 rounded-md bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-[9px] uppercase tracking-wider font-semibold shadow-xs">
            ELEVATION +520M
          </span>
        </div>

        {/* Mid-Left Cadastral Boundary Line */}
        <div className="absolute top-[68%] left-[8%] hidden md:flex items-center space-x-3 text-emerald-600/70 dark:text-emerald-400/70 font-mono text-[10px] animate-float-reverse">
          <div className="w-2.5 h-2.5 rounded-full border border-emerald-500/50 flex items-center justify-center">
            <span className="w-1 h-1 bg-emerald-500 rounded-full" />
          </div>
          <div className="w-20 h-[1px] bg-gradient-to-r from-emerald-500/40 dark:from-emerald-400/40 to-transparent" />
          <span className="text-[9px] uppercase tracking-wider font-semibold opacity-80">
            FCDA SURVEY REF: ES-ABJ
          </span>
        </div>

        {/* Bottom-Right Verified Stamp Iconography */}
        <div className="absolute bottom-[16%] right-[12%] hidden sm:flex items-center space-x-2 text-indigo-600/70 dark:text-indigo-400/70 font-mono text-[10px] animate-float-slow">
          <div className="w-3.5 h-3.5 rounded-md border border-indigo-500/40 dark:border-indigo-400/40 flex items-center justify-center bg-white/40 dark:bg-slate-900/40">
            <span className="text-[8px] font-bold">✓</span>
          </div>
          <span className="text-[9px] uppercase tracking-wider opacity-75">
            TITLE AUDIT PROTOCOL
          </span>
        </div>

        {/* Scattered Shimmer Accent Particles */}
        <div className="absolute top-[16%] left-[24%] w-2 h-2 rounded-full bg-blue-500/60 dark:bg-blue-400/70 animate-shimmer-particle shadow-xs" />
        <div className="absolute top-[32%] right-[32%] w-2.5 h-2.5 rounded-full bg-amber-500/50 dark:bg-amber-400/60 animate-shimmer-particle shadow-xs" style={{ animationDelay: '1.2s' }} />
        <div className="absolute top-[54%] left-[18%] w-2 h-2 rounded-full bg-teal-500/60 dark:bg-teal-400/70 animate-shimmer-particle shadow-xs" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-[76%] right-[24%] w-2 h-2 rounded-full bg-blue-500/50 dark:bg-blue-400/60 animate-shimmer-particle shadow-xs" style={{ animationDelay: '3.8s' }} />
        <div className="absolute top-[90%] left-[34%] w-1.5 h-1.5 rounded-full bg-indigo-500/60 dark:bg-indigo-400/70 animate-shimmer-particle shadow-xs" style={{ animationDelay: '2.1s' }} />
      </div>

      {/* 8. Vignette Edge Softener */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: isDarkMode 
            ? 'inset 0 0 140px rgba(7, 13, 30, 0.85)' 
            : 'inset 0 0 100px rgba(226, 232, 240, 0.5)',
        }}
      />
    </div>
  );
};
