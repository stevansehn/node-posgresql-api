const { Sequelize, DataTypes } = require("sequelize");

// Database connection configuration
const postgresConnection = {
  database: "mydatabase",
  username: "myuser",
  password: "mypassword",
  host: "localhost",
  dialect: "postgres",
};

class DbManager {
  constructor() {
    // Sequelize instance and model container
    this._sequelize = null;
    this._models = new Map();
  }

  // Initialize database connection and models
  async initialize() {
    this._sequelize = new Sequelize(postgresConnection);
    
    try {
      // Authenticate connection
      await this._sequelize.authenticate();
      console.log("Connection to the database has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
    
    // Define and sync User model
    await this.defineUserModel();
    await this.syncModels();
  }

  // Define User model
  defineUserModel() {
    const User = this._sequelize.define("User", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    });
    this._models.set("user", User);
  }

  // Sync defined models with the database
  async syncModels() {
    try {
      await this._sequelize.sync();
      console.log("Database and tables synced successfully.");
    } catch (error) {
      console.error("Unable to sync database and tables:", error);
    }
  }

  // Get Sequelize instance
  get sequelize() {
    return this._sequelize;
  }

  // Get a specific model by name
  getModel(modelName) {
    return this._models.get(modelName);
  }
}

module.exports = DbManager;
