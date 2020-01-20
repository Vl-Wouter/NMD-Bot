# NMD-Bot

> A Chatbot for New Media Development

It's a simple chatbot built with Wit.ai. The purpose of the bot
is to respond to questions about the New Media Development study
at Artevelde University of Applied Sciences.

## Getting started

Clone the GitHub repository and install all required dependencies:

```bash
# Install main dev dependencies
npm install

# Install client dependencies
cd client
npm install

#Install server dependencies
cd server
npm install
```

Then copy the `.env.example` file, rename it to `.env` and add your keys.

## Starting the dev environment

```bash
npm run dev:all
```

## Running tests

The tests for the server are setup with Jest. To run these, navigate
to `./server` in your terminal and run the following command:

```bash
npm run test
```

## Built with

* Express.js
* Wit.ai
* Jest
* Node.js
* Slack API

## Authors

* Lukas Marynissen
* Wouter Vlaeyen