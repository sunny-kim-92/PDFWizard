const IncomingForm = require("formidable").IncomingForm;
const fs = require('fs')
const { PdfReader } = require('pdfreader');
const test = new PdfReader(this,1);

module.exports = function upload(req, res) {
  let str = ''
  let form = new IncomingForm();

  form.parse(req, () => {
    console.log('parse')
  });

    form.on("file", async (field, file) => {
      console.log(file)
        await test.parseFileItems(file.path, (err, item) => {
        if (err){
          console.log(err)
        }
        else if (item){
          if (item.text){
            str += item.text
          }
        }else if (!item){
          console.log(str)
          res.json({text: str})
        }
      })
  })

form.on("end", () => {
  console.log('str at end: ', str)
});

};
