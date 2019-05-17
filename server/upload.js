const IncomingForm = require("formidable").IncomingForm;
const fs = require('fs')
// const PDFParser = require("pdf2json");
// let pdfParser = new PDFParser(this,1);
const { PdfReader } = require('pdfreader');
const test = new PdfReader(this,1);


module.exports = function upload(req, res) {
  let str = ''
  let form = new IncomingForm();

  form.parse(req, () => {
    console.log('parse')
  });

  // let prom = await new Promise((resolve, reject) => {
    form.on("file", async (field, file) => {
      console.log(file)
        await test.parseFileItems(file.path, (err, item) => {
        if (err){
          console.log(err)
        }
        else if (item){
          if (item.text){
            console.log('yeah')
            console.log(item.text)
            str += item.text
          }
        }
      })
      console.log('str after file? ', str)





//     // console.log(file)
//     // fs.readFile(file.path, (err, pdfBuffer) => {
//     //   if (!err) {
//     //     pdfParser.parseBuffer(pdfBuffer);
//     //     console.log(pdfBuffer)
//     //   }
//     // })

//     console.log('hit file')
//     let yeah = await new Promise((resolve, reject) => {
//       fs.readFile(file.path, async (err, pdfBuffer) => {
//       console.log('hit readfile')
//       let hope = await new Promise((resolve, reject) => {
//         test.parseBuffer(pdfBuffer, (err, item) => {
//         // console.log('hit parsebuffer')
//         if (err) {
//           console.log('parseBuffer error')
//             }
//         else if (!item) {
//           console.log('its bad')
//         }
//         else if(item.text) {
//           str = item.text
//           // console.log(str)
//         }
//       })
//     });
//     console.log('after parsebuffer ', str.substring(0,5))
//   })
//   console.log('after readfile ', str.substr(0,10))
// })
// console.log('after file ', str.substr(0,5))
  })
// })

form.on("end", () => {
  console.log('str at end: ', str)
  // res.json({hello: "world"});
});

};
