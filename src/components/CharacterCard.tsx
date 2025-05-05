
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type CharacterCardProps = {
  character: string;
  example?: string;
  color?: string;
  isActive?: boolean;
  onClick?: () => void;
  imageSrc?: string;
};

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  example,
  color = 'bg-kid-blue',
  isActive = false,
  onClick,
  imageSrc,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "flex flex-col items-center p-6 rounded-2xl shadow-md cursor-pointer transition-all relative overflow-hidden",
        color,
        isActive ? "ring-4 ring-white ring-offset-4 ring-offset-background" : ""
      )}
      onClick={onClick}
    >
      <span className="text-7xl font-bold text-white mb-2 z-10">{character}</span>
      {example && (
        <span className="text-xl text-white/80 font-medium z-10">{example}</span>
      )}
      {imageSrc && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center opacity-30 p-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 0.3, 
            scale: [0.9, 1.05, 0.9],
            transition: { 
              scale: { 
                repeat: Infinity, 
                duration: 3,
                ease: "easeInOut" 
              }
            }
          }}
        >
          <img 
            src={imageSrc} 
            alt={example || character} 
            className="object-contain max-h-full max-w-full rounded-lg"
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default CharacterCard;
