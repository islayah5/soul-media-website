export interface QuoteSubmissionData {
  name: string;
  email: string;
  businessName?: string;
  deliverableVolume: number;
  managementLevel: string;
  servicesSelected: string[];
  notes?: string;
}

export interface ContactSubmissionData {
  name: string;
  email: string;
  serviceInterest: string;
  message: string;
}

const TARGET_EMAIL = 'soulmediagroup.info@gmail.com';

export const formatQuoteEmail = (data: QuoteSubmissionData): { subject: string; body: string } => {
  const subject = `New Soul Media Strategy Request from ${data.name}`;
  const body = `SOUL MEDIA CUSTOM SCOPE REQUEST
===========================================
Client Name: ${data.name}
Email Address: ${data.email}
Business / Brand: ${data.businessName || 'Not specified'}

SCOPE & VOLUME DETAILS:
-------------------------------------------
Monthly Deliverables Target: ${data.deliverableVolume} assets / month
Management Preference: ${data.managementLevel}

SELECTED SERVICES & MODULES:
-------------------------------------------
${data.servicesSelected.length > 0 ? data.servicesSelected.map(s => `• ${s}`).join('\n') : '• Core Strategy & Media Production'}

PROJECT NOTES & VISION:
-------------------------------------------
${data.notes || 'No specific notes provided.'}

Submitted via Soul Media Digital Portal on ${new Date().toLocaleDateString()}
`;

  return { subject, body };
};

export const formatContactEmail = (data: ContactSubmissionData): { subject: string; body: string } => {
  const subject = `Direct Consultation Request: ${data.name} (${data.serviceInterest})`;
  const body = `SOUL MEDIA DIRECT CONSULTATION INQUIRY
===========================================
Name: ${data.name}
Email: ${data.email}
Service Focus: ${data.serviceInterest}

MESSAGE:
-------------------------------------------
${data.message}

Submitted via Soul Media Contact Form on ${new Date().toLocaleDateString()}
`;

  return { subject, body };
};

export const triggerMailto = (subject: string, body: string): void => {
  const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
};
