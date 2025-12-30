# PDF Notes & Highlighter

A compact React application for uploading, viewing and annotating PDFs. Users can select text to create highlight overlays, attach notes to highlights, persist annotations in browser LocalStorage, and export collected notes as JSON or PDF.

## Key features

- Upload and view PDF files (drag-and-drop or file picker)
- Select text within a PDF to create highlight overlays
- Add and edit notes per highlight
- Persist highlights and notes using browser LocalStorage
- Export notes as JSON or as a PDF document

## Tech stack

- React (Vite)
- react-pdf (PDF rendering)
- jsPDF (PDF export)
- Tailwind CSS / utility classes for layout and styling
- Browser LocalStorage for persistence

## Quick start

Prerequisites: Node.js (v16+ recommended) and npm.

Install and run the development server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

Note: `react-pdf` requires the PDF worker. If the app does not render PDFs, ensure `pdf.worker.min.js` is available under `public/`. On Windows PowerShell you can copy it with:

```powershell
Copy-Item node_modules\pdfjs-dist\legacy\build\pdf.worker.min.js public\
```

## Usage

1. Upload a PDF using the drag-and-drop area or the file picker.
2. View the PDF in the viewer. Select text to create a highlight overlay.
3. Click a highlight in the viewer or in the notes panel to add or edit a note.
4. Notes are automatically saved to LocalStorage and reloaded on page refresh.
5. Use the export buttons in the notes panel to download notes as JSON or PDF.

## Implementation notes

- Components:
  - `PdfUploader` — drag-and-drop and file selection with basic validation.
  - `PdfViewer` — renders PDFs via `react-pdf`; captures text selection and computes highlight bounding positions to overlay highlights.
  - `NotesPanel` — lists highlights, provides editing and export actions.
- Data model for highlights: `{ id, page, text, note, position }` where `position` contains bounding coordinates relative to the PDF viewport.
- Persistence: highlights are serialized to LocalStorage; exports use a JSON dump and a PDF generated via `jsPDF`.

## Development notes

- Styling is implemented with utility classes and a small project stylesheet. The layout is responsive and contained within the viewport to avoid page-level scrolling.
- To run tests or add new features, follow the component structure and keep side effects (LocalStorage access, file URL creation) in small utility modules for easier testing.

## Contributing

Contributions are welcome. For changes beyond small fixes, open an issue describing the proposed enhancement before submitting a pull request.

## License

MIT