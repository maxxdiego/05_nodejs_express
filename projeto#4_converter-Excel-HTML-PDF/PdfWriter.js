import pdf from 'html-pdf'

class PdfWriter{
    static WritePDF(filename, html) {
        pdf.create(html, {}).toFile(filename, (err) => {
            
        })
    }
}

export default PdfWriter