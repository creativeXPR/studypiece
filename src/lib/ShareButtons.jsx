import { useState } from 'react';
import { copyLink, whatsappUrl } from './share';
import { CheckIcon, LinkIcon, WhatsAppIcon } from './icons';

export default function ShareButtons({ path, text, compact = false }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (await copyLink(path)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }

  return (
    <div className="share-buttons">
      <a
        className={`btn btn-outline btn-sm ${compact ? 'btn-icon' : ''}`}
        href={whatsappUrl(text, path)}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on WhatsApp"
      >
        <WhatsAppIcon size={16} /> {!compact && 'WhatsApp'}
      </a>
      <button className={`btn btn-outline btn-sm ${compact ? 'btn-icon' : ''}`} onClick={handleCopy} aria-label="Copy link">
        {copied ? <CheckIcon size={16} /> : <LinkIcon size={16} />} {!compact && (copied ? 'Copied' : 'Copy link')}
      </button>
    </div>
  );
}
