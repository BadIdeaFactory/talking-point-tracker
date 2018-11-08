module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('sentences', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    content: {
      type: Sequelize.TEXT,
    },
    channel_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'channels',
        key: 'id'
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

  down: queryInterface => queryInterface.dropTable('sentences'),
};
