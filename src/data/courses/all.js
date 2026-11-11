// Every course with all its questions, for the build scripts and the catalogue
// (scripts/catalog.js). The app never imports this: it reads the catalogue and loads
// one course at a time through ./index.js.
import { mergeCourses } from '../mergeCourses.js';
import { byNewest, shapeCourse } from '../courseShape.js';

const modules = import.meta.glob(['./*.js', './*.json', '!./index.js', '!./all.js'], { eager: true, import: 'default' });

// Sort by name without extension so "ges201.js" comes before "ges201-extra.json".
const stem = (file) => file.replace(/\.(js|json)$/, '');
const files = Object.keys(modules).sort((a, b) => stem(a).localeCompare(stem(b)));

export const courses = mergeCourses(files.map((file) => modules[file])).map(shapeCourse).sort(byNewest);

// Which files make up each course, in merge order: { 'GES 103': ['./ges103.js', './ges103-gaps.json'] }.
export const courseFiles = {};
for (const file of files) (courseFiles[modules[file].code] ??= []).push(file);
