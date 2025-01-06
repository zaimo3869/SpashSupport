import React from 'react';
import { BookOpen, TicketIcon } from 'lucide-react';

interface MainMenuProps {
  onNavigate: (section: 'docs' | 'ticket') => void;
}

export function MainMenu({ onNavigate }: MainMenuProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pt-12 px-4">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Comment pouvons-nous vous aider ?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choisissez une option ci-dessous pour obtenir de l'aide ou signaler un problème
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <button
          onClick={() => onNavigate('docs')}
          className="card-hover p-8 bg-white rounded-xl shadow-md flex flex-col items-center"
        >
          <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Guide de dépannage</h3>
          <p className="text-gray-600 text-center">
            Solutions rapides pour résoudre les problèmes courants
          </p>
        </button>

        <button
          onClick={() => onNavigate('ticket')}
          className="card-hover p-8 bg-white rounded-xl shadow-md flex flex-col items-center"
        >
          <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mb-6">
            <TicketIcon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Créer un ticket</h3>
          <p className="text-gray-600 text-center">
            Contactez notre équipe de support technique
          </p>
        </button>
      </div>
    </div>
  );
}