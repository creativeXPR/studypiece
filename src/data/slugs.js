// URL ids, shared by the app and the build step that writes link-preview pages.
// "GES 201" -> "ges201", "QS003" -> "qs003"
export const courseSlug = (code) => code.replace(/\s+/g, '').toLowerCase();
export const setSlug = (id) => id.toLowerCase();
