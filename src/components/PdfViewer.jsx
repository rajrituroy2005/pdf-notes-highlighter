import { useState, useRef, useEffect } from 'react'
import { Document, Page } from 'react-pdf'
import NotesPanel from './NotesPanel'
import { loadHighlights, saveHighlights } from '../utils/storage'

const PdfViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [highlights, setHighlights] = useState([])

  const pageRef = useRef(null)

  useEffect(() => {
    setHighlights(loadHighlights())
  }, [])

  useEffect(() => {
    saveHighlights(highlights)
  }, [highlights])

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
    setPageNumber(1)
  }

  const handleMouseUp = () => {
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed) return

    const text = sel.toString().trim()
    if (!text) return

    const range = sel.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    const containerRect = pageRef.current.getBoundingClientRect()

    const highlight = {
      id: crypto.randomUUID(),
      page: pageNumber,
      text,
      note: '',
      position: {
        x: rect.left - containerRect.left,
        y: rect.top - containerRect.top,
        width: rect.width,
        height: rect.height
      }
    }

    setHighlights(prev => [...prev, highlight])
    sel.removeAllRanges()
  }

  const updateNote = (id, note) => {
    setHighlights(prev =>
      prev.map(h => h.id === id ? { ...h, note } : h)
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="toolbar">
        <button className="btn btn-ghost" onClick={() => setPageNumber(1)}>First</button>
        <button className="btn btn-ghost" disabled={pageNumber <= 1} onClick={() => setPageNumber(p => p - 1)}>Prev</button>
        <div className="text-muted font-medium" style={{minWidth:120, textAlign:'center'}}>Page {pageNumber} / {numPages || '-'}</div>
        <button className="btn btn-ghost" disabled={pageNumber >= numPages} onClick={() => setPageNumber(p => p + 1)}>Next</button>
        <button className="btn btn-ghost" onClick={() => setPageNumber(numPages || 1)}>Last</button>
      </div>

      <div ref={pageRef} onMouseUp={handleMouseUp} className="pdf-area">
        <div className="pdf-viewport canvas">
          {highlights
            .filter(h => h.page === pageNumber)
            .map(h => (
              <div
                key={h.id}
                className="absolute highlight pointer-events-none"
                style={{
                  left: h.position.x,
                  top: h.position.y,
                  width: h.position.width,
                  height: h.position.height
                }}
              />
            ))}

          <div className="pdf-wrap">
            <Document file={file} onLoadSuccess={onLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
        </div>
      </div>

      <NotesPanel
        highlights={highlights}
        onSelect={setPageNumber}
        onUpdate={updateNote}
      />
    </div>
  )
}

export default PdfViewer
