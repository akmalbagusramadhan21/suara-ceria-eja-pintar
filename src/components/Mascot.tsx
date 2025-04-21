
import React from 'react';
import { motion } from 'framer-motion';

const Mascot: React.FC = () => {
  return (
    <motion.div 
      className="fixed bottom-4 right-4 w-32 h-32 z-50"
      initial={{ y: 20 }}
      animate={{ 
        y: [20, 0, 20],
        rotate: [0, 5, 0, -5, 0],
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="relative w-full h-full">
        {/* Body */}
        <div className="absolute inset-0 bg-kid-blue rounded-full" />
        
        {/* Eyes */}
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-white rounded-full">
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-white rounded-full">
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        {/* Smile */}
        <div className="absolute bottom-1/3 left-1/2 w-8 h-4 border-b-4 border-white rounded-full transform -translate-x-1/2" />
      </div>
    </motion.div>
  );
};

export default Mascot;
