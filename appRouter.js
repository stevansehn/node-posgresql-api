// appRouter.js
const express = require("express");

class AppRouter {
  static getRoutes(dbManager) {
    const router = express.Router();
    const userModel = dbManager.getModel("user");

    router.use((req, res, next) => {
      next();
    });

    // GET all users
    router.get("/users", async (req, res) => {
      try {
        const users = await userModel.findAll();
        res.json(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    // GET a single user by ID
    router.get("/users/:id", async (req, res) => {
      const userId = req.params.id;
      try {
        const user = await userModel.findByPk(userId);
        if (user) {
          res.json(user);
        } else {
          res.status(404).send("User not found");
        }
      } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        res.status(500).send("Internal Server Error");
      }
    });

    // POST create a new user
    router.post("/users", async (req, res) => {
      const { username, email } = req.body;
      try {
        const newUser = await userModel.create({ username, email });
        res.status(201).json(newUser);
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    // PUT update a user by ID
    router.put("/users/:id", async (req, res) => {
      const userId = req.params.id;
      const { username, email } = req.body;
      try {
        const user = await userModel.findByPk(userId);
        if (user) {
          user.username = username;
          user.email = email;
          await user.save();
          res.json(user);
        } else {
          res.status(404).send("User not found");
        }
      } catch (error) {
        console.error(`Error updating user with ID ${userId}:`, error);
        res.status(500).send("Internal Server Error");
      }
    });

    // DELETE a user by ID
    router.delete("/users/:id", async (req, res) => {
      const userId = req.params.id;
      try {
        const user = await userModel.findByPk(userId);
        if (user) {
          await user.destroy();
          res.status(204).send();
        } else {
          res.status(404).send("User not found");
        }
      } catch (error) {
        console.error(`Error deleting user with ID ${userId}:`, error);
        res.status(500).send("Internal Server Error");
      }
    });

    return router;
  }
}

module.exports = AppRouter;
