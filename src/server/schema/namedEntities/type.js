import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

const NamedEntityType = new GraphQLObjectType({
  name: 'namedEntity',
  description: 'A named entity that was mentioned on TV',

  fields: () => ({
    id: { type: GraphQLInt },
    entity: { type: GraphQLString },
    type: { type: GraphQLString },
    model: { type: GraphQLString },
    sentenceId: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
})

export default NamedEntityType
