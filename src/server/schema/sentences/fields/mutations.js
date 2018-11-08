import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import SentenceType from '../type'
import { create, remove } from '../resolvers'

export const sentenceCreate = {
  type: SentenceType,
  args: {
    content: {
      name: 'content',
      type: GraphQLString,
    },
    channelId: {
      name: 'channelId',
      type: GraphQLInt
    },
  },
  resolve: create,
}

export const sentenceRemove = {
  type: SentenceType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
  },
  resolve: remove,
}
