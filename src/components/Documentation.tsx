import React, { useState } from 'react';
import { BookOpen, Monitor, Power, Tablet, RefreshCcw, Trophy, AlertCircle } from 'lucide-react';
import { TroubleshootingCard } from './TroubleshootingCard';
import whiteScreenError from '../assets/images/white-screen-error.png';

const troubleshootingGuides = {
  whiteScreen: {
    title: 'Écran Page Blanche',
    icon: <Monitor className="w-6 h-6 text-red-600" />,
    problem: 'L\'écran affiche une page blanche',
    cause: 'Problème de connexion réseau',
    steps: [
      'Vérifier que le câble RJ45 est bien branché à l\'écran',
      'Vérifier que l\'autre extrémité du câble est bien connectée au switch',
      'Observer si une LED orange ou verte est allumée sur le port du switch',
      'Si aucune LED n\'est allumée, essayer un autre port sur le switch',
      'Si le problème persiste, tester avec un nouveau câble RJ45'
    ],
    image: whiteScreenError
  },
  redScreen: {
    title: 'Écran Rouge',
    icon: <Power className="w-6 h-6 text-red-600" />,
    problem: 'L\'écran affiche une page rouge',
    cause: 'Problème système nécessitant un redémarrage',
    steps: [
      'Localiser le bouton de redémarrage sur l\'écran',
      'Appuyer sur le bouton de redémarrage',
      'Attendre que l\'écran redémarre complètement (environ 2-3 minutes)',
      'Vérifier que l\'affichage est revenu à la normale'
    ]
  },
  tabletTouch: {
    title: 'Tablette Tactile',
    icon: <Tablet className="w-6 h-6 text-red-600" />,
    problem: 'La tablette ne répond plus au tactile',
    cause: 'Écran sale ou nécessité de redémarrage',
    steps: [
      'Nettoyer délicatement l\'écran avec un chiffon microfibre',
      'Redémarrer électroniquement la tablette:',
      '- Maintenir le bouton power pendant 5 secondes',
      '- Attendre l\'extinction complète',
      '- Rallumer la tablette',
      'Tester le tactile après le redémarrage'
    ]
  },
  fiveLeague: {
    title: 'Le Five - Matchs de Ligue',
    icon: <Trophy className="w-6 h-6 text-red-600" />,
    problem: 'Les matchs de ligue ne s\'affichent pas',
    cause: 'Problème de configuration de la ligue',
    steps: [
      'Vérifier que la date du match est correcte',
      'Contrôler l\'inscription de l\'équipe dans la ligue',
      'Dans l\'interface de gestion:',
      '- Aller dans "Ligues"',
      '- Vérifier le statut "Match de ligue"',
      '- Contrôler les équipes participantes',
      'Si problème persiste:',
      '- Contacter le support de la ligue',
      '- Fournir le numéro du match'
    ]
  },
  fiveMatches: {
    title: 'Le Five - Matchs Non Visibles sur la tablette',
    icon: <AlertCircle className="w-6 h-6 text-red-600" />,
    problem: 'Les matchs ne remontent pas sur les tablettes',
    cause: 'Problème de synchronisation tablette-serveur',
    steps: [
      'Vérifier la connexion internet de la tablette',
      'Forcer la synchronisation:',
      '- Ouvrir les paramètres',
      '- Sélectionner "Synchronisation"',
      '- Appuyer sur "Forcer la synchro"',
      'Si échec:',
      '- Redémarrer l\'application',
      '- Attendre 2 minutes',
      '- Retenter la synchronisation'
    ]
  }
};

export function Documentation() {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-red-600" />
        <h2 className="text-2xl font-bold text-gray-800">Guide de dépannage rapide</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(troubleshootingGuides).map(([key, guide]) => (
          <div 
            key={key}
            onClick={() => setSelectedGuide(selectedGuide === key ? null : key)}
            className="cursor-pointer"
          >
            <TroubleshootingCard 
              guide={guide} 
              isExpanded={selectedGuide === key}
            />
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-blue-800 font-medium flex items-center gap-2">
          <RefreshCcw className="w-5 h-5" />
          Si ces étapes ne résolvent pas votre problème, créez un ticket de support.
        </p>
      </div>
    </div>
  );
}