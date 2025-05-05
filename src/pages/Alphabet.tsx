import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Mic, Volume2, Cat, Banana, Palette, Square, Circle, Triangle, Hexagon } from 'lucide-react';

import CharacterCard from '@/components/CharacterCard';
import { Button } from '@/components/ui/button';
import startSpeechRecognition from '@/services/speechRecognition';

// Data kategori (hewani)
const animalAlphabet = [
  { char: 'A', example: 'Ayam', color: 'bg-kid-red', image: '/images/animals/ayam.png' },
  { char: 'B', example: 'Bebek', color: 'bg-kid-blue', image: '/images/animals/bebek.png' },
  { char: 'C', example: 'Cicak', color: 'bg-kid-green', image: '/images/animals/cicak.png' },
  { char: 'D', example: 'Domba', color: 'bg-kid-purple', image: '/images/animals/domba.png' },
  { char: 'E', example: 'Elang', color: 'bg-kid-orange', image: '/images/animals/elang.png' },
  { char: 'G', example: 'Gajah', color: 'bg-kid-pink', image: '/images/animals/gajah.png' },
  { char: 'H', example: 'Harimau', color: 'bg-kid-lightBlue', image: '/images/animals/harimau.png' },
  { char: 'I', example: 'Ikan', color: 'bg-kid-red', image: '/images/animals/ikan.png' },
  { char: 'J', example: 'Jerapah', color: 'bg-kid-lime', image: '/images/animals/jerapah.png' },
  { char: 'K', example: 'Kucing', color: 'bg-kid-purple', image: '/images/animals/kucing.png' },
  { char: 'L', example: 'Lebah', color: 'bg-kid-orange', image: '/images/animals/lebah.png' },
  { char: 'M', example: 'Monyet', color: 'bg-kid-teal', image: '/images/animals/monyet.png' },
  { char: 'N', example: 'Nyamuk', color: 'bg-kid-pink', image: '/images/animals/nyamuk.png' },
  { char: 'O', example: 'Onta', color: 'bg-kid-blue', image: '/images/animals/onta.png' },
  { char: 'P', example: 'Paus', color: 'bg-kid-red', image: '/images/animals/paus.png' },
  { char: 'Q', example: 'Quokka', color: 'bg-kid-green', image: '/images/animals/quokka.png' },
  { char: 'R', example: 'Rusa', color: 'bg-kid-orange', image: '/images/animals/rusa.png' },
  { char: 'S', example: 'Singa', color: 'bg-kid-purple', image: '/images/animals/singa.png' },
  { char: 'T', example: 'Tupai', color: 'bg-kid-lightBlue', image: '/images/animals/tupai.png' },
  { char: 'U', example: 'Ular', color: 'bg-kid-teal', image: '/images/animals/ular.png' },
  { char: 'V', example: 'Vampir', color: 'bg-kid-lime', image: '/images/animals/vampir.png' },
  { char: 'W', example: 'Walet', color: 'bg-kid-pink', image: '/images/animals/walet.png' },
  { char: 'Z', example: 'Zebra', color: 'bg-kid-green', image: '/images/animals/zebra.png' },
];

// Data kategori buah
const fruitAlphabet = [
  { char: 'A', example: 'Apel', color: 'bg-kid-red', image: '/images/fruits/apel.png' },
  { char: 'B', example: 'Belimbing', color: 'bg-kid-yellow', image: '/images/fruits/belimbing.png' },
  { char: 'C', example: 'Ceri', color: 'bg-kid-pink', image: '/images/fruits/ceri.png' },
  { char: 'D', example: 'Durian', color: 'bg-kid-green', image: '/images/fruits/durian.png' },
  { char: 'J', example: 'Jeruk', color: 'bg-kid-orange', image: '/images/fruits/jeruk.png' },
  { char: 'M', example: 'Mangga', color: 'bg-kid-yellow', image: '/images/fruits/mangga.png' },
  { char: 'N', example: 'Nangka', color: 'bg-kid-lime', image: '/images/fruits/nangka.png' },
  { char: 'P', example: 'Pisang', color: 'bg-kid-yellow', image: '/images/fruits/pisang.png' },
  { char: 'R', example: 'Rambutan', color: 'bg-kid-red', image: '/images/fruits/rambutan.png' },
  { char: 'S', example: 'Salak', color: 'bg-kid-brown', image: '/images/fruits/salak.png' },
  { char: 'T', example: 'Timun', color: 'bg-kid-green', image: '/images/fruits/timun.png' },
  { char: 'W', example: 'Wortel', color: 'bg-kid-orange', image: '/images/fruits/wortel.png' },
  { char: 'Z', example: 'Zaitun', color: 'bg-kid-green', image: '/images/fruits/zaitun.png' },
];

