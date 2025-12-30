import jsPDF from 'jspdf'

export const exportAsPDF = (highlights) => {
  const doc = new jsPDF()
  let y = 10

  doc.setFontSize(14)
  doc.text('PDF Notes Export', 10, y)
  y += 10

  highlights.forEach((h, index) => {
    if (y > 270) {
      doc.addPage()
      y = 10
    }

    doc.setFontSize(10)
    doc.text(`Page ${h.page}`, 10, y)
    y += 5

    doc.setFontSize(11)
    doc.text(`Text: ${h.text}`, 10, y, { maxWidth: 180 })
    y += 7

    if (h.note) {
      doc.text(`Note: ${h.note}`, 10, y, { maxWidth: 180 })
      y += 8
    }

    y += 4
  })

  doc.save('pdf-notes.pdf')
}
export const exportAsJSON = (highlights) => {
  const dataStr = JSON.stringify(highlights, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob) 
    const a = document.createElement('a')
    a.href = url
    a.download = 'pdf-notes.json'
    a.click()
    URL.revokeObjectURL(url)
}
 

