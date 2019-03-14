import OpenedCaptions from 'opened-captions'
import waitOn from 'wait-on'
import rp from 'request-promise'
import models from '../../models'

import { pubsub } from '../../schema/subscription'

let buffer = []
let sentencesPromise = null

function waitForNlp() {
  const opts = {
    resources: ['http-get://localhost:8081/models'],
  }
  return waitOn(opts)
}

function capitalizeNames(text) {
  text.replace(/(mr\.)|(dr\.)|(mrs\.)|(sen\.)|(ms\.)|(rep\.)\s./ig, l => l.substring(0, l.length) + l.substr(l.length).toUpperCase())
  return text
}

function cleanContent(content) {
  let cleanedContent = content
    .replace(/\s+([\u2000-\u206F\u2E00-\u2E7F\\'!"#%&()*+,\-./:;<=>?@[\]^_`{|}~])/g, '$1') // Punctuation may have spaces inserted before it
    .replace(/([-])\s+/g, '$1') // hyphens should not have spaces around it
    .replace(/(.*) n't/g, "$1n't") // n't gets split into its own token
    .replace('>>', '')
    .trim()
  cleanedContent = capitalizeNames(cleanedContent)
  return cleanedContent
}

function getEntities(sentence) {
  const options = {
    method: 'POST',
    uri: 'http://localhost:8081/ent',
    body: {
      text: sentence,
      model: 'en_core_web_lg',
    },
    json: true,
  }
  return rp.post(options)
}

function getTruecase(sentence) {
  const options = {
    method: 'POST',
    uri: 'http://localhost:8081/truecase',
    body: {
      text: sentence,
      model: 'en_core_web_lg',
    },
    json: true, // Automatically stringifies the body to JSON
  }
  return rp.post(options)
}

function getSentences(words) {
  const options = {
    method: 'POST',
    uri: 'http://localhost:8081/sentences',
    body: {
      text: cleanContent(words.join(' ')),
      model: 'en_core_web_lg',
    },
    json: true, // Automatically stringifies the body to JSON
  }
  return rp.post(options)
}

async function processSentence(content) {
  const sentence = await getTruecase(content)
  const ents = await getEntities(sentence)

  // Save the sentence
  const storedSentence = await models.Sentence.create({
    content: cleanContent(sentence),
  })

  // Save the entities
  ents.map(ent => models.NamedEntity.create({
    entity: sentence.substring(ent.start, ent.end),
    type: ent.label,
    sentenceId: storedSentence.id,
    model: 'en_core_web_lg',
  }))

  pubsub.publish('sentenceAdded', { sentenceAdded: storedSentence })
}

function newWord(word) {
  buffer.push(word)
  if (buffer.length > 20
  && sentencesPromise == null) {
    sentencesPromise = getSentences(buffer).then((sentences) => {
      const cleanedSentences = sentences.map(cleanContent)
      if (cleanedSentences.length > 1) {
        processSentence(cleanedSentences.shift())
      }

      // Add the sentences back onto the queue
      buffer = cleanedSentences.concat(buffer)
      sentencesPromise = null
    })
    buffer.length = 0
  }
}

function toProperCase(word) {
  let cleanedWord = word

  if (!cleanedWord.match(/(.?\..?){2,}/) // Don't lowercase acronyms e.g. "U.S."
  && cleanedWord !== 'I') { // Don't lowercase "I"
    cleanedWord = cleanedWord.toLowerCase()
  }

  if (cleanedWord.match(/(mr\.)|(dr\.)|(mrs\.)|(sen\.)|(ms\.)|(rep\.)/i)) {
    cleanedWord = cleanedWord.charAt(0).toUpperCase() + cleanedWord.slice(1)
  }

  return cleanedWord
}

function start() {
  waitForNlp().then(() => {
    const oc = new OpenedCaptions()
    oc.addStream('server', {
      host: 'http://openedcaptions.com',
      port: 8080,
      description: 'CSPAN',
    })

    oc.processWord = (content) => {
      const word = toProperCase(content)
      newWord(word)
    }
  }).catch(() => {})
}

export default start
