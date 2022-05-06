module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    const sql = require("../models/db.js");

    // Create a new Tutorial
    //router.post("/", users.create);
    router.post("/users", (req, res) => {
      const username = req.body.username;
      const password = req.body.password;
      const premium = req.body.premium;
      sql.query("INSERT INTO user (username, password, premium) VALUES (?, ?, ?)", [username, password, premium], (err, result) => {
        if (err) {
            console.log("error: ", err);
            res.send({ err: err});
        }
        if (result) {
          res.send(result);
        } else {
          res.send({ message: "Invalid username/password"});
        }
      });
    });

    router.post("/login", (req, res) => {
      const username = req.body.username;
      const password = req.body.password;
      sql.query("SELECT * FROM user WHERE username = ? AND password = ?", [username, password], (err, result) => {
        if (err) {
            console.log("error: ", err);
          res.send({err: err});  
        }
          if (result.length > 0) {
            res.send(result);
          } else {
            res.send({ message: "Invalid credentials "});
          }

      });
    });

    // router.post("/users", (req, res) => {
    //   sql.query("SELECT * FROM recipe WHERE user = ?", [username], (err, result) => {
    //     if (err) {
    //         console.log("error: ", err);
    //       res.send({err: err});  
    //     }
    //       if (result.length > 0) {
    //         res.send(result);
    //       } else {
    //         res.send({ message: ""});
    //       }

    //   });
    // });


    // Retrieve all users
    // router.get("/", users.findAll);
    // // Retrieve all published users
    // router.get("/published", users.findAllPublished);
    // Retrieve a single User with id
    router.get("/:username", users.findOne);
    // // Update a Tutorial with id
    // router.put("/:id", users.update);
    // // Delete a Tutorial with id
    // router.delete("/:id", users.delete);
    // // Delete all users
    // router.delete("/", users.deleteAll);
    app.use('/api', router);
  };