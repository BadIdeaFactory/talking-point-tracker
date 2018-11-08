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
    sentenceId: {
      type: DataTypes.INTEGER,
      field: 'sentence_id',
      references: {
        model: 'sentence',
        key: 'id'
      },
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

  NamedEntity.associate = function () {}

  return NamedEntity
}
