import { PubSub } from 'graphql-subscriptions'
import { GraphQLObjectType } from 'graphql'

// App Imports
import { sentenceAdded } from './sentences/fields/subscriptions'

// Set up PubSub
export const pubsub = new PubSub()

// Compile into a single export
export const subscription = new GraphQLObjectType({
  name :'Subscription',
  fields: {
    sentenceAdded
  }
})
