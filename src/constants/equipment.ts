// Equipment types and their specific issues
export const EQUIPMENT_TYPES = {
  server: 'Serveur',
  router: 'Routeur',
  tv: 'Écran TV',
  touch: 'Écran Tactile',
  camera: 'Caméra',
  switch: 'Switch'
} as const;

export const SCREEN_ISSUES = {
  'client-broken': 'Casse Client',
  'touch-bug': 'Bug Tactile',
  'white-screen': 'Page Blanche',
  'black-screen': 'Écran Noir',
  'other': 'Autre'
} as const;

export const CAMERA_ISSUES = {
  purple: 'Violette',
  misaligned: 'Désaxée',
  blur: 'Floue',
  sound: 'Son',
  other: 'Autre'
} as const;

// Support email configuration
export const SUPPORT_EMAIL = 'zaim.bouarfa@spash.com';