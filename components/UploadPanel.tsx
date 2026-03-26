"use client";

import { useRef, useState, type DragEvent } from "react";
import { CompressIcon } from "@/components/icons";

type Status = "idle" | "uploading" | "processing" | "done" | "error";

type Action =
  | "compress"
  | "merge"
  | "split"
  | "pdf-to-txt"
  | "images-to-pdf";

type ActionConfig = {
  label: string;
  accept: string;
  multiple: boolean;
  helper: string;
};

const actionConfig: Record<Action, ActionConfig> = {
  compress: {
    label: "Compress PDF",
    accept: "application/pdf",
    multiple: false,
    helper: "PDF only, up to 20MB"
  },
  merge: {
    label: "Merge PDFs",
    accept: "application/pdf",
    multiple: true,
    helper: "Select 2+ PDFs to merge"
  },
  split: {
    label: "Split PDF (page range)",
    accept: "application/pdf",
    multiple: false,
    helper: "Extract specific pages"
  },
  "pdf-to-txt": {
    label: "PDF to TXT",
    accept: "application/pdf",
    multiple: false,
    helper: "Extract text from PDF"
  },
  "images-to-pdf": {
    label: "Images to PDF",
    accept: "image/png,image/jpeg",
    multiple: true,
    helper: "PNG or JPG files"
  }
};

