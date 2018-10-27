import { GraphQLObjectType } from 'graphql'

// Compile into a single export
const mutation = new GraphQLObjectType({
  name: 'mutations',
  description: '...',

  fields: {
  },
})

export default mutation
