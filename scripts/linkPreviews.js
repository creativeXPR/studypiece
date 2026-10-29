// Build step: WhatsApp and other link previewers don't run JavaScript, so every course,
// question-set, tutorial and lesson URL gets its own static index.html carrying Open Graph
// tags, plus a 1200x630 PNG preview image drawn from the course's banner. Each preview says
// what the link is (practice tests, one practice test, a tutorial, a lesson). Firebase
// Hosting serves these files before falling back to the SPA rewrite, and the app then boots.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import { runnerImport } from 'vite';
import { courseSlug, setSlug } from '../src/data/slugs.js';
import { mergeCourses } from '../src/data/mergeCourses.js';
import { bannerBackdrop, bannerColors, bannerMotif } from '../src/lib/bannerArt.js';
import { brandMarkSvg } from '../src/lib/logoArt.js';
import { loadCourses } from './loadCourses.js';

const SITE_URL = (process.env.SITE_URL || 'https://studypiece.web.app').replace(/\/$/, '');
const FONT = 'Segoe UI, Inter, Arial, sans-serif';

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function wrap(text, max, maxLines) {
  const lines = [''];
  for (const word of text.split(/\s+/)) {
    const line = lines[lines.length - 1];
    if ((line + ' ' + word).trim().length > max && line) lines.push(word);
    else lines[lines.length - 1] = (line + ' ' + word).trim();
  }
  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines);
  kept[maxLines - 1] = `${kept[maxLines - 1].replace(/[,:;.]$/, '')}…`;
  return kept;
}

// The brand mark's shapes without its outer <svg>, coloured for a card background.
const logo = (c) => brandMarkSvg({ id: 'og-logo', onLight: false, textColor: c.from }).replace(/^<svg[^>]*>|<\/svg>$/g, '');

