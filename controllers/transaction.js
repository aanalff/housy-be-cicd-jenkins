const { transaction, house, user } = require("../models");

exports.create = async (req, res) => {
  try {
    const houseId = req.body.houseId;
    const houses = await house.findOne({
      where: { id: houseId },
      include: [
        {
          model: user,
          attributes: ["id"]
        }
      ]
    });

    req.body.ownerId = houses.user.id; // Set Owner ID
    req.body.userId = req.user; // Set User Id
    req.body.paid = 0; // Set Paid Status

    const transactions = await transaction.create(req.body);
    const addTrx = await transaction.findOne({
      where: { id: transactions.id },
      include: {
        model: house,
        attributes: { exclude: ["createdAt", "updatedAt"] }
      }
    });

    res.status(201).send({ data: addTrx });
  } catch (err) {
    console.log(err);
  }
};

// Patch Transaction
exports.update = async (req, res) => {
  const userId = req.user;
  try {
    await transaction.update(req.body, { where: { id: req.params.id } });
    const transactions = await transaction.findOne({
      where: { id: req.params.id, userId: userId },
      include: [
        {
          model: house,
          attributes: { exclude: ["createdAt", "updatedAt"] }
        },
        { model: user, attributes: ["fullName", "gender", "phone"] }
      ]
    });
    res.status(201).send({ data: transactions });
  } catch (err) {
    console.log(err);
  }
};

// GET DETAIL ORDER BY TENANT USER ID
exports.detail = async (req, res) => {
  try {
    if (req.role === "owner") {
      const transactions = await transaction.findOne({
        where: { id: req.params.id, ownerId: req.user },
        include: [
          {
            model: house,
            attributes: { exclude: ["createdAt", "updatedAt"] }
          },
          { model: user, attributes: ["fullName", "gender", "phone"] }
        ]
      });
      res.status(200).send({ data: transactions });
    } else {
      const transactions = await transaction.findOne({
        where: { id: req.params.id, userId: req.user },
        include: [
          {
            model: house,
            attributes: { exclude: ["createdAt", "updatedAt"] }
          },
          { model: user, attributes: ["fullName", "gender", "phone"] }
        ]
      });
      res.status(200).send({ data: transactions });
    }
  } catch (err) {
    console.log(err);
  }
};

// Get All Transaction Booking
exports.getAll = async (req, res) => {
  try {
    if (req.role === "owner") {
      const transactions = await transaction.findAll({
        where: { ownerId: req.user },
        include: [
          {
            model: house,
            attributes: ["name", "typeRent"]
          },
          {
            model: user,
            attributes: ["fullName"]
          }
        ],
        attributes: {
          exclude: ["updatedAt", "HouseId", "UserId", "userId"]
        },
        order: [["id", "DESC"]]
      });
      res.status(200).send({ data: transactions });
    } else {
      const transactions = await transaction.findAll({
        where: { userId: req.user },
        include: [
          {
            model: house,
            attributes: ["name", "typeRent"]
          },
          {
            model: user,
            attributes: ["fullName"]
          }
        ],
        attributes: {
          exclude: ["updatedAt", "HouseId", "UserId", "userId"]
        },
        order: [["id", "DESC"]]
      });
      res.status(200).send({ data: transactions });
    }
  } catch (err) {
    console.log(err);
  }
};

// GET ALL TRANSACTION HISTORY APPROVED
exports.history = async (req, res) => {
  try {
    if (req.role === "owner") {
      const transactions = await transaction.findAll({
        where: { ownerId: req.user,  },
        include: [
          {
            model: house,
            attributes: ["name", "typeRent"]
          },
          {
            model: user,
            attributes: ["fullName"]
          }
        ],
        attributes: {
          exclude: ["updatedAt", "HouseId", "UserId", "userId"]
        },
        order: [["id", "DESC"]]
      });
      res.status(200).send({ data: transactions });
    } else {
      const transactions = await transaction.findAll({
        where: { userId: req.user },
        include: [
          {
            model: house,
            attributes: ["name", "typeRent"]
          },
          {
            model: user,
            attributes: ["fullName"]
          }
        ],
        attributes: {
          exclude: ["updatedAt", "HouseId", "UserId", "userId"]
        },
        order: [["id", "DESC"]]
      });
      res.status(200).send({ data: transactions });
    }
  } catch (err) {
    console.log(err);
  }
};