
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
    <div className="flex flex-col items-center">
      {/* Image rendered above the card */}
      {imageSrc && (
        <motion.div 
          className="mb-2 w-20 h-20 flex items-center justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0
          }}
        >
          <img 
            src={imageSrc} 
            alt={example || character} 
            className="object-contain max-h-full max-w-full rounded-lg"
          />
        </motion.div>
      )}

      {/* Character card */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "flex flex-col items-center p-6 rounded-2xl shadow-md cursor-pointer transition-all",
          color,
          isActive ? "ring-4 ring-white ring-offset-4 ring-offset-background" : ""
        )}
        onClick={onClick}
      >
        <span className="text-7xl font-bold text-white mb-2">{character}</span>
        {example && (
          <span className="text-xl text-white/80 font-medium">{example}</span>
        )}
      </motion.div>
    </div>
  );
};

export default CharacterCard;
