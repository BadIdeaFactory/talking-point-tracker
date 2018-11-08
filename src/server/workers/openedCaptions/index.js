import OpenedCaptions from 'opened-captions'
import waitOn from 'wait-on'
import rp from 'request-promise'
import models from '../../models'

let buffer = []
let sentencesPromise = null

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
      let word = toProperCase(content)
      newWord(word)
    }
  }).catch(function (err) {
    console.log(err)
  })
}

function toProperCase(word) {
  let cleanedWord = word

  if(!cleanedWord.match(/(.?\..?){2,}/) // Don't lowercase acronyms e.g. "U.S."
  && cleanedWord != "I") {          // Don't lowercase "I"
    cleanedWord = cleanedWord.toLowerCase()
  }

  if(cleanedWord.match(/(mr\.)|(dr\.)|(mrs\.)|(sen\.)|(ms\.)|(rep\.)/i)) {
    cleanedWord = cleanedWord.charAt(0).toUpperCase() + cleanedWord.slice(1)
  }

  return cleanedWord
}

function waitForNlp() {
  const opts = {
    resources: ["http-get://localhost:8081/models"]
  }
  return waitOn(opts)
}

function newWord(word) {
  buffer.push(word)
  if(buffer.length > 20
  && sentencesPromise == null) {
    sentencesPromise = getSentences(buffer).then((sentences) => {
      const cleanedSentences = sentences.map(cleanContent)
      if(cleanedSentences.length > 1) {
        processSentence(cleanedSentences.shift())
      }

      // Add the sentences back onto the queue
      buffer = cleanedSentences.concat(buffer)
      sentencesPromise = null
    })
    buffer.length = 0
  }
}

function cleanContent(content) {
  let cleanedContent = content
    .replace(/\s+([\u2000-\u206F\u2E00-\u2E7F\\'!"#%&()*+,\-.\/:;<=>?@\[\]^_`{|}~])/g, "$1") // Punctuation may have spaces inserted before it
    .replace(/([-])\s+/g, "$1") // hyphens should not have spaces around it
    .replace(/(.*) n't/g, "$1n't") // n't gets split into its own token
    .replace(">>", "")
    .trim()
  cleanedContent = capitalizeNames(cleanedContent)
  return cleanedContent
}

async function processSentence(content) {
  const sentence = await getTruecase(content)
  const ents = await getEnt(sentence)
  console.log(sentence)

  // Save the sentence
  const storedSentence = await models.Sentence.create({
    content: cleanContent(sentence)
  })

  // Save the entities
  ents.map((ent) => {
    models.NamedEntity.create({
      entity: sentence.substring(ent.start, ent.end),
      type: ent.label,
      sentenceId: storedSentence.id,
      model: 'en_core_web_lg'
    })
  })
}

function capitalizeNames(text) {
  text.replace(/(mr\.)|(dr\.)|(mrs\.)|(sen\.)|(ms\.)|(rep\.)\s./ig, function(l) {
    return l.substring(0, l.length) + l.substr(l.length).toUpperCase()
  })
  return text
}

function getTruecase(sentence) {
  var options = {
      method: 'POST',
      uri: 'http://localhost:8081/truecase',
      body: {
          "text": sentence,
          "model":"en_core_web_lg"
      },
      json: true // Automatically stringifies the body to JSON
  };
  return rp.post(options)
}

function getSentences(buffer) {
  var options = {
      method: 'POST',
      uri: 'http://localhost:8081/sentences',
      body: {
          "text": cleanContent(buffer.join(" ")),
          "model":"en_core_web_lg"
      },
      json: true // Automatically stringifies the body to JSON
  };
  return rp.post(options)
}

function getEnt(sentence) {
  var options = {
      method: 'POST',
      uri: 'http://localhost:8081/ent',
      body: {
          "text": sentence,
          "model":"en_core_web_lg"
      },
      json: true // Automatically stringifies the body to JSON
  };
  return rp.post(options)

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
