const STORAGE_KEY = "drinkguide.history.v1";

export interface HistoryEntry {
  cocktailId: string;
  timestamp: number;
  note?: string;
}

export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryEntry[];
  } catch {
    return [];
  }
}

export function addEntry(cocktailId: string, note?: string): void {
  if (typeof window === "undefined") return;
  const entries = loadHistory();
  entries.unshift({ cocktailId, timestamp: Date.now(), note: note || undefined });
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function deleteEntry(timestamp: number): void {
  if (typeof window === "undefined") return;
  const entries = loadHistory().filter((e) => e.timestamp !== timestamp);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (minutes < 1) return "agora";
  if (minutes < 60) return `há ${minutes} min`;
  if (hours < 24) return `há ${hours}h`;
  if (days === 1) return "ontem";
  if (days < 7) return `há ${days} dias`;
  return new Date(timestamp).toLocaleDateString("pt-BR");
}
