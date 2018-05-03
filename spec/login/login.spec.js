'use strict';

var config = require('../config');
var helper = require('../helper');
var loginHelper = require('./loginHelper');

describe('Login Tests', function() {
  var page = require('./login.po');
  var username = config.user.username;
  var password = config.user.password;
  var firstName = config.user.firstName;
  var lastName = config.user.lastName;
  var wrongUsername = 'wrong';
  var wrongPassword = 'wrongpassword';

  afterAll(function() {
    return loginHelper.logout();
  });

  describe('Testando por classses de equivalencia', function() {
    // Testando por classes de equivalencia
    // N  Classe     username       password
    // 1  Inválida    admin         wrongPassword
    // 2  Inválida    wrong         Admin123
    // 3  Válida      admin         Admin123

    it('Classe 1 - Inválida ', function() {
      return loginHelper.login(username, wrongPassword).then(function() {
        expect(page.errorMessage.isPresent()).toEqual(true);
        expect(page.errorMessage.getText()).toEqual('Invalid username/password. Please try again.');
      });
    });

    it('Classe 2 - Inválida ', function() {
      return loginHelper.login(wrongUsername, password).then(function() {
        expect(page.errorMessage.isPresent()).toEqual(true);
        expect(page.errorMessage.getText()).toEqual('Invalid username/password. Please try again.');
      });
    });

    it('Classe 3 - Válida ', function() {
      return loginHelper.login(username, password).then(function() {
        expect(page.welcomeMessage.isPresent()).toEqual(true);
        expect(page.welcomeMessage.getText()).toEqual('Hello, ' + firstName + '. Welcome to OpenMRS.');
        expect(page.statusMessage.getText()).toEqual('Currently logged in as ' + firstName + ' ' + lastName);
      });
    });

  });

});
