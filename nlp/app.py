# coding: utf8
from __future__ import unicode_literals

import pickle
import os
import hug
from hug_middleware_cors import CORSMiddleware
import spacy
import truecaser

script_dir = os.path.dirname(__file__)

uniDist = ""
backwardBiDist = ""
forwardBiDist = ""
trigramDist = ""
wordCasingLookup = ""

MODELS = {
    'en_core_web_sm': spacy.load('en_core_web_sm'),
    'en_core_web_md': spacy.load('en_core_web_md'),
    'en_core_web_lg': spacy.load('en_core_web_lg'),
    'de_core_news_sm': spacy.load('de_core_news_sm'),
    'es_core_news_sm': spacy.load('es_core_news_sm'),
    'pt_core_news_sm': spacy.load('pt_core_news_sm'),
    'fr_core_news_sm': spacy.load('fr_core_news_sm'),
    'it_core_news_sm': spacy.load('it_core_news_sm'),
    'nl_core_news_sm': spacy.load('nl_core_news_sm')
}


def get_model_desc(nlp, model_name):
    """Get human-readable model name, language name and version."""
    lang_cls = spacy.util.get_lang_class(nlp.lang)
    lang_name = lang_cls.__name__
    model_version = nlp.meta['version']
    return '{} - {} (v{})'.format(lang_name, model_name, model_version)


@hug.get('/models')
def models():
    return {name: get_model_desc(nlp, name) for name, nlp in MODELS.items()}


@hug.post('/dep')
def dep(text: str, model: str, collapse_punctuation: bool=False,
        collapse_phrases: bool=False):
    """Get dependencies for displaCy visualizer."""
    nlp = MODELS[model]
    doc = nlp(text)
    if collapse_phrases:
        for np in list(doc.noun_chunks):
            np.merge(tag=np.root.tag_, lemma=np.root.lemma_,
                     ent_type=np.root.ent_type_)
    options = {'collapse_punct': collapse_punctuation}
    return spacy.displacy.parse_deps(doc, options)


@hug.post('/ent')
def ent(text: str, model: str):
    """Get entities for displaCy ENT visualizer."""
    nlp = MODELS[model]
    doc = nlp(text)
    return [{'start': ent.start_char, 'end': ent.end_char, 'label': ent.label_}
            for ent in doc.ents]


@hug.post('/sentences')
def sents(text: str, model: str):
    """Get entities for displaCy ENT visualizer."""
    nlp = MODELS[model]
    doc = nlp(text)
    return sents_to_strings(doc)

@hug.post('/truecase')
def truecase(text: str, model: str):
    """Returns the truecase versionof this thing"""
    nlp = MODELS[model]
    doc = nlp(text)
    return " ".join([truecase_sent(sent) for sent in doc.sents])

def sents_to_strings(doc):
  strings = []
  for sent in doc.sents:
    mapped_words = map(lambda x: x.text,
      doc[sent.start:sent.end])
    strings.append(" ".join(mapped_words))

  return strings

def truecase_sent(sent):
  truecased_tokens = truecaser.getTrueCase(
    map(lambda x: x.text, sent),
    'as-is',
    wordCasingLookup,
    uniDist,
    backwardBiDist,
    forwardBiDist,
    trigramDist
  )
  return " ".join(truecased_tokens)



if __name__ == '__main__':
    """Get the truecase stuff set up"""
    truecaser_distributions_path = os.path.join(script_dir, 'truecaser_distributions.obj')
    f = open(truecaser_distributions_path, 'rb')
    uniDist = pickle.load(f)
    backwardBiDist = pickle.load(f)
    forwardBiDist = pickle.load(f)
    trigramDist = pickle.load(f)
    wordCasingLookup = pickle.load(f)
    f.close()

    import waitress
    app = hug.API(__name__)
    # app.http.add_middleware(CORSMiddleware(app))
    waitress.serve(__hug_wsgi__, port=8081)
