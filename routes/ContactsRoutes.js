const express = require("express");
const {
  verifyPostRequest,
  getAllContacts,
  createContact,
  deleteContactById,
  updateContact,
} = require("../controllers/actionController");

const router = express.Router();

router.route("/").get(getAllContacts).post(verifyPostRequest, createContact);
router.route("/:contactId").delete(deleteContactById).put(updateContact);

module.exports = router;
