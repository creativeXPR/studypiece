// Accounts that may open /admin. Must match isAdmin() in firestore.rules,
// which is what actually grants the data access.
export const ADMIN_EMAILS = ['adedamolar96@gmail.com', 'adedamolarichard79@gmail.com'];

export function isAdminUser(user) {
  return !!user?.emailVerified && ADMIN_EMAILS.includes(user.email);
}
