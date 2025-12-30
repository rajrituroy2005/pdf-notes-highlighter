import { useState } from 'react'
import PdfUploader from './components/PdfUploader'
import PdfViewer from './components/PdfViewer'
import './App.css'

const App = () => {
  const [file, setFile] = useState(null)

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1 className="title">PDF Notes & Highlighter</h1>
          <p className="subtitle">Upload • Highlight • Annotate</p>
        </div>
      </header>

      <main className="app-main">
        {!file ? (
          <div className="uploader-wrapper">
            <PdfUploader setFile={setFile} />
          </div>
        ) : (
          <PdfViewer file={file} />
        )}
      </main>
    </div>
  )
}

export default App
