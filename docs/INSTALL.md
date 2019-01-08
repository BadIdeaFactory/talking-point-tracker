# Talking Point Tracker Installation

This document is a constant work in progress. If you are a new user trying to setup the project and face issues with the installation, we strongly encourage that you submit a PR offering suggested improvements.

Installing spaCy / our NLP tools:

```
python -m venv .venv
source .venv/bin/activate
pip install -U spacy
pip install -r nlp/requirements.txt
```

Loading the model for truecaser (you can also train your own):

```
wget https://github.com/nreimers/truecaser/releases/download/v1.0/english_distributions.obj.zip
unzip english_distributions.obj.zip
mv distributions.obj nlp/truecaser_distributions.obj
rm english_distributions.obj.zip
```

Create the database:

```
createdb tpt
createuser tpt -P
```

Setting up this project:

```
yarn install
cp .env.template .env && vi .env
sequelize db:migrate
yarn start
```

After you finish these steps, it probably won't actually work, but this is better than no documentation, right?

If you get any spaCy issues, make sure you have the dependencies all installed for your local environment, [as described in their documentation](https://spacy.io/usage/)
