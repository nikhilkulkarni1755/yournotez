// const { default: jsPDF } = require("jspdf")

notes = ['first', 'second', 'third', 'super long note. ling ling practice for 40 hours or twoset will kick your and my ass', 'mozart']
// https://stackoverflow.com/questions/24272058/word-wrap-in-generated-pdf-using-jspdf
function generatePDF() {
    console.log('inside fxn')
    pdf = new jsPDF({
        orientation:'p',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts:true
    })

    let counter = 20
    var splitNote = pdf.splitTextToSize(notes, 180)
    for(let i = 0; i < splitNote.length; i++) {
        pdf.text((splitNote[i]), 20, counter)
        counter+=10
    }
    // for(let i = 0; i < notes.length; i++) {
    //     // long notes don't work here
    //     let splitNote = pdf.splitTextToSize(notes[i], 180)
    //     pdf.text(((i+1) + ") " + splitNote), 20, counter)
    //     counter += 10
    // }

    // pdf.text('First pdf created programmatically by nikhil', 20, 20)
    // pdf.text('First pdf created programmatically by nikhil', 20, 30)
    pdf.save('jsPDF.pdf')


}

// https://stackoverflow.com/questions/41484323/how-to-use-jspdf-with-angular-2