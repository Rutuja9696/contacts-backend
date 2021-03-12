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
  const requireProperties = ["firstName", "lastName"];
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
      console.log("All contacts");
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
  console.log(req.body);
  const { firstName, lastName } = req.body;
  let newContact = new Contacts({
    firstName,
    lastName,
  });
  newContact
    .save()
    .then((data) => {
      console.log(data);
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
// const deleteContact = (req, res, next) => {
//   // console.log(req.params.id);
//   Contact.findOneAndDelete({ contactId: req.params.id })
//     .then((data) => {
//       console.log(data);
//       sendResponse(201, "Successful", data, req, res);
//     })
//     .catch((err) => {
//       console.log(err);
//       sendErrorMessage(
//         new AppError(400, "unsuccessful", "Id to delete not found"),
//         req,
//         res
//       );
//     });
// };
const deleteContactById = async (req, res) => {
  const { contactId } = req.params.id;
  try {
    let deleteContact = await Contacts.deleteOne({ contactId });
    sendResponse(200, "Contact Deleted Successfully", deleteContact, req, res);
  } catch (err) {
    sendError(400, "Contact can't be deleted...", err, req, res);
  }
};
module.exports.verifyPostRequest = verifyPostRequest;
module.exports.getAllContacts = getAllContacts;
module.exports.createContact = createContact;
module.exports.deleteContactById = deleteContactById;
