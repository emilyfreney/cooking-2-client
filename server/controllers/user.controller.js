const User = require("../models/User.model.js");
// Create and Save a new Tutorial
exports.create = (req, res) => {
       // Validate request
       if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      // Create a User
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        premium: req.body.premium || false
      });
      // Save User in the database
      User.create(user, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        else {
            console.log(user);
            res.send(data);
        }    
      });
};

// Find a single Tutorial with a id
exports.findOne = (req, res) => {
    User.validateUser(req.params.username, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with given credentials ${req.params.username}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving User with username " + req.params.username
            });
          }
        } else res.send(data);
      });
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};