import { PDFDocument } from "pdf-lib";
import { readFileBuffer, saveBuffer, type StoredFile } from "@/lib/storage";

export type ConvertAction =
  | "compress"
  | "merge"
  | "split"
  | "pdf-to-txt"
  | "images-to-pdf";

export type ConvertOptions = {
  from?: number;
  to?: number;
};

const isPdf = (file: StoredFile) =>
  file.mime === "application/pdf" || file.filename.toLowerCase().endsWith(".pdf");

const isImage = (file: StoredFile) =>
  file.mime.startsWith("image/") ||
  file.filename.toLowerCase().match(/\.(png|jpg|jpeg)$/);

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export async function convertFiles(
  action: ConvertAction,
  files: StoredFile[],
  options: ConvertOptions = {}
) {
  switch (action) {
    case "merge":
      return mergePdfs(files);
    case "split":
      return splitPdf(files[0], options);
    case "pdf-to-txt":
      return pdfToTxt(files[0]);
    case "images-to-pdf":
      return imagesToPdf(files);
    case "compress":
    default:
      return compressPdf(files[0]);
  }
}

export function validateFiles(action: ConvertAction, files: StoredFile[]) {
  if (files.length === 0) {
    return "No files uploaded.";
  }

  if (action === "merge" || action === "compress" || action === "split") {
    if (!files.every(isPdf)) {
      return "This action only supports PDF files.";
    }
  }

  if (action === "merge" && files.length < 2) {
    return "Merge requires at least 2 PDF files.";
  }

  if ((action === "compress" || action === "split" || action === "pdf-to-txt") && files.length > 1) {
    return "This action supports a single file at a time.";
  }

  if (action === "pdf-to-txt") {
    if (!isPdf(files[0])) {
      return "PDF to TXT requires a PDF input.";
    }
  }

  if (action === "images-to-pdf") {
    if (!files.every(isImage)) {
      return "Images to PDF requires PNG or JPG files.";
    }
  }

  return null;
}

async function mergePdfs(files: StoredFile[]) {
  const output = await PDFDocument.create();

  for (const file of files) {
    const buffer = await readFileBuffer(file.id);
    if (!buffer) continue;
    const src = await PDFDocument.load(buffer);
    const pages = await output.copyPages(src, src.getPageIndices());
    pages.forEach((page) => output.addPage(page));
  }

  const bytes = await output.save({ useObjectStreams: true });
  return saveBuffer({
    buffer: Buffer.from(bytes),
    filename: "merged.pdf",
    mime: "application/pdf",
    sourceIds: files.map((file) => file.id)
  });
}

async function splitPdf(file: StoredFile, options: ConvertOptions) {
  const buffer = await readFileBuffer(file.id);
  if (!buffer) {
    throw new Error("Missing source file.");
  }

  const src = await PDFDocument.load(buffer);
  const pageCount = src.getPageCount();
  const rawFrom = typeof options.from === "number" ? options.from : Number(options.from ?? 1);
  const rawTo = typeof options.to === "number" ? options.to : Number(options.to ?? rawFrom);
  const from = clamp(rawFrom || 1, 1, pageCount);
  const to = clamp(rawTo || from, from, pageCount);

  const output = await PDFDocument.create();
  const indices = Array.from(
    { length: to - from + 1 },
    (_, i) => from - 1 + i
  );
  const pages = await output.copyPages(src, indices);
  pages.forEach((page) => output.addPage(page));

  const bytes = await output.save({ useObjectStreams: true });
  const base = file.filename.replace(/\.pdf$/i, "");
  const filename = `${base}-pages-${from}-${to}.pdf`;

  return saveBuffer({
    buffer: Buffer.from(bytes),
    filename,
    mime: "application/pdf",
    sourceIds: [file.id]
  });
}

async function compressPdf(file: StoredFile) {
  const buffer = await readFileBuffer(file.id);
  if (!buffer) {
    throw new Error("Missing source file.");
  }

  const pdf = await PDFDocument.load(buffer);
  const bytes = await pdf.save({ useObjectStreams: true });
  const base = file.filename.replace(/\.pdf$/i, "");

  return saveBuffer({
    buffer: Buffer.from(bytes),
    filename: `${base}-compressed.pdf`,
    mime: "application/pdf",
    sourceIds: [file.id]
  });
}

async function pdfToTxt(file: StoredFile) {
  throw new Error(
    "PDF to TXT is temporarily unavailable. Enable a text-extraction library to use this action."
  );
}

async function imagesToPdf(files: StoredFile[]) {
  const output = await PDFDocument.create();

  for (const file of files) {
    const buffer = await readFileBuffer(file.id);
    if (!buffer) continue;

    const isPng =
      file.mime === "image/png" || file.filename.toLowerCase().endsWith(".png");

    const image = isPng
      ? await output.embedPng(buffer)
      : await output.embedJpg(buffer);

    const { width, height } = image.scale(1);
    const page = output.addPage([width, height]);
    page.drawImage(image, { x: 0, y: 0, width, height });
  }

  const bytes = await output.save({ useObjectStreams: true });
  return saveBuffer({
    buffer: Buffer.from(bytes),
    filename: "images-to-pdf.pdf",
    mime: "application/pdf",
    sourceIds: files.map((file) => file.id)
  });
}
