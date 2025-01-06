import React from 'react';
import { Center } from '../types';
import { MapPin } from 'lucide-react';

interface CenterSelectorProps {
  centers: Center[];
  selectedCenter: Center | null;
  onSelectCenter: (center: Center) => void;
}

export function CenterSelector({ centers, selectedCenter, onSelectCenter }: CenterSelectorProps) {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center space-x-3 mb-4">
        <MapPin className="w-5 h-5 text-red-500" />
        <label htmlFor="center" className="text-lg font-medium text-gray-700">
          Sélectionnez votre centre
        </label>
      </div>
      <select
        id="center"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm input-focus bg-white"
        value={selectedCenter?.id || ''}
        onChange={(e) => {
          const center = centers.find((c) => c.id === e.target.value);
          if (center) onSelectCenter(center);
        }}
      >
        <option value="">Choisir un centre</option>
        {centers.map((center) => (
          <option key={center.id} value={center.id}>
            {center.name} {center.number ? `(#${center.number})` : ''}
          </option>
        ))}
      </select>
    </div>
  );
}