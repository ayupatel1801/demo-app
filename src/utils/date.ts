export function getTodayKey(): string {
  const d = new Date();
  return d.toISOString().slice(0,10);
}

export function getYesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate()-1);
  return d.toISOString().slice(0,10);
}
