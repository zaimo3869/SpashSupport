import React from 'react';

interface TroubleshootingGuide {
  title: string;
  icon: React.ReactNode;
  problem: string;
  cause: string;
  steps: string[];
  image?: string;
}

interface TroubleshootingCardProps {
  guide: TroubleshootingGuide;
  isExpanded?: boolean;
}

export function TroubleshootingCard({ guide, isExpanded = false }: TroubleshootingCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 ${
      isExpanded ? 'ring-2 ring-red-500 shadow-lg scale-[1.02]' : 'hover:shadow-lg'
    }`}>
      <div className="flex items-center gap-3 mb-4">
        {guide.icon}
        <h3 className="text-xl font-semibold text-gray-800">{guide.title}</h3>
      </div>
      
      {guide.image && (
        <div className="mb-4">
          <img 
            src={guide.image} 
            alt={`Illustration ${guide.title}`}
            className="w-full rounded-lg shadow-sm"
          />
        </div>
      )}
      
      <div className="space-y-4">
        <div className="bg-red-50 p-3 rounded-md">
          <p className="font-medium text-red-800">Problème : {guide.problem}</p>
          <p className="text-red-600 text-sm">Cause : {guide.cause}</p>
        </div>
        
        <div className={`space-y-2 transition-all duration-300 ${
          isExpanded ? 'opacity-100' : 'opacity-70'
        }`}>
          <p className="font-medium text-gray-700">Étapes de résolution :</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            {guide.steps.map((step, index) => (
              <li key={index} className={step.startsWith('-') ? 'ml-6 list-none text-sm' : ''}>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}