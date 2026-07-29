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
const WEB3FORMS_ACCESS_KEY = '5c82e491-b06f-4b55-8fa1-76d30ba092e0';

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
 * Automatically sends lead payload to soulmediagroup.info@gmail.com via Web3Forms API.
 * Saves entries to local browser vault.
 * Zero popups, zero redirects, zero UI impact for the prospect.
 */
export const sendLeadPayloadBackground = async (
  type: 'ScopeBuilder' | 'ContactForm',
  payload: QuoteSubmissionData | ContactSubmissionData
): Promise<boolean> => {
  const timestamp = new Date().toLocaleString();
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

  // 2. Format Web3Forms Payload
  let emailSubject = '';
  let formFields: Record<string, any> = {
    access_key: WEB3FORMS_ACCESS_KEY,
    from_name: 'Soul Media Lead Engine',
    botcheck: '',
  };

  if (type === 'ScopeBuilder') {
    const scopeData = payload as QuoteSubmissionData;
    emailSubject = `⚡ [NEW LEAD] Scope Builder Submission: ${scopeData.name}`;
    formFields = {
      ...formFields,
      subject: emailSubject,
      name: scopeData.name,
      email: scopeData.email,
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
      ...formFields,
      subject: emailSubject,
      name: contactData.name,
      email: contactData.email,
      'Lead Type': 'Executive Contact Inquiry',
      'Name': contactData.name,
      'Email Address': contactData.email,
      'Primary Interest': contactData.serviceInterest,
      'Message': contactData.message,
      'Submission Timestamp': timestamp,
    };
  }

  // 3. Primary Web3Forms Direct API Dispatch
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formFields),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`[Soul Lead Engine] Web3Forms lead dispatch successful:`, result);
      return true;
    }
  } catch (err) {
    console.warn('[Soul Lead Engine] Web3Forms API dispatch warning:', err);
  }

  // 4. Secondary Channel: FormSubmit Fallback
  try {
    const formSubmitUrl = `https://formsubmit.co/ajax/${TARGET_EMAIL}`;
    const response = await fetch(formSubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ _subject: emailSubject, ...formFields }),
    });

    if (response.ok) {
      console.log(`[Soul Lead Engine] FormSubmit fallback successful`);
      return true;
    }
  } catch (err) {
    console.warn('[Soul Lead Engine] FormSubmit fallback warning:', err);
  }

  return false;
};

export const triggerMailto = (subject: string, body: string): void => {
  const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
};
