const { house, user } = require("../models");
const { Op } = require("sequelize");

// Filter Functions
const filterByTypeRent = typeRent => {
  if (!typeRent) return {};
  return { typeRent };
};

const filterByBelowPrice = belowPrice => {
  if (!belowPrice) return {};
  return {
    price: {
      [Op.lt]: belowPrice
    }
  };
};

// GET HOUSE
exports.index = async (req, res) => {
  try {
    const { typeRent, belowPrice } = req.query;
    const houses = await house.findAll({
      where: {
        ...filterByTypeRent(typeRent),
        ...filterByBelowPrice(belowPrice)
      },
      attributes: { exclude: ["createdAt", "updatedAt", "userId", "UserId"] },
      order: [["id", "DESC"]]
    });
    res.status(200).send({ data: houses });
  } catch (err) {
    console.log(err);
  }
};

// GET DETAIL HOUSE
exports.detail = async (req, res) => {
  try {
    const houses = await house.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: user,
          attributes: ["id"]
        }
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "userId", "UserId"] }
    });
    res.status(200).send({ data: houses });
  } catch (err) {
    console.log(err);
  }
};

// CREATE HOUSE
exports.create = async (req, res) => {
  try {
    req.body.userId = req.user; //put userId value
    if (req.role === "owner") {
      const newhouse = await house.create(req.body);
      const houses = await house.findOne({
        where: { id: newhouse.id },
        include: [
          {
            model: user,
            attributes: ["username"]
          }
        ],
        attributes: { exclude: ["createdAt", "updatedAt", "UserId", "userId"] }
      });
      res.status(200).send({ data: houses });
    } else {
      res.status(405).send({ message: "Forbidden Request,You are not Owner" });
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to create house!" });
    console.log(error);
  }
};

// PATCH HOUSE
exports.update = async (req, res) => {
  try {
    await house.update(req.body, { where: { id: req.params.id } });
    const houses = await house.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["createdAt", "updatedAt", "userId", "UserId"] }
    });
    res.status(201).send({ data: houses });
  } catch (err) {
    console.log(err);
  }
};

// DELETE HOUSE
exports.delete = async (req, res) => {
  const id = { id: req.params.id };
  try {
    await house.destroy({ where: id });
    res.status(200).send({ data: id });
  } catch (err) {
    console.log(err);
  }
};

// LIST HOUSE BY OWNER
exports.listing = async (req, res) => {
  try {
    if (req.role === "owner") {
      const houses = await house.findAll({
        where: { userId: req.user },
        attributes: { exclude: ["createdAt", "updatedAt", "userId", "UserId"] },
        order: [["id", "DESC"]]
      });
      res.status(200).send({ data: houses });
    }
  } catch (err) {
    console.log(err);
  }
};
