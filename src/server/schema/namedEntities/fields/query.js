import { GraphQLString, GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import NamedEntityType from '../type'
import { getAll, getById } from '../resolvers'

export const namedEntities = {
  type: new GraphQLList(NamedEntityType),
  resolve: getAll,
}

export const namedEntity = {
  type: NamedEntityType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: getById,
}
