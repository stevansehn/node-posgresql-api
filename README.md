# node-posgresql-api

 A Node.js and Express RESTful API with PostgreSQL Integration for CRUD Operations.

## Description

This project implements a simple RESTful API using Node.js and Express, with PostgreSQL as the underlying database. It provides endpoints for basic CRUD (Create, Read, Update, Delete) operations on a "Users" table.

## Features

- RESTful API endpoints for managing users
- PostgreSQL database integration
- Create, retrieve, update, and delete user records

## Getting Started

### Prerequisites

- Node.js and npm installed
- PostgreSQL database server

### Installation

1. Clone the repository.
2. Install dependencies: `npm install`
3. Configure PostgreSQL connection in `dbManager.js`
4. Run the application: `npm start`

## Usage

- Access the API at `http://localhost:3000`
- Use API endpoints to interact with the "Users" resource

## Endpoints

- **GET /users**: Retrieve all users
- **GET /users/:id**: Retrieve user by ID
- **POST /users**: Create a new user
- **PUT /users/:id**: Update user by ID
- **DELETE /users/:id**: Delete user by ID
