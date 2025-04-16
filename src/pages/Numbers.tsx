
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Mic, Volume2 } from 'lucide-react';
import CharacterCard from '@/components/CharacterCard';
import { Button } from '@/components/ui/button';
import startSpeechRecognition from '@/services/speechRecognition';

// Define numbers data with Indonesian names
const numbersData = [
  { char: '0', name: 'Nol', color: 'bg-kid-blue' },
  { char: '1', name: 'Satu', color: 'bg-kid-red' },
  { char: '2', name: 'Dua', color: 'bg-kid-green' },
  { char: '3', name: 'Tiga', color: 'bg-kid-orange' },
  { char: '4', name: 'Empat', color: 'bg-kid-purple' },
  { char: '5', name: 'Lima', color: 'bg-kid-teal' },
  { char: '6', name: 'Enam', color: 'bg-kid-pink' },
  { char: '7', name: 'Tujuh', color: 'bg-kid-lightBlue' },
  { char: '8', name: 'Delapan', color: 'bg-kid-yellow' },
  { char: '9', name: 'Sembilan', color: 'bg-kid-lime' },
  { char: '10', name: 'Sepuluh', color: 'bg-kid-blue' },
];

const Numbers: React.FC = () => {
  const [selectedNumIndex, setSelectedNumIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [streak, setStreak] = useState(0);

  const selectedNum = numbersData[selectedNumIndex];

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
  }, [isListening, selectedNumIndex]);

  const handleSpeechResult = (transcript: string) => {
    setIsListening(false);
    
    // Check if the recognized speech matches the current number or its name
    const numToMatch = selectedNum.char;
    const nameToMatch = selectedNum.name.toLowerCase();
    
    if (transcript === numToMatch || 
        transcript.includes(numToMatch + ' ') || 
        transcript.includes(' ' + numToMatch) || 
        transcript === nameToMatch) {
      // Success!
      setFeedback('success');
      playSuccessSound();
      setStreak(prev => prev + 1);
      
      setTimeout(() => {
        setFeedback(null);
        // Move to the next number after a short delay
        setSelectedNumIndex((prev) => (prev + 1) % numbersData.length);
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

  const speakNumber = () => {
    const utterance = new SpeechSynthesisUtterance(selectedNum.char);
    utterance.lang = 'id-ID';
    speechSynthesis.speak(utterance);
    
    setTimeout(() => {
      const nameUtterance = new SpeechSynthesisUtterance(selectedNum.name);
      nameUtterance.lang = 'id-ID';
      speechSynthesis.speak(nameUtterance);
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
          Mari Belajar Angka!
        </h1>
        <p className="text-gray-600 mb-4">
          Sebutkan angka yang ditampilkan atau nama angkanya
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
            character={selectedNum.char}
            example={selectedNum.name}
            color={selectedNum.color}
            isActive={isListening}
          />
        </motion.div>
      </div>

      <div className="flex justify-center space-x-4">
        <Button 
          size="lg"
          variant="outline"
          className="rounded-full bg-white border-kid-blue text-kid-blue hover:bg-kid-blue hover:text-white transition-colors"
          onClick={speakNumber}
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

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-12">
        {numbersData.map((item, index) => (
          <div 
            key={item.char} 
            className="aspect-square"
            onClick={() => setSelectedNumIndex(index)}
          >
            <CharacterCard 
              character={item.char} 
              color={item.color}
              isActive={index === selectedNumIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Numbers;
