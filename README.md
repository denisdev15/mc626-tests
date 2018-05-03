# MC626

Protractor tests for openmrs legacy ui

## How to run tests

### Prerequisites

1. Protractor installed in your machine. See [protractor tutorial - setup session](http://www.protractortest.org/#/tutorial).
2. Build openmrs project in your machine. Follow instructions on [github](https://github.com/openmrs/openmrs-core).
3. Add Legacy UI. Follow instructions on [wiki](https://wiki.openmrs.org/display/docs/User+Interface+Modules).

### Protractor

To run all tests use this command:
```
protractor protractor.conf.js
```
If you want to run a specific test you can use:
```
protractor protractor.conf.js --specs="spec/**/<test-to-run>.js"
```

## Results

A folder with results of the tests will be created in your directory.
