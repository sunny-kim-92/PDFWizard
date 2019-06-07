const IncomingForm = require("formidable").IncomingForm;
const fs = require('fs')
const { PdfReader } = require('pdfreader');
const test = new PdfReader(this,1);
const StreamZip = require('node-stream-zip');

module.exports = function upload(req, res) {
  let str = ''
  let form = new IncomingForm();

  form.parse(req, () => {
  });

    form.on("file", async (field, file) => {
      if (file.type!='application/pdf' && file.type!='application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
        res.json('filetype error ' + file.type)
      }
      else if (file.type === 'application/pdf') {
        await test.parseFileItems(file.path, (err, item) => {
        if (err){
          console.log(err)
        }
        else if (item){
          if (item.text){
            str += item.text + " "
          }
        }else if (!item){
          res.json(str)
        }
      })
    }
    else {
      return new Promise((resolve, reject) => {

        let wordText = ''
            const zip = new StreamZip({
                file: file.path,
                storeEntries: true
            })

            zip.on('ready', () => {
                var chunks = []
                var content = ''
                zip.stream('word/document.xml', (err, stream) => {
                    if (err) {
                        reject(err)
                    }
                    stream.on('data', function(chunk) {
                      console.log('we here')
                        chunks.push(chunk)
                    })
                    stream.on('end', function() {
                        content = Buffer.concat(chunks)
                        zip.close()
                        let final = ''
                        var components = content.toString().split('<w:t')
                        for(var i=0;i<components.length;i++) {
                          var tags = components[i].split('>')
                          var content = tags[1].replace(/<.*$/,"")
                          final += content+' '
                          }
                          console.log(final)
                    })
                })
            })
        })
    }
  })

form.on("end", () => {
  console.log('parsing finished')
});

};
