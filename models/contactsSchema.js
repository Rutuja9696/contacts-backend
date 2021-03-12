const mongoose = require("mongoose");
const contactsSchema = new mongoose.Schema({
  contactId: {
    type: String,
  },
  firstName: {
    type: String,
    required: [true, "Please enter your first name"],
    validate: {
      validator: function (firstName) {
        console.log("this is validator", this);
        return this.firstName.trim().length;
        return true;
      },
      message: "first name should not be empty",
    },
  },
  lastName: {
    type: String,
    required: [true, "Please enter last name"],
    validate: {
      validator: function (lastName) {
        console.log("this is validator", this);
        return this.lastName.trim().length;
        return true;
      },
      message: "last name should not be empty",
    },
  },
  status: {
    type: String,
    default: "Active",
    enum: ["Active", "Inactive"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Contacts = mongoose.model("Contacts", contactsSchema);
module.exports = Contacts;
