const express = require("express");
const http = require("http");

const AppRouter = require("./appRouter");
const DbManager = require("./dbManager");

const bodyParser = require("body-parser");

class App {
  constructor() {
    this._app = null;
    this._server = null;
    this._dbManager = null;
  }

  async initialize() {
    this._dbManager = new DbManager();
    this._dbManager.initialize();
    const app = express();
    app.use(bodyParser.json());
    app.use("/v1", AppRouter.getRoutes(this._dbManager));
    this._app = app;
    this._server = http.createServer({ keepAlive: true }, this._app);
  }

  get app() {
    return this._app;
  }

  get server() {
    return this._server;
  }
}

module.exports = App;
