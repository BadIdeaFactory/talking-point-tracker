import { pubsub } from '../../subscription'

// App Imports
import SentenceType from '../type'

export const sentenceAdded = {
  type: SentenceType,
  resolve: (payload) => {
    console.log(payload)
    console.log("TEST")
    return "TEST"
  },
  subscribe: () => pubsub.asyncIterator('sentenceAdded'),
}
