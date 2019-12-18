const PdfPrinter = require("pdfmake");
const path = require("path");
const fs = require("fs-extra");

const generatePDF = () =>
  new Promise((resolve, reject) => {
    // I'm returning a Promise because I want to await to the process of creating a PDF
    try {
      // Define font files
      var fonts = {
        Roboto: {
          normal: "Helvetica",
          bold: "Helvetica-Bold",
          italics: "Helvetica-Oblique",
          bolditalics: "Helvetica-BoldOblique"
        }
      };
      const printer = new PdfPrinter(fonts); // create new PDF creator
      const docDefinition = {
        // In here we define what we want to put into our PDF
        content: [
          { text: "Tables", style: "header" },
          "Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.",
          {
            text:
              "A simple table (no headers, no width specified, no spans, no styling)",
            style: "subheader"
          },
          "The following table has nothing more than a body array"
        ]
      };

      // We will be using streams to create the pdf file on disk
      const pdfDoc = printer.createPdfKitDocument(docDefinition, {}); // pdfDoc is our source stream
      pdfDoc.pipe(fs.createWriteStream(path.join(__dirname, "test.pdf"))); // we pipe pdfDoc with the destination stream, which is the writable stream to write on disk
      pdfDoc.end();
      resolve(); // the promise is satisfied when the pdf is successfully created
    } catch (error) {
      console.log(error);
      reject(error); // if we are having errors we are rejecting the promise
    }
  });

module.exports = generatePDF;
