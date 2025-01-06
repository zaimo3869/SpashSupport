import React, { useState } from 'react';
import { Header } from './components/Header';
import { MainMenu } from './components/MainMenu';
import { Documentation } from './components/Documentation';
import { TicketSection } from './components/TicketSection';
import { Center } from './types';

// Mock data for centers
const mockCenters: Center[] = [
  { id: '1', name: 'Tennis Club Paris', number: 'PAR001' },
  { id: '2', name: 'Foot Indoor Lyon', number: 'LYO001' },
  { id: '3', name: 'Tennis Club Marseille', number: 'MAR001' },
  { id: '4', name: 'Player 5 M', number: 'LYO002' }
];

function App() {
  const [currentSection, setCurrentSection] = useState<'menu' | 'docs' | 'ticket'>('menu');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onBack={currentSection !== 'menu' ? () => setCurrentSection('menu') : undefined} />
      
      <main className="container mx-auto py-8 px-4">
        {currentSection === 'menu' && (
          <MainMenu onNavigate={setCurrentSection} />
        )}
        
        {currentSection === 'docs' && (
          <Documentation onCreateTicket={() => setCurrentSection('ticket')} />
        )}
        
        {currentSection === 'ticket' && (
          <TicketSection centers={mockCenters} />
        )}
      </main>
    </div>
  );
}

export default App;