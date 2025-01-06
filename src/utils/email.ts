import { EMAIL_CONFIG } from '../config/email';
import emailjs from '@emailjs/browser';
import type { Ticket } from '../types';

export async function sendSupportEmail(ticket: Ticket) {
  try {
    // Initialize EmailJS
    emailjs.init(EMAIL_CONFIG.USER_ID);

    // Format ticket data for email
    const templateParams = {
      to_email: EMAIL_CONFIG.TO_EMAIL,
      from_email: ticket.managerEmail,
      center_name: ticket.centerNumber, // Using center number as identifier
      issue_type: ticket.type === 'hardware' ? 'Matériel' : 'Logiciel',
      category: formatCategory(ticket.category),
      description: ticket.description,
      // Additional details based on ticket type
      details: formatTicketDetails(ticket),
      timestamp: new Date().toLocaleString('fr-FR', { 
        timeZone: 'Europe/Paris'
      })
    };

    await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATE_ID,
      templateParams
    );

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

function formatCategory(category: string): string {
  const categories = {
    'broken': 'Casse Matériel',
    'malfunction': 'Dysfonctionnement',
    'missing-video': 'Vidéos Manquantes',
    'other': 'Autre Problème'
  };
  return categories[category as keyof typeof categories] || category;
}

function formatTicketDetails(ticket: Ticket): string {
  if (ticket.type === 'hardware') {
    return `
      Type d'équipement: ${ticket.equipmentType}
      ${ticket.specificIssue ? `Problème spécifique: ${ticket.specificIssue}` : ''}
    `;
  } else {
    if (ticket.category === 'missing-video') {
      return `
        Terrain: ${ticket.courtName}
        Date: ${ticket.date}
        Heure: ${ticket.time}
      `;
    }
    return '';
  }
}