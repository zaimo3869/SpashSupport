import React from 'react';
import { HeadphonesIcon, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  onBack?: () => void;
}

export function Header({ onBack }: HeaderProps) {
  return (
    <header className="gradient-bg text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {onBack && (
            <button
              onClick={onBack}
              className="hover:bg-white/10 p-2 rounded-full transition-colors"
              aria-label="Retour"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 p-2 rounded-full">
              <HeadphonesIcon size={28} />
            </div>
            <h1 className="text-2xl font-bold">Support Spash</h1>
          </div>
        </div>
        
        <p className="text-sm hidden md:block font-medium">
          Support technique pour centres sportifs
        </p>
      </div>
    </header>
  );
}