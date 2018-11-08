import models from '../../models'

// Get by ID
export async function getById(parentValue, { id }) {
  return models.Sentence.findOne({ where: { id } })
}

// Get all
export async function getAll(parentValue, { }) {
  return models.Sentence.findAll()
}

// Create
export async function create(parentValue, {
  content,
  sentence_id,
}) {
  return models.Sentence.create({
    content,
    channel_id,
  })
}

// Delete
export async function remove(parentValue, { id }) {
  return models.Sentence.destroy({ where: { id } })
}
