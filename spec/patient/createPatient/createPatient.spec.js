'use strict';

var config = require('../../config');
var helper = require('../../helper');
var loginHelper = require('../../login/loginHelper');
var patientHelper = require('../patientHelper');

describe('Create Patient Tests', function() {
  var page = require('../patient.po');

  beforeAll(function() {
    return loginHelper.login(config.user.username, config.user.password).then();
  });

  afterAll(function() {
    //logout
    return loginHelper.logout();
  });
  // Base para os testes - Class Person Validator
  /*
	 * @should fail validation if birthdate makes patient older that 120 years old - Classe de eq. 10
	 * @should fail validation if birthdate is a future date - Classes de eq 7 e 9
	 * @should fail validation if deathdate is a future date
	 * @should fail validation if birthdate is after death date
	 * @should fail validation if voidReason is blank when patient is voided
	 * @should fail validation if causeOfDeath is blank when patient is dead
	 * @should pass validation if gender is blank for Persons - Classes de eq 1, 2, 3 e 4
	 * @should pass validation if field lengths are correct
	 * @should fail validation if field lengths are not correct
	 */

  // Testando por classes de equivalencia
  describe('Classes de equivalencia', function() {

    describe('Classes inválidas', function() {

      beforeEach(function() {
        return patientHelper.getPatientPage().then(function() {
          browser.sleep(100);
        });
      });

      // Classe 1 - Inválida
      // Name       Birthdate  Age        Gender
      // Em branco  Em branco  Em branco  Em branco
      it('Classe 1 - Inválida', function() {
        return helper.clickElement(page.createPatient).then(function() {
          browser.sleep(300);
          expect(page.nameError.isDisplayed()).toEqual(true);
          expect(page.nameError.getText()).toEqual('Please select a name');
          expect(page.birthdateError.isDisplayed()).toEqual(true);
          expect(page.birthdateError.getText()).toEqual('Please select a valid birthdate or age');
          expect(page.genderError.isDisplayed()).toEqual(true);
          expect(page.genderError.getText()).toEqual('Please select a gender');
        });
      });

      // Classe 2 - Inválida
      // Name     Birthdate  Age     Gender
      // Válido   Em Branco  Válido  Em branco
      it('Classe 2 - Inválida', function() {
        page.patientName.sendKeys(helper.randomText());
        page.patientAge.sendKeys(helper.randomNumber());
        return helper.clickElement(page.createPatient).then(function() {
          browser.sleep(300);
          expect(page.nameError.isDisplayed()).toEqual(false);
          expect(page.birthdateError.isDisplayed()).toEqual(false);
          expect(page.genderError.isDisplayed()).toEqual(true);
          expect(page.genderError.getText()).toEqual('Please select a gender');
        });
      });

      // Classe 3 - Inválida
      // Name     Birthdate  Age        Gender
      // Válido   Válido     Em branco  Em branco
      it('Classe 3 - Inválida', function() {
        page.patientName.sendKeys(helper.randomText());
        page.patientBirthdate.sendKeys(helper.randomDate());
        browser.sleep(100);
        return helper.clickElementAndWaitToBeClickable(page.patientAge, page.patientMaleGender).then(function() {
          browser.sleep(100);
          return helper.clickElement(page.createPatient).then(function() {
            browser.sleep(300);
            expect(page.nameError.isDisplayed()).toEqual(false);
            expect(page.birthdateError.isDisplayed()).toEqual(false);
            expect(page.genderError.isDisplayed()).toEqual(true);
            expect(page.genderError.getText()).toEqual('Please select a gender');
          });
        });
      });

      // Classe 4 - Inválida
      // Name     Birthdate  Age     Gender
      // Válido   Válido     Válido  Em branco
      it('Classe 4 - Inválida', function() {
        page.patientName.sendKeys(helper.randomText());
        page.patientBirthdate.sendKeys(helper.randomDate());
        browser.sleep(100);
        return helper.clickElementAndWaitToBeClickable(page.patientAge, page.patientMaleGender).then(function() {
          browser.sleep(100);
          page.patientAge.sendKeys(helper.randomNumber(90));
          return helper.clickElement(page.createPatient).then(function() {
            browser.sleep(300);
            expect(page.nameError.isDisplayed()).toEqual(false);
            expect(page.birthdateError.isDisplayed()).toEqual(false);
            expect(page.genderError.isDisplayed()).toEqual(true);
            expect(page.genderError.getText()).toEqual('Please select a gender');
          });
        });
      });

      // Classe 5 - Inválida
      // Name     Birthdate  Age        Gender
      // Válido   Em Branco  Em Branco  Válido
      it('Classe 5 - Inválida', function() {
        page.patientName.sendKeys(helper.randomText());
        return helper.clickElement(page.patientMaleGender).then(function() {
          return helper.clickElement(page.createPatient).then(function() {
            browser.sleep(300);
            expect(page.nameError.isDisplayed()).toEqual(false);
            expect(page.birthdateError.isDisplayed()).toEqual(true);
            expect(page.birthdateError.getText()).toEqual('Please select a valid birthdate or age');
            expect(page.genderError.isDisplayed()).toEqual(false);
          });
        });
      });

      // Classe 6 - Inválida
      // Name       Birthdate  Age     Gender
      // Em Branco  Em Branco  Válido  Válido
      it('Classe 6 - Inválida', function() {
        page.patientAge.sendKeys(helper.randomNumber(90));
        return helper.clickElement(page.patientMaleGender).then(function() {
          return helper.clickElement(page.createPatient).then(function() {
            browser.sleep(300);
            expect(page.nameError.isDisplayed()).toEqual(true);
            expect(page.nameError.getText()).toEqual('Please select a name');
            expect(page.birthdateError.isDisplayed()).toEqual(false);
            expect(page.genderError.isDisplayed()).toEqual(false);
          });
        });
      });

      // Classe 7 - Inválida
      // Name       Birthdate     Age        Gender
      // Válido     Inválido      Em branco  Válido
      //          (data futura)
      it('Classe 7 - Inválida', function() {
        page.patientName.sendKeys(helper.randomText());
        var day = new Date();
        var nextDay = new Date(day);
        nextDay.setDate(day.getDate()+1);
        page.patientBirthdate.sendKeys(helper.getDateString(nextDay));
        browser.sleep(100);
        return helper.clickElementAndWaitToBeClickable(page.patientAge, page.patientMaleGender).then(function() {
          browser.sleep(100);
          return helper.clickElement(page.patientMaleGender).then(function() {
            return helper.clickElement(page.createPatient).then(function() {
              browser.sleep(300);
              expect(page.nameError.isDisplayed()).toEqual(false);
              expect(page.birthdateError.isDisplayed()).toEqual(true);
              expect(page.birthdateError.getText()).toEqual('Please select a valid birthdate or age');
              expect(page.genderError.isDisplayed()).toEqual(false);
            });
          });
        });
      });

      // Classe 8 - Inválida
      // Name    Birthdate     Age         Gender
      // Válido  Em branco     Inválido    Válido
      //                     (Not a number)
      it('Classe 8 - Inválida', function() {
        page.patientName.sendKeys(helper.randomText());
        page.patientAge.sendKeys('bla');
        return helper.clickElement(page.patientMaleGender).then(function() {
          return helper.clickElement(page.createPatient).then(function() {
            browser.sleep(300);
            expect(page.nameError.isDisplayed()).toEqual(false);
            expect(page.birthdateError.isDisplayed()).toEqual(true);
            expect(page.birthdateError.getText()).toEqual('Please select a valid birthdate or age');
            expect(page.genderError.isDisplayed()).toEqual(false);
          });
        });
      });

      // Classe 9 - Inválida
      // Name       Birthdate   Age         Gender
      // Válido     Inválido    Válido    Válido
      //          (data futura)
      it('Classe 9 - Inválida', function() {
        page.patientName.sendKeys(helper.randomText());
        page.patientAge.sendKeys(helper.randomNumber());
        var nextDay = new Date();
        nextDay.setDate(nextDay.getDate()+1);
        page.patientBirthdate.sendKeys(helper.getDateString(nextDay));
        browser.sleep(100);
        return helper.clickElementAndWaitToBeClickable(page.patientAge, page.patientMaleGender).then(function() {
          browser.sleep(100);
          return helper.clickElement(page.patientMaleGender).then(function() {
            return helper.clickElement(page.createPatient).then(function() {
              browser.sleep(300);
              expect(page.nameError.isDisplayed()).toEqual(false);
              expect(page.birthdateError.isDisplayed()).toEqual(true);
              expect(page.birthdateError.getText()).toEqual('Please select a valid birthdate or age');
              expect(page.genderError.isDisplayed()).toEqual(false);
            });
          });
        });
      });

      // Classe 10 - Inválida
      // Name       Birthdate   Age         Gender
      // Válido     Inválido    Em Branco   Válido
      //          (idade > 120)
      it('Classe 10 - Inválida', function() {
        page.patientName.sendKeys(helper.randomText());
        page.patientAge.sendKeys(helper.randomNumber());
        var date = new Date(new Date().setFullYear(new Date().getFullYear() - 121));
        page.patientBirthdate.sendKeys(helper.getDateString(date));
        browser.sleep(100);
        return helper.clickElementAndWaitToBeClickable(page.patientAge, page.patientMaleGender).then(function() {
          browser.sleep(100);
          return helper.clickElement(page.patientMaleGender).then(function() {
            return helper.clickElement(page.createPatient).then(function() {
              browser.sleep(300);
              expect(page.nameError.isDisplayed()).toEqual(false);
              expect(page.birthdateError.isDisplayed()).toEqual(true);
              expect(page.birthdateError.getText()).toEqual('Please select a valid birthdate or age');
              expect(page.genderError.isDisplayed()).toEqual(false);
            });
          });
        });
      });

    });

    describe('Classes válidas', function() {

      // Classe 11 - Válida
      // Name    Birthdate    Age         Gender
      // Válido  Válido       Inválido    Válido
      //                    (Not a number)
      it('Classe 11 - Válida', function() {
        var patient = {
          name: helper.randomText(),
          birthdate: helper.randomDate(),
          age: 'bla',
          male: true
        };
        return patientHelper.createPatient(patient);
      });

      // Classe 12 - Válida
      // Name    Birthdate    Age       Gender
      // Válido  Válido       Válido    Válido
      it('Classe 12 - Válida', function() {
        var patient = {
          name: helper.randomText(),
          birthdate: helper.randomDate(),
          age: helper.randomNumber(),
          male: true
        };
        return patientHelper.createPatient(patient);
      });

    });

  });

  // Testando por análise de valor limite

  describe('Análise de valor limite', function() {

    describe('Casos válidos', function() {

      it('Caso de Teste 1 - idade == 119 - Válida', function() {
        var patient = {
          name: helper.randomText(),
          birthdate: helper.randomDate(),
          age: '119',
          male: true
        };
        return patientHelper.createPatient(patient);
      });

      it('Caso de Teste 2 - idade == 0 - Válida', function() {
        var patient = {
          name: helper.randomText(),
          birthdate: helper.randomDate(),
          age: '119',
          male: true
        };
        return patientHelper.createPatient(patient);
      });

    });

    describe('Casos inválidos', function() {

      beforeEach(function() {
        return patientHelper.getPatientPage().then(function() {
          browser.sleep(100);
        });
      });

      it('Caso de Teste 3 - idade == 120 - Inválida', function() {
        page.patientName.sendKeys(helper.randomText());
        page.patientAge.sendKeys('120');
        return helper.clickElement(page.patientMaleGender).then(function() {
          return helper.clickElement(page.createPatient).then(function() {
            browser.sleep(300);
            expect(page.nameError.isDisplayed()).toEqual(false);
            expect(page.birthdateError.isDisplayed()).toEqual(true);
            expect(page.birthdateError.getText()).toEqual('Please select a valid birthdate or age');
            expect(page.genderError.isDisplayed()).toEqual(false);
          });
        });
      });

      it('Caso de Teste 4 - idade == -1 - Inválida', function() {
        page.patientName.sendKeys(helper.randomText());
        page.patientAge.sendKeys('-1');
        return helper.clickElement(page.patientMaleGender).then(function() {
          return helper.clickElement(page.createPatient).then(function() {
            browser.sleep(300);
            expect(page.nameError.isDisplayed()).toEqual(false);
            expect(page.birthdateError.isDisplayed()).toEqual(true);
            expect(page.birthdateError.getText()).toEqual('Please select a valid birthdate or age');
            expect(page.genderError.isDisplayed()).toEqual(false);
          });
        });
      });

    });

  });


});
