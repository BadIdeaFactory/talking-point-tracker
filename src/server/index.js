import http from 'http'
import express from 'express'
import dotenv from 'dotenv'
import graphqlHTTP from 'express-graphql'
import { execute, subscribe } from 'graphql';
import path from 'path'
import cors from 'cors'
import { SubscriptionServer } from 'subscriptions-transport-ws'

import schema from './schema'

import openedCaptionsWorker from './workers/openedCaptions'

// Configure settings
dotenv.config()
const port = process.env.API_PORT || 3000

// Express app setup
const app = express()
const server = http.createServer(app)

// Serve the static / compiled content
app.use('/static', express.static(path.join(__dirname, '../public')))

// Enable cors
app.use(cors())

// GraphQL setup
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: false,
}))
app.use('/graphiql', graphqlHTTP({
  schema,
  graphiql: true,
  endpointUrl: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${port}/subscriptions`,
}))

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server,
    path: '/subscriptions',
  })
})

// Kick off the workers
openedCaptionsWorker()
