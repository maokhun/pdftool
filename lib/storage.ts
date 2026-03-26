import { promises as fs } from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";

export type StoredFile = {
  id: string;
  path: string;
  filename: string;
  mime: string;
  size: number;
  createdAt: number;
  kind: "upload" | "converted";
  sourceIds?: string[];
};

const storageRoot = path.join(os.tmpdir(), "pdf-tools");
const index = new Map<string, StoredFile>();

async function ensureStorageRoot() {
  await fs.mkdir(storageRoot, { recursive: true });
}

function metadataPath(id: string) {
  return path.join(storageRoot, `${id}.json`);
}

function safeFilename(name: string, fallback: string) {
  const base = name?.trim() ? name : fallback;
  return base.replace(/[^a-zA-Z0-9._-]/g, "_");
}

async function writeMetadata(stored: StoredFile) {
  await fs.writeFile(metadataPath(stored.id), JSON.stringify(stored), "utf8");
}

async function readMetadata(id: string) {
  try {
    const raw = await fs.readFile(metadataPath(id), "utf8");
    const parsed = JSON.parse(raw) as StoredFile;
    if (!parsed?.id || !parsed?.path) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function saveTempFiles(files: File[]) {
  await ensureStorageRoot();
  const storedFiles: StoredFile[] = [];

  for (const file of files) {
    const id = crypto.randomUUID();
    const filename = safeFilename(file.name || "upload", "upload");
    const filePath = path.join(storageRoot, `${id}-${filename}`);
    const bytes = Buffer.from(await file.arrayBuffer());

    await fs.writeFile(filePath, bytes);

    const stored: StoredFile = {
      id,
      path: filePath,
      filename,
      mime: file.type || "application/octet-stream",
      size: bytes.length,
      createdAt: Date.now(),
      kind: "upload"
    };

    index.set(id, stored);
    await writeMetadata(stored);
    storedFiles.push(stored);
  }

  return storedFiles;
}

export async function saveBuffer({
  buffer,
  filename,
  mime,
  sourceIds
}: {
  buffer: Buffer;
  filename: string;
  mime: string;
  sourceIds?: string[];
}) {
  await ensureStorageRoot();
  const id = crypto.randomUUID();
  const safeName = safeFilename(filename, `output-${id}`);
  const filePath = path.join(storageRoot, `${id}-${safeName}`);

  await fs.writeFile(filePath, buffer);

  const stored: StoredFile = {
    id,
    path: filePath,
    filename: safeName,
    mime,
    size: buffer.length,
    createdAt: Date.now(),
    kind: "converted",
    sourceIds
  };

  index.set(id, stored);
  await writeMetadata(stored);
  return stored;
}

export async function getFileMeta(id: string) {
  const cached = index.get(id);
  if (cached) return cached;

  const stored = await readMetadata(id);
  if (stored) {
    index.set(id, stored);
  }
  return stored ?? null;
}

export async function getFiles(ids: string[]) {
  const files: StoredFile[] = [];
  for (const id of ids) {
    const file = await getFileMeta(id);
    if (!file) {
      return null;
    }
    files.push(file);
  }
  return files;
}

export async function readFileBuffer(id: string) {
  const stored = await getFileMeta(id);
  if (!stored) return null;
  const buffer = await fs.readFile(stored.path);
  return buffer;
}
