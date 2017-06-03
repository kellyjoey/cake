// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/responses.html"));
  });

  // Route to the questionnaire page
  app.get("/questionnaire", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/questionnaire.html"));
  });

  // blog route loads blog.html
  app.get("/responses", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/responses.html"));
  });

};
