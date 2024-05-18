const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { user } = require("../models");

exports.signup = async (req, res) => {
  try {
    const saltRounds = 10;
    const { username, password } = req.body;
    const users = await user.findOne({
      where: {
        username
      }
    });

    if (!users) {
      const role = req.body.role;
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        const value = {
          ...req.body,
          password: hash
        };
        const newUser = await user.create(value);
        jwt.sign({ id: newUser.id }, process.env.SECRET_KEY, (err, token) => {
          const data = {
            username,
            token,
            role
          };
          res.status(201).send({ data });
        });
      });
    } else {
      res.status(400).send({ message: "Username already registered" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
};
