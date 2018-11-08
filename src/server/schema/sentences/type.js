import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

const SentenceType = new GraphQLObjectType({
  name: 'sentence',
  description: 'A sentence that was aired on TV',

  fields: () => ({
    id: { type: GraphQLInt },
    content: { type: GraphQLString },
    channelId: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
})

export default SentenceType
