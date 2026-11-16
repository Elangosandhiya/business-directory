/**
 * Clean phone string for tel: link
 */
export const getPhoneLink = (phone) => {
  if (!phone) return '#';
  const cleaned = phone.replace(/[^\d+]/g, '');
  return `tel:${cleaned}`;
};

/**
 * Format WhatsApp click-to-chat URL
 */
export const getWhatsAppLink = (whatsapp, businessName = '') => {
  if (!whatsapp) return '#';
  // Remove non-digit characters
  const cleaned = whatsapp.replace(/\D/g, '');
  const message = encodeURIComponent(
    `Hello! I found ${businessName} on the Kovai Business Directory and would like to inquire about your services.`
  );
  return `https://wa.me/${cleaned}?text=${message}`;
};

/**
 * Extract clean display host from URL
 */
export const getCleanUrl = (url) => {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, '');
  } catch (e) {
    return url;
  }
};

/**
 * Safely truncate long descriptions
 */
export const truncateText = (text, maxLength = 120) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};