// The preview card: the course banner as background, its motif on the right, and on the left
// a pill saying what the link is, then the heading, a subheading and a footer line.
function imageSvg({ code, kind, heading, subheading, footer }) {
  const c = bannerColors(code);
  // Short headings (course codes) are big and sit beside the motif; long ones (lesson titles)
  // use the full width over a faded motif, in at most two lines plus one line of subheading.
  const big = heading.length <= 10;
  const headLines = big ? [heading] : wrap(heading, 30, 2);
  const headSize = big ? 120 : 64;
  const headGap = big ? 0 : 74;
  const headTop = big ? 330 : 300;
  const subTop = headTop + (headLines.length - 1) * headGap + (big ? 76 : 68);
  const sub = subheading ? wrap(subheading, big ? 26 : 44, big ? 2 : 1) : [];
  const pillW = Math.round(kind.length * 15.5 + 48);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  ${bannerBackdrop(code, 1200, 630, 'og')}
  <g transform="translate(-60 160) scale(2)" opacity="${big ? 0.95 : 0.3}">${bannerMotif(code, { labels: false })}</g>
  <g transform="translate(66 52) scale(1.15)">${logo(c)}</g>
  <text x="148" y="101" font-family="${FONT}" font-size="34" font-weight="700" fill="#fff">StudyPiece</text>
  <rect x="72" y="160" width="${pillW}" height="52" rx="26" fill="#fff"/>
  <text x="${72 + pillW / 2}" y="195" font-family="${FONT}" font-size="25" font-weight="800" fill="${c.from}" text-anchor="middle" letter-spacing="1.5">${escape(kind.toUpperCase())}</text>
  ${headLines
    .map((line, i) => `<text x="72" y="${headTop + i * headGap}" font-family="${FONT}" font-size="${headSize}" font-weight="800" fill="#fff">${escape(line)}</text>`)
    .join('\n  ')}
  ${sub
    .map((line, i) => `<text x="72" y="${subTop + i * 50}" font-family="${FONT}" font-size="42" font-weight="600" fill="#fff" fill-opacity="0.92">${escape(line)}</text>`)
    .join('\n  ')}
  <rect x="0" y="540" width="1200" height="90" fill="#000" fill-opacity="0.18"/>
  <text x="72" y="596" font-family="${FONT}" font-size="30" font-weight="600" fill="#fff">${escape(footer)}</text>
  <text x="1128" y="596" font-family="${FONT}" font-size="28" fill="#fff" fill-opacity="0.85" text-anchor="end">studypiece.web.app</text>
</svg>`;
}

function writePng(file, card) {
  const svg = imageSvg(card);
  const png = new Resvg(svg, { font: { loadSystemFonts: true, defaultFontFamily: 'Arial' } }).render().asPng();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, png);
  // A short content hash on the image URL makes apps refetch it when the card changes.
  return crypto.createHash('sha1').update(svg).digest('hex').slice(0, 8);
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
    `<meta property="og:image:alt" content="${escape(title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(title)}" />`,
    `<meta name="twitter:description" content="${escape(description)}" />`,
    `<meta name="twitter:image" content="${escape(image)}" />`,
  ].join('\n    ');
  return html
    .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escape(description)}" />`)
    .replace('</head>', `    ${tags}\n  </head>`);
}

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

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
    async closeBundle(error) {
      // If the app bundle itself failed, don't hide that error behind a missing index.html.
      if (error || !fs.existsSync(path.join(outDir, 'index.html'))) return;
      const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
      const courses = mergeCourses((await loadCourses(path.join(root, 'src/data/courses'))).map((c) => c.course));
      // Tutorial files use extensionless imports like the rest of the app, so load them through Vite.
      const { module: tutorialModule } = await runnerImport(path.join(root, 'src/data/tutorials/index.js'), { configFile: false, logLevel: 'error' });
      const { tutorials } = tutorialModule;
      let pages = 0;

      const page = (route, meta, card) => {
        const image = `/og/${route.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home'}.png`;
        const version = writePng(path.join(outDir, image), card);
        const html = withMeta(template, { ...meta, url: SITE_URL + route, image: `${SITE_URL}${image}?v=${version}` });
        const file = path.join(outDir, route, 'index.html');
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, html);
        pages++;
      };

      page(
        '/',
        {
          title: 'StudyPiece · CBT practice',
          description: 'Timed practice tests and step-by-step tutorials for your university courses, with a full explanation for every answer.',
        },
        { code: 'StudyPiece', kind: 'CBT practice', heading: 'StudyPiece', subheading: 'Practice tests and tutorials for your courses', footer: 'Every answer explained' },
      );

      for (const course of courses) {
        const cSlug = courseSlug(course.code);
        const total = course.sets.reduce((n, s) => n + s.questions.length, 0);
        const tutorial = tutorials[cSlug];
        const named = course.title ? `${course.code} (${course.title})` : course.code;
        page(
          `/course/${cSlug}`,
          {
            title: `${course.code}${course.title ? ` ${course.title}` : ''}: practice tests | StudyPiece`,
            description: `Timed practice tests for ${named}: ${plural(course.sets.length, 'set')}, ${total} questions, every answer explained.${tutorial ? ' Includes a step-by-step tutorial.' : ''}`,
          },
          {
            code: course.code,
            kind: 'Practice tests',
            heading: course.code,
            subheading: course.title || `${plural(course.sets.length, 'question set')}`,
            footer: `${plural(course.sets.length, 'set')} · ${total} questions · answers explained`,
          },
        );

        course.sets.forEach((set, i) => {
          const title = set.title || `Set ${i + 1}`;
          const n = set.questions.length;
          page(
            `/course/${cSlug}/${setSlug(set.id)}`,
            {
              title: `${course.code} · ${title}: ${n}-question practice test | StudyPiece`,
              description: `Timed ${n}-question test (${n} min) for ${named}, set ${i + 1} of ${course.sets.length}: ${title}. See your score and an explanation for every answer.`,
            },
            {
              code: course.code,
              kind: `Practice test · Set ${i + 1} of ${course.sets.length}`,
              heading: course.code,
              subheading: title,
              footer: `${n} questions · ${n} minutes · answers explained`,
            },
          );
        });
      }

      for (const tutorial of Object.values(tutorials)) {
        const ready = tutorial.chapters.flatMap((ch) => ch.lessons.filter((l) => l.sections).map((l) => ({ ...l, chapter: ch })));
        const chapters = tutorial.chapters.filter((ch) => ch.lessons.some((l) => l.sections));
        const topics = chapters.map((ch) => ch.title).join(', ');
        page(
          `/learn/${tutorial.slug}`,
          {
            title: `${tutorial.code} ${tutorial.title}: interactive tutorial | StudyPiece`,
            description: `Learn ${tutorial.code} step by step in ${plural(ready.length, 'short lesson')}, with questions along the way. Covers: ${topics}.`,
          },
          {
            code: tutorial.code,
            kind: 'Interactive tutorial',
            heading: tutorial.code,
            subheading: tutorial.title,
            footer: `${plural(ready.length, 'lesson')} · ${plural(chapters.length, 'chapter')} · learn step by step`,
          },
        );

        ready.forEach((lesson, i) => {
          page(
            `/learn/${tutorial.slug}/${lesson.id}`,
            {
              title: `${lesson.title}: ${tutorial.code} lesson | StudyPiece`,
              description: `Lesson ${i + 1} of ${ready.length} in the ${tutorial.code} interactive tutorial (${lesson.minutes} min, ${lesson.chapter.title}). Covers: ${lesson.covers}.`,
            },
            {
              code: tutorial.code,
              kind: `${tutorial.code} · Lesson ${i + 1} of ${ready.length}`,
              heading: lesson.title,
              subheading: lesson.chapter.title,
              footer: `${lesson.minutes} min · interactive lesson with questions`,
            },
          );
        });
      }

      console.log(`link previews: ${pages} pages written for ${SITE_URL}`);
    },
  };
}
