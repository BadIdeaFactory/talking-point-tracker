import { PubSub } from 'graphql-subscriptions'

// App Imports
import SentenceType from '../type'

const pubsub = new PubSub()

const sentenceAdded = {
  type: SentenceType,
  resolve: () => pubsub.asyncIterator('sentenceAdded'),
}

export default sentenceAdded
