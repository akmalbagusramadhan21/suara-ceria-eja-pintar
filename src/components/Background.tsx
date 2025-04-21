
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const Background: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Clouds in light mode */}
      {!isDark && (
        <>
          <motion.div
            className="absolute top-10 left-10 w-24 h-12 bg-white rounded-full"
            animate={{
              x: [0, 20, 0],
              y: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-20 right-20 w-32 h-16 bg-white rounded-full"
            animate={{
              x: [0, -30, 0],
              y: [0, 8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Rainbow in light mode */}
          <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20">
            <div className="absolute bottom-0 left-1/4 right-1/4 h-full">
              <div className="h-full bg-gradient-to-r from-kid-red via-kid-yellow via-kid-green via-kid-blue to-kid-purple rounded-t-full" />
            </div>
          </div>
        </>
      )}
      
      {/* Stars for dark mode */}
      {isDark && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
          
          {/* Moon for dark mode */}
          <motion.div
            className="absolute top-20 right-20 w-16 h-16 bg-gray-200 rounded-full"
            animate={{
              x: [0, -10, 0],
              y: [0, 5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}
    </div>
  );
};

export default Background;
