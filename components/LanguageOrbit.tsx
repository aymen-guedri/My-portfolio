"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "en", flagCode: "gb", name: "English", color: "#3B82F6" },
  { code: "fr", flagCode: "fr", name: "Français", color: "#EF4444" },
  { code: "de", flagCode: "de", name: "Deutsch", color: "#F59E0B" },
  { code: "es", flagCode: "es", name: "Español", color: "#10B981" },
];

const LanguageOrbit: React.FC = () => {
  const { i18n } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
  };

  React.useEffect(() => {
    const handleClickOutside = () => {
      if (isExpanded) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <motion.div 
      className="fixed bottom-8 right-8 z-[9999]"
      animate={{
        x: isExpanded ? -80 : 0,
        y: isExpanded ? -60 : 0
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onClick={(e) => e.stopPropagation()}
    >
      <AnimatePresence>
        {isExpanded && (
          <>
            {languages.map((lang, index) => {
              const isCurrentLang = lang.code === i18n.language;
              const otherLangs = languages.filter(l => l.code !== i18n.language);
              const orbitIndex = otherLangs.findIndex(l => l.code === lang.code);
              const baseAngle = orbitIndex >= 0 ? (orbitIndex * (Math.PI * 2)) / otherLangs.length : 0;
              const radius = isCurrentLang ? 0 : 110;

              return (
                <motion.div
                  key={lang.code}
                  className="absolute bottom-0 right-0"
                  style={{ originX: 0.5, originY: 0.5 }}
                >
                  <motion.div
                    animate={{
                      x: Math.cos(baseAngle) * radius,
                      y: Math.sin(baseAngle) * radius,
                    }}
                    initial={{ 
                      x: isCurrentLang ? 0 : Math.cos(baseAngle) * radius, 
                      y: isCurrentLang ? 0 : Math.sin(baseAngle) * radius, 
                      scale: 1, 
                      opacity: 1 
                    }}
                    transition={{
                      x: { duration: 0.5, type: "spring", stiffness: 150, damping: 20 },
                      y: { duration: 0.5, type: "spring", stiffness: 150, damping: 20 },
                    }}
                  >
                    <motion.div
                      animate={{ rotate: isCurrentLang ? 0 : 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      style={{ pointerEvents: 'none' }}
                    >
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isCurrentLang) {
                            setIsExpanded(false);
                          } else {
                            handleLanguageChange(lang.code);
                          }
                        }}
                        onHoverStart={() => setHoveredLang(lang.code)}
                        onHoverEnd={() => setHoveredLang(null)}
                        className="relative rounded-full flex items-center justify-center cursor-pointer overflow-hidden backdrop-blur-sm"
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          width: isCurrentLang ? '80px' : '64px',
                          height: isCurrentLang ? '80px' : '64px',
                          background: `radial-gradient(circle at 30% 30%, ${lang.color}22, ${lang.color}11)`,
                          boxShadow: isCurrentLang 
                            ? `0 0 50px ${lang.color}cc, 0 0 80px ${lang.color}66, inset 0 0 30px ${lang.color}33`
                            : `0 0 30px ${lang.color}88, inset 0 0 20px ${lang.color}22`,
                          zIndex: isCurrentLang ? 10 : 1,
                          pointerEvents: 'auto',
                          border: `3px solid ${lang.color}66`
                        }}
                      >
                        <div className={`absolute inset-0 rounded-full border-2 ${isCurrentLang ? 'border-white/30' : 'border-white/20'} animate-pulse`} />
                        <img 
                          src={`https://flagcdn.com/w160/${lang.flagCode}.png`}
                          alt={lang.name}
                          className={`${isCurrentLang ? 'w-12 h-12' : 'w-10 h-10'} relative z-10 rounded-full object-cover`}
                          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
                        />
                        
                        {hoveredLang === lang.code && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 px-3 py-1 rounded-full whitespace-nowrap border border-purple-500/50"
                          >
                            <p className="text-xs text-white font-semibold">{lang.name}</p>
                          </motion.div>
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative w-20 h-20 rounded-full flex items-center justify-center cursor-pointer overflow-hidden backdrop-blur-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          rotate: isExpanded ? 180 : 0,
          opacity: isExpanded ? 0 : 1,
          scale: isExpanded ? 0 : 1,
          boxShadow: isExpanded 
            ? `0 0 60px ${currentLang.color}aa, 0 0 100px ${currentLang.color}66, inset 0 0 30px ${currentLang.color}33`
            : `0 0 40px ${currentLang.color}88, 0 0 70px ${currentLang.color}55, inset 0 0 20px ${currentLang.color}22`
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{
          background: `radial-gradient(circle at 30% 30%, ${currentLang.color}33, ${currentLang.color}11)`,
          pointerEvents: isExpanded ? 'none' : 'auto',
          visibility: isExpanded ? 'hidden' : 'visible',
          border: `4px solid ${currentLang.color}88`
        }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-white/20" />
        <img 
          src={`https://flagcdn.com/w160/${currentLang.flagCode}.png`}
          alt={currentLang.name}
          className="w-14 h-14 relative z-10 rounded-full object-cover"
          style={{ filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.6))' }}
        />
      </motion.button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-900/95 to-black/95 backdrop-blur-xl px-6 py-3 rounded-full border-2 border-purple-500/60 shadow-2xl whitespace-nowrap"
        >
          <p className="text-sm text-purple-200 font-bold tracking-wider">{currentLang.name}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LanguageOrbit;
