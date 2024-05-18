const { house, user } = require("../models");

exports.index = async (req, res) => {
  try {
    const users = await user.findAll({
      include: [
        {
          model: house,
          attributes: { exclude: ["createdAt", "updatedAt"] }
        }
      ]
    });
    res.send({ data: users });
  } catch (error) {
    console.log(error);
  }
};

exports.get = async (req, res) => {
  const id = req.user;
  try {
    const users = await user.findOne({
      where: { id: id },
      attributes: { exclude: ["createdAt", "updatedAt"] }
    });
    res.status(200).send({ data: users });
  } catch (error) {}
};

exports.remove = async (req, res) => {
  const id = { id: req.params.id };
  try {
    await user.destroy({ where: id });
    res.status(200).send({ data: id });
  } catch (error) {
    console.log(error);
  }
};
