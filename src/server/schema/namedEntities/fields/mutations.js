import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import NamedEntityType from '../type'
import { create, remove } from '../resolvers'

export const namedEntityCreate = {
  type: NamedEntityType,
  args: {
    entity: {
      name: 'entity',
      type: GraphQLString,
    },
    type: {
      name: 'type',
      type: GraphQLString,
    },
    model: {
      name: 'model',
      type: GraphQLString,
    },
    sentenceId: {
      name: 'sentenceId',
      type: GraphQLInt,
    },
  },
  resolve: create,
}

export const namedEntityRemove = {
  type: NamedEntityType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
  },
  resolve: remove,
}