// Data warna
const colorsData = [
  { color: 'bg-kid-blue', name: 'Biru', image: '/images/colors/blue.png' },
  { color: 'bg-kid-red', name: 'Merah', image: '/images/colors/red.png' },
  { color: 'bg-kid-yellow', name: 'Kuning', image: '/images/colors/yellow.png' },
  { color: 'bg-kid-green', name: 'Hijau', image: '/images/colors/green.png' },
  { color: 'bg-kid-purple', name: 'Ungu', image: '/images/colors/purple.png' },
  { color: 'bg-kid-orange', name: 'Oranye', image: '/images/colors/orange.png' },
  { color: 'bg-kid-teal', name: 'Toska', image: '/images/colors/teal.png' },
  { color: 'bg-kid-pink', name: 'Merah Muda', image: '/images/colors/pink.png' },
  { color: 'bg-kid-lightBlue', name: 'Biru Muda', image: '/images/colors/lightblue.png' },
  { color: 'bg-kid-lime', name: 'Lime', image: '/images/colors/lime.png' },
];

// Data bentuk
const shapesData = [
  { icon: Square, name: 'Persegi', color: 'bg-kid-blue', image: '/images/shapes/square.png' },
  { icon: Circle, name: 'Lingkaran', color: 'bg-kid-green', image: '/images/shapes/circle.png' },
  { icon: Triangle, name: 'Segitiga', color: 'bg-kid-yellow', image: '/images/shapes/triangle.png' },
  { icon: Hexagon, name: 'Segi Enam', color: 'bg-kid-purple', image: '/images/shapes/hexagon.png' },
];

const categories = [
  { key: 'animal', label: 'Nama Hewan', icon: Cat },
  { key: 'fruit', label: 'Nama Buah', icon: Banana },
  { key: 'color', label: 'Warna', icon: Palette },
  { key: 'shape', label: 'Bentuk', icon: Square },
] as const;
type CategoryKey = typeof categories[number]['key'];

// For the time being, we'll use placeholder images until real images are supplied
const placeholderImageBase = "https://placehold.co/200";

