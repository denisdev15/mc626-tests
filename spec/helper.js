'use strict';

var EC = protractor.ExpectedConditions;

module.exports = {
  getAndWait (path, element, timeout=15000) {
    browser.get(path);
    return browser.wait(
      () => element.isPresent(),
      timeout,
      `${path} took to long to load or ${element.locator()} does not exist in path.`
    );
  },
  wait (element, timeout=15000) {
    return browser.wait(
      () => element.isPresent(),
      timeout,
      `Element ${element.locator()} does not exist in path.`
    );
  },
  waitElementToBeVisible (element, timeout=10000) {
    return browser.wait(EC.presenceOf(element), timeout, `Element ${element.locator()} is not present on page.`);
  },
  waitElementToBeClickable (element, timeout=10000) {
    return browser.wait(EC.elementToBeClickable(element), timeout, `Element ${element.locator()} is not clickable.`);
  },
  mouseMoveToElement (element, x=0, y=0) {
    return browser.actions().mouseMove(element, {x: x, y: y}).perform();
  },
  clickElement (element) {
    return this.mouseMoveToElement(element, 0, 0).then(function() {
      return element.click();
    });
  },
  clickElementAndWait (elementToClick, elementToWait) {
    return this.mouseMoveToElement(elementToClick, 0, 0).then(() =>{
      return elementToClick.click().then(() =>{
        return this.wait(elementToWait);
      });
    });
  },
  clickElementAndWaitToBeVisible (elementToClick, elementToWait) {
    return this.mouseMoveToElement(elementToClick, 0, 0).then(() =>{
      return elementToClick.click().then(() =>{
        return this.waitElementToBeVisible(elementToWait);
      });
    });
  },
  clickElementAndWaitToBeClickable (elementToClick, elementToWait) {
    return this.mouseMoveToElement(elementToClick, 0, 0).then(() =>{
      return elementToClick.click().then(() =>{
        return this.waitElementToBeClickable(elementToWait);
      });
    });
  },
  randomText(max=7) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for( var i=0; i < max; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
    return text;
  },
  randomNumber(max=100) {
    return Math.floor((Math.random() * max + 1));
  },
  getDateString(date) {
    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!

    var yyyy = date.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    return dd+'/'+mm+'/'+yyyy;
  },
  randomDate(start=new Date(1930, 0, 1), end=new Date()) {
    var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return this.getDateString(date);
  }
};
