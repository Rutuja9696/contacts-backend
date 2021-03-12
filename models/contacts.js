const uniqid = require("uniqid");
class Contacts {
  constructor(taskName, status = "pending") {
    this.contactId = uniqid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.status = "active";
  }
}
module.exports = Contacts;
