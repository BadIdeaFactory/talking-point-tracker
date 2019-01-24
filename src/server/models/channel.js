module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    base_url: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    callSign: {
      type: DataTypes.STRING,
      field: 'call_sign',
    },
    streamId: {
      type: DataTypes.STRING,
      field: 'stream_id',
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
    tableName: 'channels',
  })

  Channel.associate = () => {}

  return Channel
}
