// A decorative banner for every course and tutorial. The artwork lives in bannerArt.js,
// shared with the build step that draws link-preview images, so shared links match the app.
import { bannerSvg } from './bannerArt';
import './banner.css';

export default function CourseBanner({ code, size = 'hero', className = '' }) {
  return (
    <div
      className={`course-banner course-banner-${size} ${className}`}
      aria-hidden="true"
      // Trusted markup built from our own course codes (escaped in bannerArt.js).
      dangerouslySetInnerHTML={{ __html: bannerSvg(code) }}
    />
  );
}
