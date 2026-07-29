export interface QuoteSubmissionData {
  name: string;
  email: string;
  businessName?: string;
  deliverableVolume: number;
  managementLevel: string;
  servicesSelected: string[];
  notes?: string;
  estimatedMin?: number;
  estimatedMax?: number;
}

export interface ContactSubmissionData {
  name: string;
  email: string;
  serviceInterest: string;
  message: string;
}

const TARGET_EMAIL = 'soulmediagroup.info@gmail.com';

/**
 * Format email text for backup / mailto triggers
 */
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
Estimated Monthly Scope: $${data.estimatedMin || 0} - $${data.estimatedMax || 0} / mo

SELECTED SERVICES & MODULES:
-------------------------------------------
${data.servicesSelected.length > 0 ? data.servicesSelected.map(s => `• ${s}`).join('\n') : '• Core Strategy & Media Production'}

PROJECT NOTES & VISION:
-------------------------------------------
${data.notes || 'No specific notes provided.'}

Submitted via Soul Media Digital Portal on ${new Date().toLocaleString()}
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

Submitted via Soul Media Contact Form on ${new Date().toLocaleString()}
`;

  return { subject, body };
};

/**
 * SILENT BACKGROUND LEAD CAPTURE ENGINE
 * Automatically sends lead payload to soulmediagroup.info@gmail.com and saves to local storage vault.
 * Zero popups, zero redirects, zero UI impact for the prospect.
 */
export const sendLeadPayloadBackground = async (
  type: 'ScopeBuilder' | 'ContactForm',
  payload: QuoteSubmissionData | ContactSubmissionData
): Promise<boolean> => {
  const timestamp = new Date().toISOString();
  const leadEntry = {
    id: `lead_${Date.now()}`,
    type,
    payload,
    timestamp,
    status: 'captured',
  };

  // 1. Save to local browser storage vault (Anti-loss fail-safe)
  try {
    const existingLeadsRaw = localStorage.getItem('soul_media_leads_vault');
    const existingLeads = existingLeadsRaw ? JSON.parse(existingLeadsRaw) : [];
    existingLeads.unshift(leadEntry);
    localStorage.setItem('soul_media_leads_vault', JSON.stringify(existingLeads));
  } catch (err) {
    console.warn('Local storage lead vault caching error:', err);
  }

  // 2. Dispatch silent background AJAX request to soulmediagroup.info@gmail.com
  try {
    const formSubmitUrl = `https://formsubmit.co/ajax/${TARGET_EMAIL}`;
    
    let emailSubject = '';
    let formFields: Record<string, any> = {};

    if (type === 'ScopeBuilder') {
      const scopeData = payload as QuoteSubmissionData;
      emailSubject = `⚡ [NEW LEAD] Scope Builder Submission: ${scopeData.name}`;
      formFields = {
        _subject: emailSubject,
        _template: 'table',
        _captcha: 'false',
        'Lead Type': 'Scope Builder Engine',
        'Client Name': scopeData.name,
        'Email Address': scopeData.email,
        'Business / Brand': scopeData.businessName || 'Not specified',
        'Monthly Volume Target': `${scopeData.deliverableVolume} Assets / Month`,
        'Management Preference': scopeData.managementLevel,
        'Estimated Monthly Range': scopeData.estimatedMin ? `$${scopeData.estimatedMin.toLocaleString()} - $${scopeData.estimatedMax?.toLocaleString()} / mo` : 'N/A',
        'Selected Services': scopeData.servicesSelected.join(', '),
        'Project Vision Notes': scopeData.notes || 'None provided',
        'Submission Timestamp': timestamp,
      };
    } else {
      const contactData = payload as ContactSubmissionData;
      emailSubject = `📩 [NEW LEAD] Direct Inquiry: ${contactData.name} (${contactData.serviceInterest})`;
      formFields = {
        _subject: emailSubject,
        _template: 'table',
        _captcha: 'false',
        'Lead Type': 'Executive Contact Inquiry',
        'Name': contactData.name,
        'Email Address': contactData.email,
        'Primary Interest': contactData.serviceInterest,
        'Message': contactData.message,
        'Submission Timestamp': timestamp,
      };
    }

    const response = await fetch(formSubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formFields),
    });

    if (response.ok) {
      console.log(`[Soul Lead Engine] Silent lead dispatch successful for ${type}`);
      return true;
    }
  } catch (err) {
    console.error('[Soul Lead Engine] Silent background dispatch error:', err);
  }

  return false;
};

export const triggerMailto = (subject: string, body: string): void => {
  const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
};
