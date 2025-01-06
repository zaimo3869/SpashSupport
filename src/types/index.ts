// Types for equipment categories and issues
export type EquipmentType = 'server' | 'router' | 'tv' | 'touch' | 'camera' | 'switch';
export type ScreenIssue = 'client-broken' | 'touch-bug' | 'white-screen' | 'black-screen' | 'other';
export type CameraIssue = 'purple' | 'misaligned' | 'blur' | 'sound' | 'other';

export interface Center {
  id: string;
  name: string;
  number?: string;
}

export interface TicketBase {
  centerId: string;
  managerEmail: string;
  centerNumber?: string;
  timestamp: string;
  supportEmail: string;
}

export interface HardwareTicket extends TicketBase {
  type: 'hardware';
  category: 'broken' | 'malfunction';
  equipmentType: EquipmentType;
  specificIssue?: ScreenIssue | CameraIssue;
  description: string;
}

export interface SoftwareTicket extends TicketBase {
  type: 'software';
  category: 'missing-video' | 'other';
  description: string;
  courtName?: string;
  date?: string;
  time?: string;
  screenshot?: File;
}

export type Ticket = HardwareTicket | SoftwareTicket;