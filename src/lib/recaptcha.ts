const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const SCORE_THRESHOLD = 0.5;

export async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.warn('RECAPTCHA_SECRET_KEY not set, skipping verification');
    return true; // Allow in development
  }

  try {
    const response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    });

    const data = await response.json();
    return data.success && data.score >= SCORE_THRESHOLD;
  } catch {
    console.error('reCAPTCHA verification failed');
    return false;
  }
}
