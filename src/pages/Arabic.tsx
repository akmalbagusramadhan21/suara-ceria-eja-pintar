
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Mic, Volume2 } from 'lucide-react';
import CharacterCard from '@/components/CharacterCard';
import { Button } from '@/components/ui/button';
import startSpeechRecognition from '@/services/speechRecognition';

// Define Arabic alphabet data with pronunciation examples
const arabicData = [
  { char: 'ا', example: 'Alif', color: 'bg-kid-blue' },
  { char: 'ب', example: 'Ba', color: 'bg-kid-red' },
  { char: 'ت', example: 'Ta', color: 'bg-kid-green' },
  { char: 'ث', example: 'Tsa', color: 'bg-kid-purple' },
  { char: 'ج', example: 'Jim', color: 'bg-kid-orange' },
  { char: 'ح', example: 'Ha', color: 'bg-kid-teal' },
  { char: 'خ', example: 'Kho', color: 'bg-kid-pink' },
  { char: 'د', example: 'Dal', color: 'bg-kid-lightBlue' },
  { char: 'ذ', example: 'Dzal', color: 'bg-kid-red' },
  { char: 'ر', example: 'Ro', color: 'bg-kid-lime' },
  { char: 'ز', example: 'Zay', color: 'bg-kid-purple' },
  { char: 'س', example: 'Sin', color: 'bg-kid-orange' },
  { char: 'ش', example: 'Syin', color: 'bg-kid-teal' },
  { char: 'ص', example: 'Shod', color: 'bg-kid-pink' },
  { char: 'ض', example: 'Dhod', color: 'bg-kid-blue' },
  { char: 'ط', example: 'Tho', color: 'bg-kid-red' },
  { char: 'ظ', example: 'Dzho', color: 'bg-kid-green' },
  { char: 'ع', example: "'Ain", color: 'bg-kid-orange' },
  { char: 'غ', example: 'Ghoin', color: 'bg-kid-purple' },
  { char: 'ف', example: 'Fa', color: 'bg-kid-lightBlue' },
  { char: 'ق', example: 'Qof', color: 'bg-kid-teal' },
  { char: 'ك', example: 'Kaf', color: 'bg-kid-lime' },
  { char: 'ل', example: 'Lam', color: 'bg-kid-pink' },
  { char: 'م', example: 'Mim', color: 'bg-kid-blue' },
  { char: 'ن', example: 'Nun', color: 'bg-kid-red' },
  { char: 'و', example: 'Waw', color: 'bg-kid-green' },
  { char: 'ه', example: 'Ha', color: 'bg-kid-orange' },
  { char: 'ء', example: 'Hamzah', color: 'bg-kid-purple' },
  { char: 'ي', example: 'Ya', color: 'bg-kid-teal' },
];

const Arabic: React.FC = () => {
  const [selectedCharIndex, setSelectedCharIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [streak, setStreak] = useState(0);

  const selectedChar = arabicData[selectedCharIndex];

  useEffect(() => {
    let stopRecognition: (() => void) | null = null;

    if (isListening) {
      stopRecognition = startSpeechRecognition(
        (transcript) => {
          console.log('Heard:', transcript);
          handleSpeechResult(transcript);
        },
        (error) => {
          console.error('Speech recognition error:', error);
          toast.error('Gagal mendengarkan. Coba lagi ya!');
          setIsListening(false);
        }
      );
    }

    return () => {
      if (stopRecognition) {
        stopRecognition();
      }
    };
  }, [isListening, selectedCharIndex]);

  const handleSpeechResult = (transcript: string) => {
    setIsListening(false);
    
    // Check if the recognized speech matches the current character's example
    const exampleToMatch = selectedChar.example.toLowerCase();
    
    if (transcript === exampleToMatch || 
        transcript.includes(exampleToMatch + ' ') || 
        transcript.includes(' ' + exampleToMatch)) {
      // Success!
      setFeedback('success');
      playSuccessSound();
      setStreak(prev => prev + 1);
      
      setTimeout(() => {
        setFeedback(null);
        setSelectedCharIndex((prev) => (prev + 1) % arabicData.length);
      }, 1500);
    } else {
      // Not a match
      setFeedback('error');
      playErrorSound();
      setStreak(0);
      
      setTimeout(() => {
        setFeedback(null);
      }, 1500);
    }
  };

  const startListening = () => {
    setIsListening(true);
    setFeedback(null);
  };

  const speakCharacter = () => {
    const utterance = new SpeechSynthesisUtterance(selectedChar.example);
    utterance.lang = 'id-ID';
    speechSynthesis.speak(utterance);
  };

  const playSuccessSound = () => {
    const audio = new Audio('/success.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.error('Could not play audio', e));
  };

  const playErrorSound = () => {
    const audio = new Audio('/error.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.error('Could not play audio', e));
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-kid-blue mb-2">
          Mari Belajar Huruf Arab!
        </h1>
        <p className="text-gray-600 mb-4">
          Sebutkan cara baca huruf yang ditampilkan
        </p>
        
        {streak > 0 && (
          <div className="bg-kid-yellow/20 rounded-full px-4 py-1 text-kid-orange font-medium inline-block">
            🔥 Streak: {streak}
          </div>
        )}
      </div>

      <div className="flex justify-center mb-8">
        <motion.div
          animate={{
            scale: feedback === 'success' ? [1, 1.2, 1] : feedback === 'error' ? [1, 0.8, 1] : 1,
          }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <CharacterCard 
            character={selectedChar.char}
            example={selectedChar.example}
            color={selectedChar.color}
            isActive={isListening}
          />
        </motion.div>
      </div>

      <div className="flex justify-center space-x-4">
        <Button 
          size="lg"
          variant="outline"
          className="rounded-full bg-white border-kid-blue text-kid-blue hover:bg-kid-blue hover:text-white transition-colors"
          onClick={speakCharacter}
        >
          <Volume2 className="mr-2" />
          Dengarkan
        </Button>
        
        <Button 
          size="lg"
          variant={isListening ? "destructive" : "default"}
          className={`rounded-full ${isListening ? 'bg-red-500' : 'bg-kid-green'} hover:opacity-90 transition-all`}
          onClick={isListening ? () => setIsListening(false) : startListening}
          disabled={feedback !== null}
        >
          <Mic className={`mr-2 ${isListening ? 'animate-pulse' : ''}`} />
          {isListening ? 'Berhenti' : 'Ucapkan'}
        </Button>
      </div>

      {feedback && (
        <div className="mt-8 text-center">
          {feedback === 'success' ? (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-kid-green text-xl font-bold"
            >
              ✅ Hebat! Kamu benar!
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-kid-red text-xl font-bold"
            >
              🔄 Coba lagi ya!
            </motion.div>
          )}
        </div>
      )}

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mt-12">
        {arabicData.map((item, index) => (
          <div 
            key={item.char} 
            className="aspect-square"
            onClick={() => setSelectedCharIndex(index)}
          >
            <CharacterCard 
              character={item.char} 
              color={item.color}
              isActive={index === selectedCharIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Arabic;
