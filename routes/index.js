const express = require("express");
const router = express.Router();
require("dotenv").config();
const { authenticated } = require("../middleware/auth");
const { signin } = require("../controllers/signin");
const { signup } = require("../controllers/signup");

router.post("/signin", signin);
router.post("/signup", signup);

const {
  index: getData,
  detail: getDetail,
  create: addHouse,
  update: updateHouse,
  delete: deleteHouse,
  listing: listing
} = require("../controllers/house");

router.get("/houses", getData);
router.get("/house/:id", getDetail);

// Auth
router.post("/house", authenticated, addHouse);
router.patch("/house/:id", authenticated, updateHouse);
router.delete("/house/:id", authenticated, deleteHouse);
router.get("/listing", authenticated, listing);

const {
  create: createTrx,
  update: updateTrx,
  detail: getTrx,
  getAll: getAll
} = require("../controllers/transaction");

router.post("/order", authenticated, createTrx);
router.patch("/order/:id", authenticated, updateTrx);

// GET Booking By Id
router.get("/order/:id", authenticated, getTrx);
router.get("/orders", authenticated, getAll);

const {
  index: getUser,
  get: getProfile,
  remove: removeUsr
} = require("../controllers/user");

router.get("/user", authenticated, getProfile);
router.get("/users", authenticated, getUser);
router.delete("/users/:id", authenticated, removeUsr);

module.exports = router;