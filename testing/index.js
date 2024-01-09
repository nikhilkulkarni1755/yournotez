// const { default: jsPDF } = require("jspdf")

function generatePDF() {
    console.log('inside fxn')
    pdf = new jsPDF({
        orientation:'p',
        unit: 'mm',
        format: 'a5',
        putOnlyUsedFonts:true
    })

    pdf.text('First pdf created programmatically by nikhil', 20, 20)
    pdf.text('First pdf created programmatically by nikhil', 20, 30)
    pdf.save('jsPDF.pdf')


}

// https://stackoverflow.com/questions/41484323/how-to-use-jspdf-with-angular-2