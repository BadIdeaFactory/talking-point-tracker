module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('named_entities', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    entity: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    model: {
      type: Sequelize.STRING,
    },
    sentence_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'sentences',
        key: 'id',
      },
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: queryInterface => queryInterface.dropTable('named_entities'),
}
