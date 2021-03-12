const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const uniquid = require("uniquid");
const Contacts = require("../models/contactsSchema");
const AppError = require("../helpers/appErrorClass");
const sendErrorMessage = require("../helpers/sendError");
const sendResponse = require("../helpers/sendResponse");

//verifying post request
const verifyPostRequest = (req, res, next) => {
  const requireProperties = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "status",
  ];
  let result = requireProperties.every((key) => {
    return req.body[key];
  });
  if (!result) {
    sendErrorMessage(
      new AppError(400, "unsuccessful", "request body is invalid"),
      req,
      res
    );
  } else {
    next();
  }
};
//fetch all contacts
const getAllContacts = (req, res, next) => {
  Contacts.find({})
    .then((allContacts) => {
      sendResponse(200, "Successful", allContacts, req, res);
    })
    .catch((err) => {
      console.log(err);
      sendErrorMessage(
        new AppError(400, "unsuccessful", "request body is inavlid"),
        req,
        res
      );
    });
};
//add new contact
const createContact = (req, res, next) => {
  const { firstName, lastName, email, phone, status } = req.body;
  let newContact = new Contacts({
    firstName,
    lastName,
    email,
    phone,
    status,
  });
  newContact
    .save()
    .then((data) => {
      sendResponse(201, "Successful", data, req, res);
    })
    .catch((err) => {
      console.log(err);
      sendErrorMessage(
        new AppError(400, "unsuccessful", "request body is inavlid"),
        req,
        res
      );
    });
};
//delete contact
const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  try {
    let deleteContact = await Contacts.deleteMany({ contactId });
    sendResponse(200, "Contact Deleted Successfully", deleteContact, req, res);
  } catch (err) {
    sendError(400, "Contact can't be deleted...", err, req, res);
  }
};
//update contact
const updateContact = async (req, res) => {
  const { contactId } = req.params;
  try {
    let update = {};
    if (req.body.firstName) update.firstName = req.body.firstName;
    if (req.body.lastName) update.lastName = req.body.lastName;
    if (req.body.email) update.email = req.body.email;
    if (req.body.phone) update.phone = req.body.phone;
    if (req.body.status) update.status = req.body.status;

    let contact = await Contacts.updateOne(
      { contactId },
      {
        $set: update,
      }
    );
    sendResponse(200, "Updated Successful", contact, req, res);
  } catch (err) {
    sendError(400, "Contact can't be updated by given id", err, req, res);
  }
};

module.exports.verifyPostRequest = verifyPostRequest;
module.exports.getAllContacts = getAllContacts;
module.exports.createContact = createContact;
module.exports.deleteContactById = deleteContactById;
module.exports.updateContact = updateContact;
