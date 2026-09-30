const WHATSAPP_NUMBER = "4916097813272";

export const GENERAL_WHATSAPP_MESSAGE = `Hi Hugo + Nanny!

We came across your work and love your style. Here's a little about us:

Names: [your names]
Wedding date + location: [date + location]
Looking for: [photo / video / both]
Budget: [approx.]

Looking forward to hearing from you!`;

export const ASIA_WHATSAPP_MESSAGE = `Hi Hugo + Nanny!

We're getting married in Asia between November and February and would love to know more about your Asia chapter.

Names: [your names]
Wedding date + location: [date + location]
Our idea: [a few words about your vision]

Looking forward to hearing from you!`;

export const getWhatsAppUrl = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const isMobile = typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  return isMobile
    ? `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`
    : `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
};