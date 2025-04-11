const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};

// Sequelize instance
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.user = require("./user.model")(sequelize, Sequelize);
db.patient = require("./patient.model")(sequelize, Sequelize);
db.tenant = require("./tenant.model")(sequelize, Sequelize);

// Associations
db.user.hasOne(db.patient, { foreignKey: "userId", onDelete: "CASCADE" });
db.patient.belongsTo(db.user, { foreignKey: "userId" });

db.user.hasOne(db.tenant, { foreignKey: "userId", onDelete: "CASCADE" });
db.tenant.belongsTo(db.user, { foreignKey: "userId" });

module.exports = db;
