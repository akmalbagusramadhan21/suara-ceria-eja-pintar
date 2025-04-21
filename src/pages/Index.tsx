import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Book, BarChart, Languages } from 'lucide-react';
import Background from '@/components/Background';
import Mascot from '@/components/Mascot';

const Index = () => {
  const navigate = useNavigate();

  const playButtonSound = () => {
    const audio = new Audio('/click.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.error('Could not play audio', e));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <Background />
      <Mascot />

      <motion.div
        className="text-center mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-kid-blue to-kid-purple bg-clip-text text-transparent mb-4">
          Suara Ceria Eja Pintar
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Belajar membaca dan berhitung dengan menyenangkan! 
          Ucapkan huruf dan angka yang kamu lihat untuk melatih kemampuanmu.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl"
      >
        <motion.div variants={itemVariants}>
          <div 
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => navigate('/alphabet')}
          >
            <div className="bg-gradient-to-r from-kid-blue to-kid-purple h-16 flex items-center justify-center">
              <Book className="text-white" size={32} />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Belajar Alfabet</h2>
              <p className="text-gray-600 mb-4">
                Mengenal huruf A sampai Z dan berlatih mengucapkannya dengan benar
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['A', 'B', 'C', 'D', 'E', 'F'].map(letter => (
                  <span 
                    key={letter} 
                    className="w-10 h-10 rounded-full bg-kid-blue/10 text-kid-blue flex items-center justify-center font-bold"
                  >
                    {letter}
                  </span>
                ))}
                <span className="w-10 h-10 rounded-full bg-kid-purple/10 text-kid-purple flex items-center justify-center font-bold">
                  ...
                </span>
              </div>
              <Button 
                className="w-full bg-kid-blue hover:bg-kid-blue/90"
                onClick={() => navigate('/alphabet')}
              >
                Mulai Belajar
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div 
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => navigate('/numbers')}
          >
            <div className="bg-gradient-to-r from-kid-orange to-kid-red h-16 flex items-center justify-center">
              <BarChart className="text-white" size={32} />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Belajar Angka</h2>
              <p className="text-gray-600 mb-4">
                Mengenal angka 0 sampai 10 dan berlatih mengucapkannya dengan benar
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['1', '2', '3', '4', '5'].map(num => (
                  <span 
                    key={num} 
                    className="w-10 h-10 rounded-full bg-kid-orange/10 text-kid-orange flex items-center justify-center font-bold"
                  >
                    {num}
                  </span>
                ))}
                <span className="w-10 h-10 rounded-full bg-kid-red/10 text-kid-red flex items-center justify-center font-bold">
                  ...
                </span>
              </div>
              <Button 
                className="w-full bg-kid-orange hover:bg-kid-orange/90"
                onClick={() => navigate('/numbers')}
              >
                Mulai Belajar
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div 
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => navigate('/arabic')}
          >
            <div className="bg-gradient-to-r from-kid-purple to-kid-blue h-16 flex items-center justify-center">
              <Languages className="text-white" size={32} />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Belajar Huruf Arab</h2>
              <p className="text-gray-600 mb-4">
                Mengenal huruf hijaiyah dan berlatih mengucapkannya dengan benar
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['ا', 'ب', 'ت', 'ث', 'ج'].map(letter => (
                  <span 
                    key={letter} 
                    className="w-10 h-10 rounded-full bg-kid-purple/10 text-kid-purple flex items-center justify-center font-bold text-xl"
                  >
                    {letter}
                  </span>
                ))}
                <span className="w-10 h-10 rounded-full bg-kid-blue/10 text-kid-blue flex items-center justify-center font-bold">
                  ...
                </span>
              </div>
              <Button 
                className="w-full bg-kid-purple hover:bg-kid-purple/90"
                onClick={() => navigate('/arabic')}
              >
                Mulai Belajar
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-gray-500 text-sm">
          Tekan tombol mikrofon dan ucapkan huruf atau angka yang kamu lihat!
        </p>
      </motion.div>
    </div>
  );
};

export default Index;
