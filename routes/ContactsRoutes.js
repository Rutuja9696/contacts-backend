const express = require("express");
const {
  verifyPostRequest,
  getAllContacts,
} = require("../controllers/actionController");

const router = express.Router();

router.route("/").get(getAllContacts).post(verifyPostRequest);
module.exports = router;
