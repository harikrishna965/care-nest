module.exports = (sequelize, Sequelize) => {
  return sequelize.define("patient", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    address: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
  });
};
