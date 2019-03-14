import { GraphQLObjectType } from 'graphql'

// App Imports
import * as sentence from './sentences/fields/subscriptions'

// Compile into a single export
const subscription = new GraphQLObjectType({
  name: 'subscription',
  description: '...',

  fields: {
    ...sentence,
  },
})

export default subscription
