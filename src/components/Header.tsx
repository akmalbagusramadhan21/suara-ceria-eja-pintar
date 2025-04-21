
import React, { useEffect, useState } from 'react';
import { Mic, Home, Book, Languages, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Make sure we only access theme after component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const playButtonSound = () => {
    const audio = new Audio('/click.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.error('Could not play audio', e));
  };

  const handleNavClick = (path: string) => {
    playButtonSound();
    navigate(path);
  };

  const toggleTheme = () => {
    playButtonSound();
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Avoid rendering with wrong theme
  if (!mounted) return null;

  return (
    <header className="bg-gradient-to-r from-kid-blue to-kid-purple dark:from-dark-primary dark:to-dark-secondary p-4 rounded-b-lg shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-bold flex items-center">
            <Mic className="mr-2 animate-bounce-light" size={28} />
            <span>Suara Ceria</span>
          </h1>
        </div>
        <nav className="flex space-x-2">
          <Button 
            variant={location.pathname === '/' ? "secondary" : "ghost"} 
            className={`rounded-full font-medium ${location.pathname === '/' ? 'bg-white text-kid-blue dark:bg-dark-background dark:text-dark-primary' : 'text-white hover:bg-white/20'}`}
            onClick={() => handleNavClick('/')}
          >
            <Home className="mr-1" size={18} />
            Beranda
          </Button>
          <Button 
            variant={location.pathname === '/alphabet' ? "secondary" : "ghost"} 
            className={`rounded-full font-medium ${location.pathname === '/alphabet' ? 'bg-white text-kid-blue dark:bg-dark-background dark:text-dark-primary' : 'text-white hover:bg-white/20'}`}
            onClick={() => handleNavClick('/alphabet')}
          >
            <Book className="mr-1" size={18} />
            Alfabet
          </Button>
          <Button 
            variant={location.pathname === '/numbers' ? "secondary" : "ghost"} 
            className={`rounded-full font-medium ${location.pathname === '/numbers' ? 'bg-white text-kid-blue dark:bg-dark-background dark:text-dark-primary' : 'text-white hover:bg-white/20'}`}
            onClick={() => handleNavClick('/numbers')}
          >
            123
          </Button>
          <Button 
            variant={location.pathname === '/arabic' ? "secondary" : "ghost"} 
            className={`rounded-full font-medium ${location.pathname === '/arabic' ? 'bg-white text-kid-blue dark:bg-dark-background dark:text-dark-primary' : 'text-white hover:bg-white/20'}`}
            onClick={() => handleNavClick('/arabic')}
          >
            <Languages className="mr-1" size={18} />
            Arab
          </Button>
          <Button
            variant="ghost"
            className="rounded-full text-white hover:bg-white/20"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
