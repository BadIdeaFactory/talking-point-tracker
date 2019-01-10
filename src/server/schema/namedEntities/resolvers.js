import Sequelize from 'sequelize'
import parse from 'date-fns/parse'
import models from '../../models'

export async function getById(parentValue, { id }) {
  return models.NamedEntity.findOne({ where: { id } })
}

export async function getNamedEntities(parentValue, args) {
  const parameters = {
    where: [],
    include: [],
  }

  // Only return entities that appeared in the same sentence as another
  if (args.relatedTo) {
    parameters.where.push({
      entity: {
        [Sequelize.Op.ne]: args.relatedTo,
      },
    })
    parameters.include.push({
      model: models.Sentence,
      as: 'Sentence',
      required: true,
      include: [{
        as: 'NamedEntities',
        model: models.NamedEntity,
        required: true,
        where: {
          entity: args.relatedTo,
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

  return models.NamedEntity.findAll(parameters)
}

// Create named entity
export async function create(parentValue, {
  entity,
  type,
  model,
  sentenceId,
}) {
  return models.CredibleContent.create({
    entity,
    type,
    model,
    sentenceId,
  })
}

// Delete named entity
export async function remove(parentValue, { id }) {
  return models.NamedEntity.destroy({ where: { id } })
}
