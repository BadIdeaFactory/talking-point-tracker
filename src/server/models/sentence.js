module.exports = (sequelize, DataTypes) => {
  const Sentence = sequelize.define('Sentence', {
    content: {
      type: DataTypes.TEXT,
    },
    channelId: {
      type: DataTypes.INTEGER,
      field: 'channel_id',
      references: {
        model: 'channel',
        key: 'id',
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
    tableName: 'sentences',
  })

  Sentence.associate = (models) => {
    models.Sentence.hasMany(models.NamedEntity, {
      as: 'NamedEntities',
      foreignKey: 'sentence_id',
      sourceKey: 'id',
    })
  }

  return Sentence
}
