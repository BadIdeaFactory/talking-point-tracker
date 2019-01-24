import {
  GraphQLString, GraphQLInt, GraphQLList,
} from 'graphql'

// App Imports
import NamedEntityType from '../type'
import { getNamedEntities, getById } from '../resolvers'

export const namedEntities = {
  type: new GraphQLList(NamedEntityType),
  resolve: getNamedEntities,
  args: {
    relatedTo: { type: GraphQLString },
    after: { type: GraphQLString },
    before: { type: GraphQLString },
  },
}

export const namedEntity = {
  type: NamedEntityType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: getById,
}
