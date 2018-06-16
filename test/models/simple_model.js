module.exports = (Sequelize, DataTypes) => {
  let SimpleModel = Sequelize.define('SimpleModel', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    stringColumn: {
      type: DataTypes.STRING,
      description: 'string'
    }
  }, {
    tableName: 'simple_models',
    timestamps: false,
    paranoid: false
  })

  SimpleModel.classFn = () => {
    return true
  }

  SimpleModel.prototype.instanceFn = function () {
    return Sequelize.literal('id')
  }

  return SimpleModel
}
