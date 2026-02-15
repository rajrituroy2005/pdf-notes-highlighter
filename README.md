# PDF Notes & Highlighter

A compact React application for uploading, viewing and annotating PDFs. Users can select text to create highlight overlays, attach notes to highlights, persist annotations in browser LocalStorage, and export collected notes as JSON or PDF.
A lightweight React application for reading PDFs, selecting text highlights, adding annotation notes, and exporting annotations for sharing.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Run in Development](#run-in-development)
  - [Production Build](#production-build)
- [Usage Guide](#usage-guide)
- [Data Model](#data-model)
- [Persistence](#persistence)
- [Export Formats](#export-formats)
- [Scripts](#scripts)
- [Known Limitations](#known-limitations)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**PDF Notes & Highlighter** helps you:

1. Upload a PDF file from your local device.
2. Highlight text directly on any page.
3. Write page-level notes connected to each highlight.
4. Persist annotations in browser storage.
5. Export annotation data as JSON or as a formatted PDF report.

The app is designed for simple study workflows, quick document reviews, and lightweight personal annotation without backend setup.

---

## Features

- **PDF upload** via drag-and-drop or file picker.
- **Interactive highlighting** using native text selection.
- **Per-highlight notes** editable in a dedicated side panel.
- **Page navigation controls** (First, Prev, Next, Last).
- **Automatic persistence** using browser `localStorage`.
- **Export options**:
  - JSON (`pdf-notes.json`)
  - PDF (`pdf-notes.pdf`)

---

## Tech Stack

- **Frontend:** React 19 + Vite 7
- **PDF Rendering:** `react-pdf` + `pdfjs-dist`
- **Export Generation:** `jspdf`
- **Styling:** Tailwind CSS 4 + custom CSS
- **Storage:** Browser `localStorage`

---

## Project Structure

```text
pdf-notes-highlighter/
├── public/
│   ├── logo-pdf.svg
│   ├── pdf.worker.min.mjs
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── NotesPanel.jsx
│   │   ├── PdfUploader.jsx
│   │   └── PdfViewer.jsx
│   ├── utils/
│   │   ├── export.js
│   │   └── storage.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## Key features
---

- Upload and view PDF files (drag-and-drop or file picker)
- Select text within a PDF to create highlight overlays
- Add and edit notes per highlight
- Persist highlights and notes using browser LocalStorage
- Export notes as JSON or as a PDF document
## Getting Started

## Tech stack
### Prerequisites

- React (Vite)
- react-pdf (PDF rendering)
- jsPDF (PDF export)
- Tailwind CSS / utility classes for layout and styling
- Browser LocalStorage for persistence
- **Node.js**: 18+ recommended
- **npm**: 9+ recommended

## Quick start
### Installation

Prerequisites: Node.js (v16+ recommended) and npm.
```bash
npm install
```

Install and run the development server:
### Run in Development

```bash
npm install
npm run dev
```

Build for production:
Vite will print a local URL (usually `http://localhost:5173`).

### Production Build

```bash
npm run build
npm run preview
```

Note: `react-pdf` requires the PDF worker. If the app does not render PDFs, ensure `pdf.worker.min.js` is available under `public/`. On Windows PowerShell you can copy it with:

```powershell
Copy-Item node_modules\pdfjs-dist\legacy\build\pdf.worker.min.js public\
---

## Usage Guide

1. Open the app in your browser.
2. Upload a `.pdf` file (drag-and-drop or **Choose PDF** button).
3. Select text inside the rendered page to create a highlight.
4. Use the **Notes** panel to add or edit notes for each highlight.
5. Click a note card to jump to that note’s page.
6. Export all annotations with:
   - **Export JSON** for raw structured data.
   - **Export PDF** for a shareable summary document.

---

## Data Model

Highlights are stored as objects with this shape:

```json
{
  "id": "uuid",
  "page": 1,
  "text": "Selected text content",
  "note": "Optional note",
  "position": {
    "x": 100,
    "y": 200,
    "width": 120,
    "height": 18
  }
}
```

## Usage
---

## Persistence

- Annotation data is saved automatically in browser `localStorage`.
- Storage key: **`pdf-highlights`**.
- Data remains available on reload in the same browser profile.
- Clearing browser site data removes saved highlights/notes.

---

## Export Formats

### JSON Export

- Filename: `pdf-notes.json`
- Contains full highlight objects, including text, page, note, and position metadata.
- Useful for backup, automation, or downstream processing.

### PDF Export

- Filename: `pdf-notes.pdf`
- Includes:
  - Export title
  - Highlight page number
  - Highlighted text
  - Optional note text
- Multi-page output is handled automatically when content exceeds one page.

1. Upload a PDF using the drag-and-drop area or the file picker.
2. View the PDF in the viewer. Select text to create a highlight overlay.
3. Click a highlight in the viewer or in the notes panel to add or edit a note.
4. Notes are automatically saved to LocalStorage and reloaded on page refresh.
5. Use the export buttons in the notes panel to download notes as JSON or PDF.
---

## Implementation notes
## Scripts

- Components:
  - `PdfUploader` — drag-and-drop and file selection with basic validation.
  - `PdfViewer` — renders PDFs via `react-pdf`; captures text selection and computes highlight bounding positions to overlay highlights.
  - `NotesPanel` — lists highlights, provides editing and export actions.
- Data model for highlights: `{ id, page, text, note, position }` where `position` contains bounding coordinates relative to the PDF viewport.
- Persistence: highlights are serialized to LocalStorage; exports use a JSON dump and a PDF generated via `jsPDF`.
Defined in `package.json`:

## Development notes
- `npm run dev` — start local development server
- `npm run build` — create production build
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint checks

- Styling is implemented with utility classes and a small project stylesheet. The layout is responsive and contained within the viewport to avoid page-level scrolling.
- To run tests or add new features, follow the component structure and keep side effects (LocalStorage access, file URL creation) in small utility modules for easier testing.
---

## Known Limitations

- Highlights are based on viewport-relative bounding boxes and may not perfectly align across all zoom/responsive scenarios.
- Notes persist locally only (no cloud sync or multi-device sharing).
- There is currently no delete action for individual highlights.
- Upload accepts local files only (no remote PDF URL input).

---

## Troubleshooting

### PDFs are not rendering

- Ensure `pdfjs-dist` is installed correctly.
- Confirm the worker file exists at:

```text
public/pdf.worker.min.mjs
```

### Highlights are not saved

- Verify browser storage is enabled.
- Check for private/incognito mode restrictions on `localStorage`.

### Export buttons do nothing

- Ensure pop-up/download restrictions are not blocking browser-triggered downloads.

---

## Contributing

Contributions are welcome. For changes beyond small fixes, open an issue describing the proposed enhancement before submitting a pull request.
Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run lint/build checks.
5. Open a pull request with a clear description and screenshots when UI changes are included.

---

## License

MIT
This project is licensed under the **MIT License**.
