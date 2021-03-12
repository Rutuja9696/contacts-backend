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

module.exports.verifyPostRequest = verifyPostRequest;
module.exports.getAllContacts = getAllContacts;
