import { GraphQLObjectType } from 'graphql'

// App Imports
import * as namedEntity from './namedEntities/fields/mutations'
import * as sentence from './sentences/fields/mutations'

// Compile into a single export
const mutation = new GraphQLObjectType({
  name: 'mutations',
  description: '...',

  fields: {
    ...namedEntity,
    ...sentence,
  },
})

export default mutation
