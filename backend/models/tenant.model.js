module.exports = (sequelize, Sequelize) => {
  return sequelize.define("tenant", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    hospitalName: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
  });
};
