import React, { useState, useCallback } from 'react'

const PdfUploader = ({ setFile }) => {
  const [drag, setDrag] = useState(false)
  const [name, setName] = useState(null)

  const handleFile = useCallback((file) => {
    if (!file || file.type !== 'application/pdf') {
      alert('Please upload a valid PDF')
      return
    }
    setName(file.name)
    const url = URL.createObjectURL(file)
    setFile(url)
  }, [setFile])

  const handleChange = (e) => handleFile(e.target.files[0])

  const onDrop = (e) => {
    e.preventDefault()
    setDrag(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <div
      className={`uploader-shell ${drag ? 'drag-active' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
    >
      <div className="uploader-card">
        <div className="uploader-icon">📄</div>

        <h3 className="uploader-title">
          Upload your PDF
        </h3>

        <p className="uploader-subtitle">
          Drag & drop your file here, or choose one from your device
        </p>

        <input
          id="pdf-file"
          type="file"
          accept="application/pdf"
          onChange={handleChange}
          hidden
        />

        <label htmlFor="pdf-file" className="upload-btn">
          Choose PDF
        </label>

        {name && (
          <div className="file-name">
            Selected: <strong>{name}</strong>
          </div>
        )}

        <div className="uploader-tip">
          Tip: Select text in the PDF to add highlights and notes
        </div>
      </div>
    </div>
  )
}

export default PdfUploader
