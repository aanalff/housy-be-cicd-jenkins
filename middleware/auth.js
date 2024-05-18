const jwt = require("jsonwebtoken");
const { user } = require("../models");

exports.authenticated = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (token) {
      token = token.replace("Bearer ", "");
      const data = jwt.verify(token, process.env.SECRET_KEY);
      
      if (data) {
        const users = await user.findOne({ where: { id: data.id } });
        
        if (!users) {
          res.status(403).send({ message: "Forbidden request!" });
        } else {
          req.user = users.id;
          req.role = users.role;
          req.token = token;
          next();
        }
      } else {
        res.status(403).send({ message: "Forbidden request!" });
      }
    } else {
      res.status(401).send({ message: "You're unauthorized!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
};
