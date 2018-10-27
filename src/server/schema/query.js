import { GraphQLObjectType } from 'graphql'

// Compile into a single export
const query = new GraphQLObjectType({
  name: 'query',
  description: '...',

  fields: {
  },
})

export default query