function isAllowedFile(file: File, action: Action) {
  if (action === "images-to-pdf") {
    return (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      /\.(png|jpg|jpeg)$/i.test(file.name)
    );
  }
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

export default function UploadPanel() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [action, setAction] = useState<Action>("compress");
  const [pageFrom, setPageFrom] = useState(1);
  const [pageTo, setPageTo] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const config = actionConfig[action];

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 3200);
  };

  const resetStatus = () => {
    setProgress(0);
    setStatus("idle");
    setDownloadUrl(null);
    setSelectedFiles([]);
  };

  const selectFiles = (files: File[]) => {
    if (!files.length) return;

    const filtered = files.filter((file) => isAllowedFile(file, action));
    if (!filtered.length) {
      setStatus("error");
      showToast("Unsupported file type for this action.");
      return;
    }

    const selected = config.multiple ? filtered : [filtered[0]];
    setSelectedFiles(selected);
    setStatus("idle");
    setProgress(0);
    setDownloadUrl(null);
    showToast(`${selected.length} file${selected.length > 1 ? "s" : ""} ready`);
  };

  const handleUpload = (files: File[]) => {
    if (!files.length) {
      showToast("Please choose files first.");
      return;
    }

    const filtered = files.filter((file) => isAllowedFile(file, action));
    if (!filtered.length) {
      setStatus("error");
      showToast("Unsupported file type for this action.");
      return;
    }

    const selected = config.multiple ? filtered : [filtered[0]];

    if (action === "merge" && selected.length < 2) {
      setStatus("error");
      showToast("Please select at least two PDFs to merge.");
      return;
    }

    setStatus("uploading");
    setProgress(0);
    setDownloadUrl(null);

    const formData = new FormData();
    selected.forEach((file) => formData.append("file", file));

    const request = new XMLHttpRequest();
    request.open("POST", "/api/upload", true);

    request.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        setProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    request.onload = async () => {
      if (request.status !== 200) {
        setStatus("error");
        showToast("Upload failed. Please try again.");
        return;
      }

      const response = JSON.parse(request.responseText);
      const items = Array.isArray(response.items) ? response.items : [];

      if (!items.length) {
        setStatus("error");
        showToast("No files stored. Please retry.");
        return;
      }

      setStatus("processing");

      const convertBody: Record<string, unknown> = {
        action,
        ids: items.map((item: { id: string }) => item.id)
      };

      if (action === "split") {
        convertBody.options = { from: pageFrom, to: pageTo };
      }

      const convertResponse = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(convertBody)
      });

      if (!convertResponse.ok) {
        const data = await convertResponse.json().catch(() => ({}));
        setStatus("error");
        showToast(data.error || "Conversion failed. Please retry.");
        return;
      }

      const data = await convertResponse.json();
      setStatus("done");
      setProgress(100);
      setDownloadUrl(`/api/download/${data.id}`);
      showToast("Your file is ready to download.");
    };

    request.onerror = () => {
      setStatus("error");
      showToast("Network error. Please retry.");
    };

    request.send(formData);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    const droppedFiles = Array.from(event.dataTransfer.files || []);
    selectFiles(droppedFiles);
  };

  return (
    <div className="relative rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-soft dark:border-slate-700/70 dark:bg-slate-950/70">
      {toast && (
        <div className="toast absolute right-4 top-4 rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-soft">
          {toast}
        </div>
      )}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Quick Conversion
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Choose an action and drop files below.
            </p>
          </div>
          <select
            value={action}
            onChange={(event) => {
              setAction(event.target.value as Action);
              resetStatus();
            }}
            className="rounded-full border border-slate-200/70 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-soft dark:border-slate-700/70 dark:bg-slate-950 dark:text-slate-200"
          >
            {Object.entries(actionConfig).map(([value, item]) => (
              <option key={value} value={value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {action === "split" && (
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <label className="flex items-center gap-2">
              From
              <input
                type="number"
                min={1}
                value={pageFrom}
                onChange={(event) => setPageFrom(Number(event.target.value) || 1)}
                className="w-20 rounded-full border border-slate-200/70 bg-white px-3 py-1 text-xs text-slate-700 shadow-soft outline-none dark:border-slate-700/70 dark:bg-slate-950 dark:text-slate-200"
              />
            </label>
            <label className="flex items-center gap-2">
              To
              <input
                type="number"
                min={1}
                value={pageTo}
                onChange={(event) => setPageTo(Number(event.target.value) || 1)}
                className="w-20 rounded-full border border-slate-200/70 bg-white px-3 py-1 text-xs text-slate-700 shadow-soft outline-none dark:border-slate-700/70 dark:bg-slate-950 dark:text-slate-200"
              />
            </label>
          </div>
        )}
      </div>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`mt-4 flex flex-col items-center gap-4 rounded-2xl border border-dashed px-6 py-8 text-center transition ${
          dragActive
            ? "border-indigo-400 bg-indigo-50/50 dark:border-indigo-400/70 dark:bg-indigo-500/10"
            : "border-slate-200/70 bg-white dark:border-slate-700/60 dark:bg-slate-950/40"
        }`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600">
          <CompressIcon className="h-7 w-7" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Drag & drop your files here
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {config.helper}
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold text-white shadow-soft transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-900"
          >
            Choose File{config.multiple ? "s" : ""}
          </button>
          <button
            type="button"
            onClick={() => handleUpload(selectedFiles)}
            disabled={status === "uploading" || status === "processing" || selectedFiles.length === 0}
            className={`rounded-full px-5 py-2 text-xs font-semibold shadow-soft transition ${
              selectedFiles.length === 0 || status === "uploading" || status === "processing"
                ? "cursor-not-allowed border border-slate-200/60 bg-slate-100 text-slate-400 dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-slate-500"
                : "border border-indigo-200/70 bg-indigo-500/10 text-indigo-600 hover:-translate-y-0.5 dark:border-indigo-500/40 dark:bg-indigo-500/20 dark:text-indigo-200"
            }`}
          >
            Start Conversion
          </button>
          {downloadUrl ? (
            <a
              href={downloadUrl}
              className="rounded-full border border-slate-200/70 px-5 py-2 text-xs font-semibold text-slate-700 shadow-soft transition hover:-translate-y-0.5 dark:border-slate-700/70 dark:text-slate-200"
            >
              Download Result
            </a>
          ) : (
            <p className="text-xs text-slate-400">
              {status === "processing"
                ? "Processing with open-source tools..."
                : selectedFiles.length
                  ? `${selectedFiles.length} file${selectedFiles.length > 1 ? "s" : ""} selected`
                  : "Files stay in temporary storage"}
            </p>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={config.accept}
          multiple={config.multiple}
          className="hidden"
          onChange={(event) => {
            const selected = Array.from(event.target.files || []);
            if (selected.length) selectFiles(selected);
          }}
        />
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Upload progress</span>
          <span>{status === "idle" ? "0%" : `${progress}%`}</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-800/70">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              status === "error"
                ? "bg-rose-500"
                : "bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400"
            }`}
            style={{ width: `${status === "idle" ? 0 : progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
