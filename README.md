# Talking Point Tracker

Bad Idea Factory is proud to present the talking point tracker, a tool that watches the content of news television and attempts to figure out the zeitgeist of a given segment of time.

This project leverages [Opened Captions](https://github.com/slifty/opened-captions), a project that exposes TV captions in real time for programmers to use in non-consumptive applications.

## Technologies

This project requires Python 3 and node.  The project is written in node, but the NLP magic is all from the spaCy project (which is python).

## Setting up

You can learn more details about setting up a development environment by reading our [CONTRIBUTING.md](CONTRIBUTING.md).  The basic setup involves:

Installing spaCy:

```
python -m venv .venv
source .venv/bin/activate
pip install -U spacy
pip install -r nlp/requirements.txt
```

Setting up this project:

```
$> yarn install
$> cp .env.template .env && vi .env
$> yarn start
```

After you finish these steps, it probably won't actually work, but this is better than no documentation, right?

If you get any spacy issues, make sure you have the dependencies all installed for your local environment, [as described in their documentation](https://spacy.io/usage/)

## Tech Stack

- ESLint and Babel for making sure that strangers don't judge use
- GraphQL + Sequelize + Postgresql for storing and exposing our deepest secrets
- React + Express for helping us overcomplicate our interfaces

I feel like I'm forgetting something.

## Directory structure

This project is modeled after our [Truth Goggles](https://github.com/BadIdeaFactory/truthgoggles) project in structure.  Here is an overview of the main directories:

- `/config` contains configurations that go beyond the kinds of simple values that would normally be put inside of `.env`

- `/docs` contains project documentation, mostly for use by human beings who want to contribute to the projrect or otherwise understand our diabolacle plans for the future.

- `/src` contains the actual code.

- `/src/server` contains code that runs on the server.  This includes APIs, worker scripts, models, data, and logic for how to present things to the user.  It basically contains everything that doesn't get loaded into a browser.  There are subdirectories in here but when I started listing out what they were for I realized I was just repeating the names of the folders in my descriptions (e.g. `migrations` `models` `schema` etc.)

- `/src/client` contains code and content related to the user experience.  This is where react and it's fellow demons get written, and ultimately compiled from.
- `/src/client/public` contains static files.  This is where things get compiled to, and is the only directory that the server code actually serves.

## How to contribute

Please consider helping out!  You can see a list of our [issues](https://github.com/badideafactory/talking-point-tracker/issues) and reach out there.  We also have [a website](https://biffud.com) which you can use to get in touch with the project maintainers and join our community.

Be sure to take a look at our [contribution guidelines](CONTRIBUTING.md) as well.
