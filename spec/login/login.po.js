/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

class LoginPage {
  constructor () {
    this.elUsername = element(by.id('username'));
    this.elUserPassword = element(by.id('password'));
    this.elLogInBtn = element(by.css('input[value="Log In"]'));
    this.elUserLogout = element(by.id('userLoggedOut'));
    this.errorMessage = element(by.id('openmrs_error'));
    this.welcomeMessage = element(by.className('portlet'));
    this.statusMessage = element(by.id('userLoggedInAs'));
    this.logoutBtn = element(by.id('userLogout')).element(by.tagName('a'));
  }
}

module.exports = new LoginPage();
