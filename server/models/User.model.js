const sql = require("./db.js");


// constructor
const User = function(user) {
    this.username = user.username;
    this.password = user.password;
    this.premium = user.premium;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        // unsure of this line
        console.log("created user: ", {...newUser });
    });
};


// Check to see if result of this is null. If it is, user is not valid
User.validateUser = (username, result) => {
    sql.query(`SELECT * FROM user WHERE username = ${username}` , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };

module.exports = User;