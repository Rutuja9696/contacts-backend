const express = require("express");
const {
  verifyPostRequest,
  getAllContacts,
  createContact,
} = require("../controllers/actionController");

const router = express.Router();

router.route("/").get(getAllContacts).post(verifyPostRequest, createContact);
// router.route("/add").post(createContact);

module.exports = router;
