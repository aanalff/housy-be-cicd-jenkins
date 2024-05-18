const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { user } = require("../models");

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await user.findOne({
      where: {
        username
      }
    });

    if (!users) {
      res.status(401).send({ message: "Authentication Failure" });
    } else {
      const role = users.role;
      bcrypt.compare(password, users.password, (err, result) => {
        if (result) {
          jwt.sign({ id: users.id }, process.env.SECRET_KEY, (err, token) => {
            const data = {
              username,
              role,
              token
            };
            res.status(200).send({ data });
          });
        } else {
          res.status(401).send({ message: "Invalid Username or Password" });
        }
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
};
