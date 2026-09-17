import { Property, PropertyRequest, InspectionRequest } from '../types';

export const formatPhoneNumber = (phone: string): string => {
  // Clean non-digits
  let cleaned = phone.replace(/\D/g, '');
  // If Nigerian format starting with 0, convert 08... to 2348...
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = '234' + cleaned.substring(1);
  } else if (!cleaned.startsWith('234') && cleaned.length === 10) {
    cleaned = '234' + cleaned;
  }
  return cleaned;
};

export const formatCurrency = (amount: number, currency: 'NGN' | 'USD' | 'GBP' = 'NGN'): string => {
  if (currency === 'NGN') {
    return '₦' + amount.toLocaleString('en-NG');
  } else if (currency === 'USD') {
    return '$' + amount.toLocaleString('en-US');
  } else {
    return '£' + amount.toLocaleString('en-GB');
  }
};

export const createPropertyEnquiryWhatsAppUrl = (
  property: Property,
  client: { name: string; phone: string; email?: string; message?: string },
  destinationNumber: string = '+2347033385434'
): string => {
  const formattedPrice = formatCurrency(property.price, property.currency);
  const text = `Hello Estate Shelters,

I am interested in the following property:

Property: ${property.title}
Property ID: ${property.property_id}
Location: ${property.location || property.district}
Price: ${formattedPrice}

My details:
Name: ${client.name}
Phone: ${client.phone}
${client.email ? `Email: ${client.email}` : ''}
${client.message ? `\nNote / Question: ${client.message}` : ''}

I would like to receive more information about this property.

Thank you.`;

  const target = formatPhoneNumber(destinationNumber);
  return `https://wa.me/${target}?text=${encodeURIComponent(text)}`;
};

export const createInspectionWhatsAppUrl = (
  param1: any,
  param2?: any,
  destinationNumber: string = '+2347033385434'
): string => {
  let propertyTitle = 'Abuja Property';
  let clientName = 'Client';
  let clientPhone = '';
  let date = '';
  let time = '';
  let type = 'Physical Site Tour';
  let dest = destinationNumber;

  if (param2 && typeof param2 === 'object') {
    // Called as (property, clientData, dest)
    propertyTitle = param1?.title || param1?.property_id || 'Property';
    clientName = param2.name || 'Client';
    clientPhone = param2.phone || '';
    date = param2.date || '';
    time = param2.time || '';
    type = param2.type || 'Physical Site Tour';
    if (typeof destinationNumber === 'string') dest = destinationNumber;
  } else {
    // Called as (inspectionRequest, dest)
    propertyTitle = param1?.property_title || param1?.property_id || 'Property';
    clientName = param1?.name || param1?.client_name || 'Client';
    clientPhone = param1?.phone || param1?.client_phone || '';
    date = param1?.date || param1?.preferred_date || '';
    time = param1?.time || param1?.preferred_time || param1?.time_slot || '10:00 AM';
    type = param1?.inspection_type || 'Physical Site Tour';
    if (typeof param2 === 'string') dest = param2;
  }

  const text = `Hello Estate Shelters,

I would like to schedule a site inspection:

Property: ${propertyTitle}
Date: ${date}
Time: ${time}
Type: ${type}

Client Details:
Name: ${clientName}
Phone: ${clientPhone}

Please confirm this site inspection schedule.

Thank you.`;

  const target = formatPhoneNumber(dest);
  return `https://wa.me/${target}?text=${encodeURIComponent(text)}`;
};

export const createInspectionBookingWhatsAppUrl = createInspectionWhatsAppUrl;

export const createFindPropertyWhatsAppUrl = (
  request: any,
  destinationNumber: string = '+2347033385434'
): string => {
  const text = `Hello Estate Shelters Market Analysis Department (MAD),

I would like your assistance in finding a property in Abuja:

Client: ${request.name} (${request.phone})
${request.email ? `Email: ${request.email}\n` : ''}
REQUIREMENTS:
- Districts: ${request.preferred_districts || request.preferred_area || 'Flexible in Abuja'}
- Property Type: ${request.property_type || 'Any'}
- Bedrooms: ${request.bedrooms || 'Any'}
- Target Budget: ${request.budget_range || `${formatCurrency(request.budget_min || 0)} - ${formatCurrency(request.budget_max || 0)}`}
- Purpose: ${request.purpose || 'Investment / Living'}
${request.notes || request.message ? `Notes: ${request.notes || request.message}` : ''}

Please share matching verified properties.

Thank you.`;

  const target = formatPhoneNumber(destinationNumber);
  return `https://wa.me/${target}?text=${encodeURIComponent(text)}`;
};

export const createPropertyRequestWhatsAppUrl = createFindPropertyWhatsAppUrl;

export const createGeneralWhatsAppUrl = (
  subject: string,
  destinationNumber: string = '+2347033385434'
): string => {
  const text = `Hello Estate Shelters,

I am visiting your website and would like to speak with a property consultant regarding: ${subject}.

Please connect me with an agent.

Thank you.`;

  const target = formatPhoneNumber(destinationNumber);
  return `https://wa.me/${target}?text=${encodeURIComponent(text)}`;
};

export const getGeneralConsultationWhatsAppUrl = (
  destinationNumber: string = '+2347033385434'
): string => {
  const text = `Hello Estate Shelters Ltd,

I would like to inquire about verified properties, cadastral land titles, and scheduled site inspections in Abuja.

Please connect me with a senior advisor.`;

  const target = formatPhoneNumber(destinationNumber);
  return `https://wa.me/${target}?text=${encodeURIComponent(text)}`;
};
