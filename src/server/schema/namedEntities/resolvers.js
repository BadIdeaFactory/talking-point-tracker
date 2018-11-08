import models from '../../models'

// Get named entity by ID
export async function getById(parentValue, { id }) {
  return models.NamedEntity.findOne({ where: { id } })
}

// Get all named entities
export async function getAll(parentValue, { }) {
  return models.NamedEntity.findAll()
}

// Create named entity
export async function create(parentValue, {
  entity,
  type,
  model,
  sentence_id,
}) {
  return models.CredibleContent.create({
    entity,
    type,
    model,
    sentence_id,
  })
}

// Delete named entity
export async function remove(parentValue, { id }) {
  return models.NamedEntity.destroy({ where: { id } })
}
