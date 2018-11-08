import { GraphQLString, GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import SentenceType from '../type'
import { getAll, getById } from '../resolvers'

export const sentences = {
  type: new GraphQLList(SentenceType),
  resolve: getAll,
}

export const sentence = {
  type: SentenceType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: getById,
}
