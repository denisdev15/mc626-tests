'use strict';

var helper = require('../helper.js');
var page = require('./login.po');

class LoginHelper {

  login(userEmail, userPassword) {
    return helper.getAndWait('localhost:8080/openmrs/', page.elUsername).then(function() {
      page.elUsername.sendKeys(userEmail);
      page.elUserPassword.sendKeys(userPassword);
      return helper.clickElement(page.elLogInBtn).then(function() {
        browser.sleep(500);
      });
    });
  }

  logout() {
    return helper.clickElement(page.logoutBtn);
  }

}

module.exports = new LoginHelper();
