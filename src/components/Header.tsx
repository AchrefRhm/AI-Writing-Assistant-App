import React from 'react';
import { Menu, User, Settings, Bell, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
  onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onAuthClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="glass border-b border-white/20 px-6 py-4 flex items-center justify-between sticky top-0 z-40 backdrop-blur-xl">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-110"
        >
          <Menu size={20} className="text-white" />
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold floating">
            <Sparkles size={16} />
          </div>
          <h1 className="text-xl font-bold text-white gradient-text typing-animation">WriteAI</h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-110 relative">
          <Bell size={20} className="text-white" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>
        
        {user ? (
          <div className="flex items-center space-x-3">
            <span className="text-white/90">Welcome, {user.name}</span>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <Settings size={18} className="text-white" />
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={onAuthClick}
            className="btn-primary flex items-center space-x-2"
          >
            <User size={18} />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;