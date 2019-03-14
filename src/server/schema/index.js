// Imports
import { GraphQLSchema } from 'graphql'

// App Imports
import query from './query'
import mutation from './mutation'
import subscription from './subscription'

// Schema
const schema = new GraphQLSchema({
  query,
  mutation,
  subscription,
})

export default schema
