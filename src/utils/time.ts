export const isDueWithin24h = (iso?: string) => {
  if (!iso) return false;
  const due = new Date(iso).getTime();
  const now = Date.now();
  return due > now && due - now <= 24 * 60 * 60 * 1000;
};
