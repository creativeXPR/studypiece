export function absoluteUrl(path) {
  return new URL(path, window.location.origin).href;
}

export function whatsappUrl(text, path) {
  return `https://wa.me/?text=${encodeURIComponent(`${text}\n${absoluteUrl(path)}`)}`;
}

export async function copyLink(path) {
  const url = absoluteUrl(path);
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    window.prompt('Copy this link:', url);
    return false;
  }
}
