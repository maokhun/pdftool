# Nimbus PDF Tools Dashboard

Modern PDF tools dashboard built with Next.js App Router, React, and Tailwind CSS.

## Features
- Clean SaaS-style UI inspired by popular PDF platforms
- Responsive tool grid with hover animations
- Dark mode toggle + search bar
- Drag & drop file upload with progress tracking
- Temporary file storage and processing using open-source libraries
- Download-ready processed file

## Supported Conversions (Serverless-friendly)
- Compress PDF (pdf-lib)
- Merge PDFs (pdf-lib)
- Split PDF by page range (pdf-lib)
- PDF to TXT extraction (pdf-parse)
- Images (PNG/JPG) to PDF (pdf-lib)

## Quick Start
```bash
npm install
npm run dev
```

## Backend Notes
- Upload: `POST /api/upload` (multipart form data: `file`)
- Convert: `POST /api/convert` (JSON: `{ "action": "compress", "ids": ["..."] }`)
- Download: `GET /api/download/[id]`

## Vercel
This project is ready to deploy on Vercel with default Next.js settings.
