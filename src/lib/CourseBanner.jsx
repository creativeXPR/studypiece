// A decorative banner for every course and tutorial. The artwork lives in bannerArt.js,
// shared with the build step that draws link-preview images, so shared links match the app.
import { useId } from 'react';
import { bannerSvg } from './bannerArt';
import './banner.css';

export default function CourseBanner({ code, size = 'hero', className = '' }) {
  // Unique gradient ids per copy, so a hidden copy can never take the colours of a visible one.
  const id = `bn${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <div
      className={`course-banner course-banner-${size} ${className}`}
      aria-hidden="true"
      // Trusted markup built from our own course codes (escaped in bannerArt.js).
      dangerouslySetInnerHTML={{ __html: bannerSvg(code, id) }}
    />
  );
}
