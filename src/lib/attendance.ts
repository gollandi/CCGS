export type Registration = { firstName: string; lastName: string; dietary: string; dietaryConsent: boolean; requestId: string };
export type Guest = { id: string; firstName: string; lastName: string; dietary: string; status: 'confirmed' | 'cancelled'; createdAt: string; updatedAt: string; version: number };
export class InputError extends Error {}
export function validateRegistration(value: unknown): Registration {
  if (!value || typeof value !== 'object') throw new InputError('Please complete your name.');
  const v = value as Record<string, unknown>;
  const clean = (field: string, limit: number, required = false) => {
    if (typeof v[field] !== 'string') throw new InputError('Please check the form and try again.');
    const text = (v[field] as string).normalize('NFC').trim();
    if ((required && !text) || text.length > limit || /[\u0000-\u0008\u000b-\u001f\u007f]/u.test(text)) throw new InputError(`Please check ${field === 'dietary' ? 'your dietary requirements (maximum 500 characters)' : 'your name (maximum 80 characters per field)'}.`);
    return text;
  };
  const firstName = clean('firstName', 80, true), lastName = clean('lastName', 80, true), dietary = clean('dietary', 500);
  if (dietary && v.dietaryConsent !== true) throw new InputError('Please confirm that we may use your dietary requirements to arrange your meal.');
  if (typeof v.requestId !== 'string' || !/^[\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12}$/i.test(v.requestId)) throw new InputError('Please reload the form and try again.');
  return { firstName, lastName, dietary, dietaryConsent: !!dietary && v.dietaryConsent === true, requestId: v.requestId };
}
export function guestsCsv(guests: Guest[]) {
  const cell = (value: string) => '"' + (/^[\s]*[=+@-]/.test(value) ? "'" + value : value).replaceAll('"', '""') + '"';
  return '\ufeff' + [['First name', 'Last name', 'Dietary requirements', 'Status', 'Received'], ...guests.map(g => [g.firstName, g.lastName, g.dietary, g.status, g.createdAt])].map(row => row.map(cell).join(',')).join('\r\n');
}
