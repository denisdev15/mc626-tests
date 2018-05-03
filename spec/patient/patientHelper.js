'use strict';

var helper = require('../helper.js');
var page = require('./patient.po');
var patientData = ['Identifier', 'Given', 'Middle', 'Family Name', 'Age', 'Gender', 'Birthdate', 'Death Date'];

class PatientHelper {

  getPatientPage() {
    return helper.clickElementAndWait(page.findPatientNavLink, page.patientSearchInput);
  }

  findPatient(patientName) {
    return this.getPatientPage().then(function() {
      patientSearchInput.sendKeys(patientName);
      return helper.wait(page.searchTable);
    }).then(function() {
      return page.entries.first();
    });
  }

  getPatientData(patientElement) {
    return this.getPatientPage().then(function() {
      var patient = {};
      var dataPromises = [];
      return page.searchTableData(patientElement).each(function(data, index) {
        dataPromises.push(
          data.getText().then(function(dataText) {
            patient[patientData[index]] = dataText;
          })
        );
      }).then(function() {
        return Promise.all(dataPromises).then(function() {
          return patient;
        });
      });
    });
  }

  createPatient(patient) {
    return this.getPatientPage().then(function() {
      page.patientName.sendKeys(patient.name);
      let birthdatePromises = [];
      if(patient.birthdate) {
        birthdatePromises.push(
          page.patientBirthdate.sendKeys(patient.birthdate).then(function() {
            return helper.clickElementAndWaitToBeClickable(page.patientAge, page.patientMaleGender);
          })
        );
      }
      if(patient.age) {
        birthdatePromises.push(page.patientAge.sendKeys(patient.age));
      }
      return Promise.all(birthdatePromises).then(function() {
        let promise = Promise.resolve();
        if(patient.male) {
          promise = helper.clickElement(page.patientMaleGender);
        } else {
          promise = helper.clickElement(page.patientFemaleGender);
        }
        return promise.then(function() {
          return helper.clickElementAndWait(page.createPatient, page.patientIdentifier).then(function() {
            patient.identifier = helper.randomNumber(500);
            page.patientIdentifier.sendKeys(patient.identifier);
            return helper.clickElement(page.savePatient);
          });
        }).then(function() {
          return helper.wait(page.patientCreatedName).then(function() {
            expect(page.patientCreatedName.getText()).toEqual(patient.name);
            return patient;
          });
        });
      });
    });
  }

}

module.exports = new PatientHelper();
