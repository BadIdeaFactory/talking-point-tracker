import OpenedCaptions from 'opened-captions'
import waitOn from 'wait-on'
import rp from 'request-promise'

const buffer = []

function start() {
  console.log("STARTING")
  waitForNlp().then(() => {
    console.log("NLP ready")
    const oc = new OpenedCaptions()
    oc.addStream('server', {
      host: 'https://openedcaptions.com',
      port: 443,
      description: "CSPAN"
    });

    oc.processWord = function(content, stream) {
      newWord(content)
    }
  }).catch(function (err) {
    console.log(err)
    console.log("zomg")
  })
}

function waitForNlp() {
  const opts = {
    resources: ["http-get://localhost:8081/models"]
  }
  return waitOn(opts)
}

function newWord(word) {
  // Do something with the word spoken on TV here.
  // console.log(word)
  if(buffer.length < 10) {
    buffer.push(word)

  } else {
    const line = buffer.join(" ")
    getNlpDep(line).then((data) => {
      console.log(data)
    })
    buffer.length = 0
  }
}

function getNlpDep(line) {
  var options = {
      method: 'POST',
      uri: 'http://localhost:8081/dep',
      body: {
          "text": line,
          "model":"en_core_web_lg",
          "collapse_punctuation": true,
          "collapse_phrases": true
      },
      json: true // Automatically stringifies the body to JSON
  };
  return rp.post(options)
}

function extractEntities(sentence) {

}

export default start
