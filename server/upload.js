const IncomingForm = require("formidable").IncomingForm;
const fs = require('fs')
// const PDFParser = require("pdf2json");
// let pdfParser = new PDFParser(this,1);
const { PdfReader } = require('pdfreader');
const test = new PdfReader();


module.exports = function upload(req, res) {
  var form = new IncomingForm();

  form.on("file", (field, file) => {
    // console.log(file)
    // fs.readFile(file.path, (err, pdfBuffer) => {
    //   if (!err) {
    //     pdfParser.parseBuffer(pdfBuffer);
    //     console.log(pdfBuffer)
    //   }
    // })

    fs.readFile(file.path, (err, pdfBuffer) => {
      test.parseBuffer(pdfBuffer, (err, item) => {
        if (err) {
          callback(err);
        }
        else if (!item) {
          console.log('its bad')
        }
        else if(item.text) {
          console.log(item.text);
        }
      });
  });
  })
  form.on("end", () => {
    res.json();
  });

  form.parse(req);
};
