import fs from 'fs';
import path from 'path';

export interface Memory {
  id: string;
  url: string;
  title: string;
  category: "all" | "mehndi" | "barat" | "decor" | "behind-the-scenes" | "uncategorized";
  aspectRatio: "portrait" | "landscape" | "square";
  likes: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const DB_PATH = path.join(process.cwd(), 'data', 'memories.json');

function ensureDb() {
  if (!fs.existsSync(path.dirname(DB_PATH))) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    // Seed with some initial mock data that are approved
    const initialData: Memory[] = [
      { id: "m1", url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600", title: "Venue Setup", category: "decor", aspectRatio: "landscape", likes: 24, status: "approved", createdAt: new Date().toISOString() },
      { id: "m2", url: "https://images.unsplash.com/photo-1583939411023-14783179e581?q=80&w=400", title: "Bridal Details", category: "barat", aspectRatio: "portrait", likes: 56, status: "approved", createdAt: new Date().toISOString() },
    ];
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
  }
}

export function getMemories(): Memory[] {
  try {
    ensureDb();
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading memories:", error);
    return [];
  }
}

export function saveMemories(memories: Memory[]) {
  try {
    ensureDb();
    fs.writeFileSync(DB_PATH, JSON.stringify(memories, null, 2));
  } catch (error) {
    console.error("Error saving memories:", error);
  }
}
