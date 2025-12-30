import React from 'react'
import { exportAsJSON, exportAsPDF } from '../utils/export'

const NotesPanel = ({ highlights, onSelect, onUpdate }) => {
  return (
    <aside className="notes-panel">
      {/* Header */}
      <div className="notes-header">
        <h2 className="notes-title">
          Notes
          <span className="notes-count">({highlights.length})</span>
        </h2>
      </div>

      {/* Export Actions */}
      <div className="notes-actions">
        <button
          onClick={() => exportAsJSON(highlights)}
          className="notes-btn primary"
        >
          Export JSON
        </button>

        <button
          onClick={() => exportAsPDF(highlights)}
          className="notes-btn accent"
        >
          Export PDF
        </button>
      </div>

      {/* Empty State */}
      {highlights.length === 0 && (
        <p className="notes-empty">
          No highlights yet. Select text in the PDF to add notes.
        </p>
      )}

      {/* Notes List */}
      <div className="notes-list">
        {highlights.map(h => (
          <div
            key={h.id}
            className="note-card"
            onClick={() => onSelect(h.page)}
          >
            <div className="note-meta">
              Page {h.page}
            </div>

            <p className="note-text">
              {h.text}
            </p>

            <textarea
              value={h.note}
              placeholder="Add note…"
              onChange={(e) => onUpdate(h.id, e.target.value)}
              onClick={(e) => e.stopPropagation()}
              rows={2}
              className="note-input"
            />
          </div>
        ))}
      </div>
    </aside>
  )
}

export default NotesPanel
