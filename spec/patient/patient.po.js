/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

class PatientPage {
  constructor () {
    // Find and create patient
    this.findPatientNavLink = element(by.id('findPatientNavLink'));
    this.patientSearchInput = element(by.id('inputNode'));
    this.patientName = element(by.id('personName'));
    this.patientBirthdate = element(by.id('birthdate'));
    this.patientAge = element(by.id('age'));
    this.patientMaleGender = element(by.id('gender-M'));
    this.patientFemaleGender = element(by.id('gender-F'));
    this.createPatient = element(by.css('input[value="Create Person"]'));
    this.patientIdentifier = element(by.css('input[name="identifiers[0].identifier"]'));
    this.savePatient = element(by.id('addButton'));
    this.nameError = element(by.id('nameError'));
    this.birthdateError = element(by.id('birthdateError'));
    this.genderError = element(by.id('genderError'));
    this.searchTable = element(by.id('openmrsSearchTable'));
    this.entries = this.searchTable.all(by.tagName('tr'));
    // Patient page
    this.patientCreatedName = element(by.id('patientHeaderPatientName'));
  }

  searchTableData(entry) {
    return entry.all(by.tagName('td'));
  }
}

module.exports = new PatientPage();
