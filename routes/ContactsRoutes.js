const express = require("express");
const {
  verifyPostRequest,
  getAllContacts,
  createContact,
  deleteContactById,
} = require("../controllers/actionController");

const router = express.Router();

router.route("/").get(getAllContacts).post(verifyPostRequest, createContact);
router.route("/:id").delete(deleteContactById);

module.exports = router;
