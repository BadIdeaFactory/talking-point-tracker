import { GraphQLObjectType } from 'graphql'

// App Imports
import * as namedEntity from './namedEntities/fields/query'
import * as sentence from './sentences/fields/query'

// Compile into a single export
const query = new GraphQLObjectType({
  name: 'query',
  description: '...',

  fields: {
    ...namedEntity,
    ...sentence,
  },
})

export default query
