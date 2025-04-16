
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type CharacterCardProps = {
  character: string;
  example?: string;
  color?: string;
  isActive?: boolean;
  onClick?: () => void;
};

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  example,
  color = 'bg-kid-blue',
  isActive = false,
  onClick,
}) => {
  return (
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
  );
};

export default CharacterCard;
