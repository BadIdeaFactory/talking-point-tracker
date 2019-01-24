module.exports = (sequelize, DataTypes) => {
  const NamedEntity = sequelize.define('NamedEntity', {
    entity: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    tableName: 'named_entities',
  })

  NamedEntity.associate = (models) => {
    models.NamedEntity.belongsTo(models.Sentence, {
      as: 'Sentence',
      foreignKey: 'sentence_id',
      targetKey: 'id',
    })
  }

  return NamedEntity
}