const Alphabet: React.FC = () => {
  const [category, setCategory] = useState<CategoryKey>('animal');
  const [selectedCharIndex, setSelectedCharIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [streak, setStreak] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState<Record<string, boolean>>({});

  // Pilih data berdasarkan kategori
  const data =
    category === 'animal'
      ? animalAlphabet
      : category === 'fruit'
      ? fruitAlphabet
      : [];

  const selectedChar =
    category === 'animal' || category === 'fruit'
      ? data[selectedCharIndex] || data[0]
      : undefined;

  // Function to get image URL or fallback to placeholder
  const getImageUrl = (item: any) => {
    // Check if image path exists and add a query parameter to prevent caching if needed
    if (!item?.image) {
      // Generate a text placeholder based on the character or name
      const seed = item.char || item.name || 'default';
      return `https://placehold.co/200?text=${encodeURIComponent(seed)}&fontsize=24`;
    }
    
    // Add timestamp to prevent caching issues with images
    return `${item.image}?t=${new Date().getTime()}`;
  };

  // Preload images for the current category
  useEffect(() => {
    let currentData: any[] = [];
    
    if (category === 'animal') currentData = animalAlphabet;
    else if (category === 'fruit') currentData = fruitAlphabet;
    else if (category === 'color') currentData = colorsData;
    else if (category === 'shape') currentData = shapesData;
    
    currentData.forEach(item => {
      const img = new Image();
      img.src = getImageUrl(item);
      img.onload = () => {
        setIsImageLoaded(prev => ({...prev, [img.src]: true}));
      };
    });
  }, [category]);

  useEffect(() => {
    // reset indeks
    setSelectedCharIndex(0);
    setIsListening(false);
    setFeedback(null);
    setStreak(0);
  }, [category]);

  useEffect(() => {
    let stopRecognition: (() => void) | null = null;
    if (isListening && (category === 'animal' || category === 'fruit')) {
      stopRecognition = startSpeechRecognition(
        (transcript) => {
          handleSpeechResult(transcript);
        },
        (error) => {
          toast.error('Gagal mendengarkan. Coba lagi ya!');
          setIsListening(false);
        }
      );
    }
    return () => {
      if (stopRecognition) stopRecognition();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening, selectedCharIndex, category]);

  const handleSpeechResult = (transcript: string) => {
    setIsListening(false);
    if (!selectedChar) return;
    const charToMatch = selectedChar.char.toLowerCase();
    // Matching by char or example name
    if (
      transcript === charToMatch ||
      transcript.includes(charToMatch + ' ') ||
      transcript.includes(' ' + charToMatch) ||
      transcript === selectedChar.example.toLowerCase()
    ) {
      setFeedback('success');
      playSuccessSound();
      setStreak((prev) => prev + 1);
      setTimeout(() => {
        setFeedback(null);
        setSelectedCharIndex((prev) => (prev + 1) % data.length);
      }, 1500);
    } else {
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
    if (!selectedChar) return;
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
    audio.play().catch(() => {});
  };

  const playErrorSound = () => {
    const audio = new Audio('/error.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {});
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 relative">
      {/* Selector kategori */}
      <div className="flex justify-center mb-6 gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Button
              key={cat.key}
              variant={category === cat.key ? 'secondary' : 'ghost'}
              className={`flex items-center rounded-full px-4 py-2 text-base
                ${category === cat.key ? 'bg-kid-blue text-white font-bold shadow-md' : 'text-kid-blue dark:text-kid-yellow'}`}
              onClick={() => setCategory(cat.key)}
            >
              <Icon className="mr-2" />
              {cat.label}
            </Button>
          );
        })}
      </div>

      {/* Headings */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-kid-blue mb-2">
          {category === 'animal' && 'Belajar Alfabet Hewan!'}
          {category === 'fruit' && 'Belajar Alfabet Buah!'}
          {category === 'color' && 'Belajar Nama Warna!'}
          {category === 'shape' && 'Belajar Bentuk!'}
        </h1>
        {category === 'animal' || category === 'fruit' ? (
          <p className="text-gray-600 mb-4">
            Sebutkan huruf atau nama contoh {category === 'animal' ? 'hewan' : 'buah'} yang tampil
          </p>
        ) : (
          <p className="text-gray-600 mb-4">
            Ketuk kartu warna atau bentuk untuk mengenal nama dan warna/bentuknya.
          </p>
        )}

        {category !== 'color' && category !== 'shape' && streak > 0 && (
          <div className="bg-kid-yellow/20 rounded-full px-4 py-1 text-kid-orange font-medium inline-block">
            �� Streak: {streak}
          </div>
        )}
      </div>

      {/* Kartu utama */}
      {(category === 'animal' || category === 'fruit') && selectedChar && (
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{
              scale:
                feedback === 'success'
                  ? [1, 1.2, 1]
                  : feedback === 'error'
                  ? [1, 0.8, 1]
                  : 1,
            }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <CharacterCard
              character={selectedChar.char}
              example={selectedChar.example}
              color={selectedChar.color}
              isActive={isListening}
              imageSrc={getImageUrl(selectedChar)}
            />
          </motion.div>
        </div>
      )}

      {/* Kartu warna */}
      {category === 'color' && (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {colorsData.map((item) => (
            <div key={item.name} className="flex flex-col items-center">
              {/* Image above the color card */}
              <motion.div 
                className="mb-2 w-20 h-20 flex items-center justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <img 
                  src={getImageUrl(item)} 
                  alt={item.name} 
                  className="object-contain max-h-full max-w-full rounded-lg"
                />
              </motion.div>
              
              {/* Color card */}
              <motion.div
                className={`w-36 h-36 rounded-2xl shadow-md flex flex-col items-center justify-center cursor-pointer ${item.color}`}
                title={item.name}
                role="button"
                tabIndex={0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const utter = new SpeechSynthesisUtterance(item.name);
                  utter.lang = 'id-ID';
                  speechSynthesis.speak(utter);
                }}
              >
                <span className="text-2xl text-white font-bold">{item.name}</span>
              </motion.div>
            </div>
          ))}
        </div>
      )}

      {/* Kartu bentuk */}
      {category === 'shape' && (
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {shapesData.map((item) => {
            const ShapeIcon = item.icon;
            return (
              <div key={item.name} className="flex flex-col items-center">
                {/* Image above the shape card */}
                <motion.div 
                  className="mb-2 w-20 h-20 flex items-center justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <img 
                    src={getImageUrl(item)} 
                    alt={item.name} 
                    className="object-contain max-h-full max-w-full rounded-lg"
                  />
                </motion.div>
                
                {/* Shape card */}
                <motion.div
                  className={`w-36 h-36 rounded-2xl shadow-md flex flex-col items-center justify-center cursor-pointer ${item.color}`}
                  title={item.name}
                  role="button"
                  tabIndex={0}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const utter = new SpeechSynthesisUtterance(item.name);
                    utter.lang = 'id-ID';
                    speechSynthesis.speak(utter);
                  }}
                >
                  <ShapeIcon className="text-white mb-4" size={48} />
                  <span className="text-2xl text-white font-bold">{item.name}</span>
                </motion.div>
              </div>
            );
          })}
        </div>
      )}

      {/* Kontrol tombol untuk kategori huruf */}
      {(category === 'animal' || category === 'fruit') && (
        <div className="flex justify-center space-x-4">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full bg-white border-kid-blue text-kid-blue hover:bg-kid-blue hover:text-white transition-colors"
            onClick={speakCharacter}
            disabled={!selectedChar}
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
      )}

      {/* Feedback hasil */}
      {feedback && (category === 'animal' || category === 'fruit') && (
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

      {/* Grid pilihan karakter */}
      {(category === 'animal' || category === 'fruit') && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mt-12">
          {data.map((item, index) => (
            <div
              key={item.char}
              className="aspect-square"
              onClick={() => setSelectedCharIndex(index)}
            >
              <CharacterCard
                character={item.char}
                color={item.color}
                example={item.example}
                isActive={index === selectedCharIndex}
                imageSrc={getImageUrl(item)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Alphabet;
