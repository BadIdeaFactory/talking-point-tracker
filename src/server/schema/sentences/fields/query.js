import { GraphQLString, GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import SentenceType from '../type'
import { getSentences, getById } from '../resolvers'

export const sentences = {
  type: new GraphQLList(SentenceType),
  resolve: getSentences,
  args: {
    relatedTo: { type: GraphQLString },
    containing: { type: GraphQLString },
    after: { type: GraphQLString },
    before: { type: GraphQLString },
  },
}

export const sentence = {
  type: SentenceType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: getById,
}
