// `npm run icons` — redraws the favicon and the app icons in public/ from the brand mark
// (src/lib/logoArt.js). Run it after changing the mark.
import fs from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import { brandIconSvg, brandMarkSvg } from '../src/lib/logoArt.js';

const pub = path.resolve(import.meta.dirname, '../public');
const png = (svg, size) =>
  new Resvg(svg, { fitTo: { mode: 'width', value: size }, font: { loadSystemFonts: true, defaultFontFamily: 'Arial' } })
    .render()
    .asPng();

// Browser tab: the bare mark on a transparent background.
fs.writeFileSync(path.join(pub, 'favicon.svg'), brandMarkSvg().replace(' role="presentation"', '') + '\n');

// App icons: the blue mark on a transparent background.
fs.writeFileSync(path.join(pub, 'icon-192.png'), png(brandIconSvg({ size: 192 }), 192));
fs.writeFileSync(path.join(pub, 'icon-512.png'), png(brandIconSvg({ size: 512 }), 512));
// iOS and maskable icons turn transparency black, so they get white behind the mark
// (maskable also needs extra padding for the circular safe zone).
fs.writeFileSync(path.join(pub, 'apple-touch-icon.png'), png(brandIconSvg({ size: 180, padding: 0.12, background: '#ffffff' }), 180));
fs.writeFileSync(path.join(pub, 'icon-maskable-512.png'), png(brandIconSvg({ size: 512, padding: 0.2, background: '#ffffff' }), 512));

console.log('icons written to public/');
