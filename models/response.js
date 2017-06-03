module.exports = function(sequelize, DataTypes) {
  var Response = sequelize.define("Response", {
    see: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    expect: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
          len: [1]
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  });
  return Response;
};