// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the responses
  app.get("/api/responses", function(req, res) {
    // Sequelize code to find all posts, and return them to the user with res.json
     // findAll returns all entries for a table when used with no options
    db.Response.findAll({}).then(function(respondent) {
      // We have access to the responses as an argument inside of the callback function
      res.json(respondent);
    });
  });

  // Get route for returning responses of a specific category
  app.get("/api/responses/category/:category", function(req, res) {
    // Sequelize code to find all posts where the category is equal to req.params.category,
    // return the result to the user with res.json
    db.Response.findAll({
      where: {
        category: req.params.category
      }
    }).then(function(respondent){
      res.json(respondent);
    });

  });

  // Get route for retrieving a single response
  app.get("/api/responses/:id", function(req, res) {
    // Sequelize code to find a single response where the id is equal to req.params.id,
    // return the result to the user with res.json
    db.Response.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(respondent){
      res.json(respondent);
    });
  });

  // POST route for saving a new post
  app.post("/api/responses", function(req, res) {
    // Sequelize code for creating a response using req.body,
    // then return the result using res.json
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a see, name, expect
    // and date property (req.body)
    db.Response.create({
      see: req.body.see,
      name: req.body.name,
      expect: req.body.expect,
      date: req.body.date
    }).then(function(respondent) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(respondent);
    });
  });

  // DELETE route for deleting responses
  app.delete("/api/responses/:id", function(req, res) {
    // Sequelize code to delete a response where the id is equal to req.params.id, 
    // then return the result to the user using res.json
     // We just have to specify which response we want to destroy with "where"
    db.Response.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(respondent) {
      res.json(respondent);
    });
  });

  // PUT route for updating responses
  app.put("/api/responses", function(req, res) {
    // Update a post using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json
     // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Response.update({
      see: req.body.see,
      name: req.body.name,
      expect: req.body.expect,
      date: req.body.date
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(respondent) {
      res.json(respondent);
    });
  });
};
