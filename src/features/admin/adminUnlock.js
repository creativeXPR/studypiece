// Admin passkey check. The unlock lasts for this browser tab only (sessionStorage).
// SHA-256 of the admin passkey, so the passkey itself isn't readable in the shipped code.
const PASSKEY_HASH = '85fdf2605abceefbfdfc8597b8da227d70d9b2bfaf2c83957d223a3ae2167b24';
const UNLOCK_KEY = 'studypiece.adminUnlocked';

async function sha256(text) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function isUnlocked() {
  try {
    return sessionStorage.getItem(UNLOCK_KEY) === '1';
  } catch {
    return false;
  }
}

export function lock() {
  try {
    sessionStorage.removeItem(UNLOCK_KEY);
  } catch {
    // nothing stored
  }
}

export async function checkPasskey(passkey) {
  return (await sha256(passkey.trim())) === PASSKEY_HASH;
}

export function rememberUnlock() {
  try {
    sessionStorage.setItem(UNLOCK_KEY, '1');
  } catch {
    // Unlock just won't survive a reload.
  }
}
