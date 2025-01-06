import React, { useState } from 'react';
import { CenterSelector } from './CenterSelector';
import { TicketForm } from './TicketForm';
import { Center, Ticket } from '../types';
import { sendSupportEmail } from '../utils/email';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface TicketSectionProps {
  centers: Center[];
}

export function TicketSection({ centers }: TicketSectionProps) {
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleTicketSubmit = async (ticket: Ticket) => {
    setStatus('sending');
    
    try {
      const emailSent = await sendSupportEmail(ticket);
      
      if (emailSent) {
        setStatus('success');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Créer un ticket de support
      </h2>
      
      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle className="text-green-600 w-5 h-5" />
          <p className="text-green-800">
            Ticket créé avec succès ! Un email a été envoyé au support.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="text-red-600 w-5 h-5" />
          <p className="text-red-800">
            Erreur lors de l'envoi du ticket. Veuillez réessayer ou contacter le support directement.
          </p>
        </div>
      )}
      
      <CenterSelector
        centers={centers}
        selectedCenter={selectedCenter}
        onSelectCenter={setSelectedCenter}
      />
      
      {selectedCenter && (
        <div className="mt-8">
          <TicketForm
            center={selectedCenter}
            onSubmit={handleTicketSubmit}
            disabled={status === 'sending'}
          />
        </div>
      )}
    </div>
  );
}