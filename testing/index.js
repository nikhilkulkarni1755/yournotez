// const { default: jsPDF } = require("jspdf")

notes = ['first', 'second', 'third', 'super long note. ling ling practice for 40 hours or twoset will kick your and my ass', 'mozart']
// https://stackoverflow.com/questions/24272058/word-wrap-in-generated-pdf-using-jspdf
function generatePDF() {
    console.log('inside fxn')
    pdf = new jsPDF({
        orientation:'p',
        unit: 'mm',
        format: 'a5',
        putOnlyUsedFonts:true
    })

    let counter = 20
    for(let i = 0; i < notes.length; i++) {
        // long notes don't work here
        pdf.text(((i+1) + ") " + notes[i]), 20, counter, {maxWidth: 40})
        counter += 10
    }

    // pdf.text('First pdf created programmatically by nikhil', 20, 20)
    // pdf.text('First pdf created programmatically by nikhil', 20, 30)
    pdf.save('jsPDF.pdf')


}

// https://stackoverflow.com/questions/41484323/how-to-use-jspdf-with-angular-2