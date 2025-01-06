import React, { useState } from 'react';
import { Center, Ticket, EquipmentType, ScreenIssue, CameraIssue } from '../types';
import { AlertCircleIcon, MonitorIcon } from 'lucide-react';
import { EQUIPMENT_TYPES, SCREEN_ISSUES, CAMERA_ISSUES, SUPPORT_EMAIL } from '../constants/equipment';

interface TicketFormProps {
  center: Center;
  onSubmit: (ticket: Ticket) => void;
}

export function TicketForm({ center, onSubmit }: TicketFormProps) {
  // Base form state
  const [type, setType] = useState<'hardware' | 'software'>('hardware');
  const [managerEmail, setManagerEmail] = useState('');
  const [category, setCategory] = useState<'broken' | 'malfunction' | 'missing-video' | 'other'>('broken');
  const [description, setDescription] = useState('');

  // Hardware specific state
  const [equipmentType, setEquipmentType] = useState<EquipmentType>('server');
  const [specificIssue, setSpecificIssue] = useState<ScreenIssue | CameraIssue>('client-broken');

  // Software specific state
  const [courtName, setCourtName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const baseTicket = {
      centerId: center.id,
      managerEmail,
      centerNumber: center.number,
      timestamp: new Date().toISOString(),
      supportEmail: SUPPORT_EMAIL,
    };

    if (type === 'hardware') {
      onSubmit({
        ...baseTicket,
        type,
        category: category as 'broken' | 'malfunction',
        equipmentType,
        specificIssue: ['tv', 'touch'].includes(equipmentType) ? specificIssue as ScreenIssue :
                      equipmentType === 'camera' ? specificIssue as CameraIssue :
                      undefined,
        description,
      });
    } else {
      onSubmit({
        ...baseTicket,
        type,
        category: category as 'missing-video' | 'other',
        description,
        courtName: category === 'missing-video' ? courtName : undefined,
        date: category === 'missing-video' ? date : undefined,
        time: category === 'missing-video' ? time : undefined,
      });
    }
  };

  // Render specific issues based on equipment type
  const renderSpecificIssues = () => {
    if (['tv', 'touch'].includes(equipmentType)) {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type de problème</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={specificIssue}
            onChange={(e) => setSpecificIssue(e.target.value as ScreenIssue)}
          >
            {Object.entries(SCREEN_ISSUES).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      );
    }

    if (equipmentType === 'camera') {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type de problème</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={specificIssue}
            onChange={(e) => setSpecificIssue(e.target.value as CameraIssue)}
          >
            {Object.entries(CAMERA_ISSUES).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      );
    }

    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-6">
        {/* Problem Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type de problème</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className={`p-4 border rounded-lg flex flex-col items-center ${
                type === 'hardware' ? 'border-red-500 bg-red-50' : 'border-gray-200'
              }`}
              onClick={() => setType('hardware')}
            >
              <AlertCircleIcon className="h-6 w-6 mb-2" />
              <span>Matériel (Hardware)</span>
            </button>
            <button
              type="button"
              className={`p-4 border rounded-lg flex flex-col items-center ${
                type === 'software' ? 'border-red-500 bg-red-50' : 'border-gray-200'
              }`}
              onClick={() => setType('software')}
            >
              <MonitorIcon className="h-6 w-6 mb-2" />
              <span>Logiciel (Software)</span>
            </button>
          </div>
        </div>

        {/* Manager Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email du gérant
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            value={managerEmail}
            onChange={(e) => setManagerEmail(e.target.value)}
          />
        </div>

        {type === 'hardware' ? (
          <>
            {/* Hardware Problem Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={category}
                onChange={(e) => setCategory(e.target.value as 'broken' | 'malfunction')}
              >
                <option value="broken">Casse Matériel</option>
                <option value="malfunction">Dysfonctionnement</option>
              </select>
            </div>

            {/* Equipment Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type d'équipement</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={equipmentType}
                onChange={(e) => setEquipmentType(e.target.value as EquipmentType)}
              >
                {Object.entries(EQUIPMENT_TYPES).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Specific Issues Based on Equipment Type */}
            {renderSpecificIssues()}
          </>
        ) : (
          <>
            {/* Software Problem Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={category}
                onChange={(e) => setCategory(e.target.value as 'missing-video' | 'other')}
              >
                <option value="missing-video">Vidéos Manquantes</option>
                <option value="other">Autre Problème Logiciel</option>
              </select>
            </div>

            {/* Missing Video Details */}
            {category === 'missing-video' && (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Terrain</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={courtName}
                    onChange={(e) => setCourtName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heure</label>
                  <input
                    type="time"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
            )}
          </>
        )}

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            required
            className="w-full p-2 border border-gray-300 rounded-md h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
        >
          Soumettre le ticket
        </button>
      </div>
    </form>
  );
}