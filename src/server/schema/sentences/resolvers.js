import Sequelize from 'sequelize'
import parse from 'date-fns/parse'
import models from '../../models'

// Get by ID
export async function getById(parentValue, { id }) {
  return models.Sentence.findOne({ where: { id } })
}

// Get all
export async function getSentences(parentValue, args) {
  const parameters = {
    where: [],
    include: [],
  }

  // Only return sentences containig a set of characters
  if (args.containing) {
    parameters.where.push({
      content: {
        [Sequelize.Op.iLike]: `%${args.containing}%`,
      },
    })
  }

  // Only return sentences containing a named entity
  if (args.relatedTo) {
    parameters.where.push({
    })
    parameters.include.push({
      model: models.NamedEntity,
      as: 'NamedEntities',
      required: true,
      where: [{
        entity: {
          [Sequelize.Op.eq]: args.relatedTo,
        },
      }],
    })
  }

  if (args.before) {
    parameters.where.push({
      created_at: {
        [Sequelize.Op.lte]: parse(args.before),
      },
    })
  }
  if (args.after) {
    parameters.where.push({
      created_at: {
        [Sequelize.Op.gte]: parse(args.after),
      },
    })
  }


  return models.Sentence.findAll(parameters)
}

// Create
export async function create(parentValue, {
  content,
  channelId,
}) {
  return models.Sentence.create({
    content,
    channelId,
  })
}

// Delete
export async function remove(parentValue, { id }) {
  return models.Sentence.destroy({ where: { id } })
}
