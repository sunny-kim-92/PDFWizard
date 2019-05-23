const nlp = require('compromise')
const tm = require('text-miner')
const sw = require('stopword')

export default function analysis(str) {
    let text = sw.removeStopwords(str.split(' '))
    let doc = nlp(text)
    // let corp = new tm.Corpus([text])
    return doc.ngrams().sort().data()
    // corp.trim().removeWords(tm.STOPWORDS.EN)
    // let terms = new tm.DocumentTermMatrix(corp)
    // return terms.data
}