// Build step: WhatsApp and other link previewers don't run JavaScript, so every
// course and question-set URL gets its own static index.html carrying Open Graph
// tags, plus a 1200x630 PNG preview image. Firebase Hosting serves these files
// before falling back to the SPA rewrite, and the app then boots normally.
import fs from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import { courseSlug, setSlug } from '../src/data/slugs.js';
import { mergeCourses } from '../src/data/mergeCourses.js';
import { loadCourses } from './loadCourses.js';

const SITE_URL = (process.env.SITE_URL || 'https://studypiece.web.app').replace(/\/$/, '');

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function wrap(text, max) {
  const lines = [''];
  for (const word of text.split(/\s+/)) {
    const line = lines[lines.length - 1];
    if ((line + ' ' + word).trim().length > max && line) lines.push(word);
    else lines[lines.length - 1] = (line + ' ' + word).trim();
  }
  return lines.length > 2 ? [lines[0], `${lines[1]}…`] : lines;
}

function imageSvg({ eyebrow, heading, subheading, footer }) {
  const sub = subheading ? wrap(subheading, 34) : [];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f6f7f9"/>
  <rect width="1200" height="630" fill="#2563eb" opacity="0.06"/>
  <rect x="0" y="0" width="16" height="630" fill="#2563eb"/>
  <rect x="80" y="72" width="64" height="64" rx="16" fill="#2563eb"/>
  <text x="112" y="115" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="800" fill="#fff" text-anchor="middle">SP</text>
  <text x="164" y="115" font-family="Segoe UI, Arial, sans-serif" font-size="32" font-weight="700" fill="#15181e">StudyPiece</text>
  <text x="80" y="226" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="600" fill="#5b6472" letter-spacing="2">${escape(eyebrow.toUpperCase())}</text>
  <text x="80" y="330" font-family="Segoe UI, Arial, sans-serif" font-size="104" font-weight="800" fill="#15181e">${escape(heading)}</text>
  ${sub
    .map(
      (line, i) =>
        `<text x="80" y="${410 + i * 58}" font-family="Segoe UI, Arial, sans-serif" font-size="48" font-weight="600" fill="#2563eb">${escape(line)}</text>`,
    )
    .join('\n  ')}
  <text x="80" y="566" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#5b6472">${escape(footer)}</text>
</svg>`;
}

function writePng(file, card) {
  const png = new Resvg(imageSvg(card), {
    font: { loadSystemFonts: true, defaultFontFamily: 'Arial' },
  })
    .render()
    .asPng();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, png);
}

function withMeta(html, { title, description, url, image }) {
  const tags = [
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="StudyPiece" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    `<meta property="og:url" content="${escape(url)}" />`,
    `<meta property="og:image" content="${escape(image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join('\n    ');
  return html
    .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escape(description)}" />`)
    .replace('</head>', `    ${tags}\n  </head>`);
}

export default function linkPreviews() {
  let outDir;
  let root;
  return {
    name: 'studypiece-link-previews',
    apply: 'build',
    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
      const courses = mergeCourses((await loadCourses(path.join(root, 'src/data/courses'))).map((c) => c.course));
      let pages = 0;

      const page = (route, meta, card) => {
        const image = `/og/${route.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home'}.png`;
        writePng(path.join(outDir, image), card);
        const html = withMeta(template, { ...meta, url: SITE_URL + route, image: SITE_URL + image });
        const file = path.join(outDir, route, 'index.html');
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, html);
        pages++;
      };

      page(
        '/',
        {
          title: 'StudyPiece · CBT practice',
          description: 'Timed practice tests for your university courses, with a full explanation for every answer.',
        },
        { eyebrow: 'CBT practice', heading: 'StudyPiece', subheading: 'Practice tests with explanations', footer: 'studypiece.web.app' },
      );

      for (const course of courses) {
        const cSlug = courseSlug(course.code);
        const total = course.sets.reduce((n, s) => n + s.questions.length, 0);
        page(
          `/course/${cSlug}`,
          {
            title: `${course.code}${course.title ? ` · ${course.title}` : ''} | StudyPiece`,
            description: `${course.sets.length} practice tests · ${total} questions with explanations.`,
          },
          {
            eyebrow: 'Practice tests',
            heading: course.code,
            subheading: course.title || `${course.sets.length} question sets`,
            footer: `${course.sets.length} sets · ${total} questions · answers explained`,
          },
        );

        course.sets.forEach((set, i) => {
          const title = set.title || `Set ${i + 1}`;
          const n = set.questions.length;
          page(
            `/course/${cSlug}/${setSlug(set.id)}`,
            {
              title: `${course.code} · ${title} | StudyPiece`,
              description: `${n}-question practice test (${n} min). Check your score and see the explanation for every answer.`,
            },
            {
              eyebrow: `${course.code} · Set ${i + 1} of ${course.sets.length}`,
              heading: course.code,
              subheading: title,
              footer: `${n} questions · ${n} minutes · answers explained`,
            },
          );
        });
      }

      console.log(`link previews: ${pages} pages written for ${SITE_URL}`);
    },
  };
}
