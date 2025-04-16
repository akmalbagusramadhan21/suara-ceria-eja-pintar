
import React from 'react';
import { Mic, Home, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-gradient-to-r from-kid-blue to-kid-purple p-4 rounded-b-lg shadow-md">
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
            className={`rounded-full font-medium ${location.pathname === '/' ? 'bg-white text-kid-blue' : 'text-white hover:bg-white/20'}`}
            onClick={() => navigate('/')}
          >
            <Home className="mr-1" size={18} />
            Beranda
          </Button>
          <Button 
            variant={location.pathname === '/alphabet' ? "secondary" : "ghost"} 
            className={`rounded-full font-medium ${location.pathname === '/alphabet' ? 'bg-white text-kid-blue' : 'text-white hover:bg-white/20'}`}
            onClick={() => navigate('/alphabet')}
          >
            <Book className="mr-1" size={18} />
            Alfabet
          </Button>
          <Button 
            variant={location.pathname === '/numbers' ? "secondary" : "ghost"} 
            className={`rounded-full font-medium ${location.pathname === '/numbers' ? 'bg-white text-kid-blue' : 'text-white hover:bg-white/20'}`}
            onClick={() => navigate('/numbers')}
          >
            123
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
