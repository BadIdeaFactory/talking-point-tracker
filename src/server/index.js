import http from 'http'
import express from 'express'
import dotenv from 'dotenv'
import graphqlHTTP from 'express-graphql'
import schema from './schema'

import openedCaptionsWorker from './workers/opened-captions'

// Configure settings
dotenv.config()
const port = process.env.API_PORT || 3000

// Express app setup
const app = express()
const server = http.createServer(app)

// GraphQL setup
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: false,
}))
app.use('/graphiql', graphqlHTTP({
  schema,
  graphiql: true,
}))

server.listen(port)
server.on('listening', () => {
  /* eslint-disable-next-line no-console */
  console.log(`Server is listening on port: ${port}`)
})

// Kick off the workers
openedCaptionsWorker()
