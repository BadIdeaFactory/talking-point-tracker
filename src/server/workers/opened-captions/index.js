import OpenedCaptions from 'opened-captions'

let oc = new OpenedCaptions();

function start() {
  oc.addStream('server', {
    host: 'https://openedcaptions.com',
    port: 443,
    description: "CSPAN"
  });

  oc.processWord = function(content, stream) {
    newWord(content)
  }
}

function newWord(word) {
  // Do something with the word spoken on TV here.
}

export default start
