// Protractor configuration
// https://github.com/angular/protractor/blob/master/referenceConf.js


/***********************************************
ENVIROMENT VARIABLES REQUIRED:

BASE_URL
USER
PASSWORD
************************************************/

'use strict';

const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const config = require('./spec/config');
const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
  dest: './results/failure-tests',
  filename: 'report.html',
  captureOnlyFailedSpecs: true
});


exports.config = {
  // The timeout for each script run on the browser. This should be longer
  // than the maximum time your application needs to stabilize between tasks.
  allScriptsTimeout: 200000,

  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  // baseUrl: config.baseUrl,

  // If true, only chromedriver will be started, not a standalone selenium.
  // Tests for browsers other than chrome will not run.
  directConnect: true,

  // list of files / patterns to load in the browser
  specs: ['spec/**/*.spec.js'],

  // Patterns to exclude.
  exclude: [],

  // ----- Capabilities to be passed to the webdriver instance ----
  //
  // For a full list of available capabilities, see
  // https://code.google.com/p/selenium/wiki/DesiredCapabilities
  // and
  // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['no-sandbox']
    }
  },

  // Setup the report before any tests start
  beforeLaunch: function() {
    return new Promise(function(resolve){
      reporter.beforeLaunch(resolve);
    });
  },

  onPrepare: function() {
    browser.ignoreSynchronization = true;

    var reporterConfig = {
      displayStacktrace: 'summary', // display stacktrace for each failed assertion, values: (all|specs|summary|none)
      displayFailuresSummary: true, // display summary of all failures after execution
      displayPendingSummary: true,  // display summary of all pending specs after execution
      displaySuccessfulSpec: true,  // display each successful spec
      displayFailedSpec: true,      // display each failed spec
      displayPendingSpec: false,    // display each pending spec
      displaySpecDuration: true,    // display each spec duration
      displaySuiteNumber: false     // display each suite number (hierarchical)
    };

    browser.driver.executeScript(function() {
      return {
        width: window.screen.availWidth,
        height: window.screen.availHeight
      };
    }).then(function(result) {
      browser.driver.manage().window().setSize(result.width, result.height);
    });
    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter(reporterConfig));
    jasmine.getEnv().addReporter(reporter);

  },

  // Close the report after all tests finish
  afterLaunch: function(exitCode) {
    return new Promise(function(resolve){
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },

  // ----- The test framework -----
  //
  // Jasmine and Cucumber are fully supported as a test and assertion framework.
  // Mocha has limited beta support. You will need to include your own
  // assertion framework if working with mocha.
  framework: 'jasmine2',

  // ----- Options to be passed to minijasminenode -----
  //
  // See the full list at https://github.com/juliemr/minijasminenode
  jasmineNodeOpts: {
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 200000,
    // Function called to print jasmine results.
    print: function() {}
  }
};
