
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Mic, Volume2 } from 'lucide-react';
import CharacterCard from '@/components/CharacterCard';
import { Button } from '@/components/ui/button';
import startSpeechRecognition from '@/services/speechRecognition';

// Define alphabet data with examples
const alphabetData = [
  { char: 'A', example: 'Apel', color: 'bg-kid-red' },
  { char: 'B', example: 'Bebek', color: 'bg-kid-blue' },
  { char: 'C', example: 'Cicak', color: 'bg-kid-green' },
  { char: 'D', example: 'Domba', color: 'bg-kid-purple' },
  { char: 'E', example: 'Elang', color: 'bg-kid-orange' },
  { char: 'F', example: 'Flamingo', color: 'bg-kid-teal' },
  { char: 'G', example: 'Gajah', color: 'bg-kid-pink' },
  { char: 'H', example: 'Harimau', color: 'bg-kid-lightBlue' },
  { char: 'I', example: 'Ikan', color: 'bg-kid-red' },
  { char: 'J', example: 'Jerapah', color: 'bg-kid-lime' },
  { char: 'K', example: 'Kucing', color: 'bg-kid-purple' },
  { char: 'L', example: 'Lebah', color: 'bg-kid-orange' },
  { char: 'M', example: 'Monyet', color: 'bg-kid-teal' },
  { char: 'N', example: 'Nyamuk', color: 'bg-kid-pink' },
  { char: 'O', example: 'Onta', color: 'bg-kid-blue' },
  { char: 'P', example: 'Paus', color: 'bg-kid-red' },
  { char: 'Q', example: 'Quokka', color: 'bg-kid-green' },
  { char: 'R', example: 'Rusa', color: 'bg-kid-orange' },
  { char: 'S', example: 'Singa', color: 'bg-kid-purple' },
  { char: 'T', example: 'Tupai', color: 'bg-kid-lightBlue' },
  { char: 'U', example: 'Ular', color: 'bg-kid-teal' },
  { char: 'V', example: 'Vampir', color: 'bg-kid-lime' },
  { char: 'W', example: 'Walet', color: 'bg-kid-pink' },
  { char: 'X', example: 'Xilofon', color: 'bg-kid-blue' },
  { char: 'Y', example: 'Yuyu', color: 'bg-kid-red' },
  { char: 'Z', example: 'Zebra', color: 'bg-kid-green' },
];

const Alphabet: React.FC = () => {
  const [selectedCharIndex, setSelectedCharIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [streak, setStreak] = useState(0);

  const selectedChar = alphabetData[selectedCharIndex];

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
    
    // Check if the recognized speech matches the current character
    const charToMatch = selectedChar.char.toLowerCase();
    
    if (transcript === charToMatch || 
        transcript.includes(charToMatch + ' ') || 
        transcript.includes(' ' + charToMatch) || 
        transcript === selectedChar.example.toLowerCase()) {
      // Success!
      setFeedback('success');
      playSuccessSound();
      setStreak(prev => prev + 1);
      
      setTimeout(() => {
        setFeedback(null);
        // Move to the next character after a short delay
        setSelectedCharIndex((prev) => (prev + 1) % alphabetData.length);
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
    const utterance = new SpeechSynthesisUtterance(selectedChar.char);
    utterance.lang = 'id-ID';
    speechSynthesis.speak(utterance);
    
    setTimeout(() => {
      const exampleUtterance = new SpeechSynthesisUtterance(selectedChar.example);
      exampleUtterance.lang = 'id-ID';
      speechSynthesis.speak(exampleUtterance);
    }, 1000);
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
          Mari Belajar Alfabet!
        </h1>
        <p className="text-gray-600 mb-4">
          Sebutkan huruf yang ditampilkan atau contoh katanya
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
        {alphabetData.map((item, index) => (
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

export default Alphabet;
