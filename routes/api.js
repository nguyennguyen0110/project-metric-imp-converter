'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  app.get('/api/convert', (req, res) => {
    //Create new object with all the method in file "/controllers/convertHandler.js"
    let convertHandler = new ConvertHandler();
    let initNum = convertHandler.getNum(req.query.input);
    let initUnit = convertHandler.getUnit(req.query.input);
    //In getNum() method use Number(string) to parse input string to number
    //Number(string) return NaN (not a number) if string cannot convert to number
    if (isNaN(initNum) && initUnit == 'invalid') {
      res.json('invalid number and unit');
    }
    else if (isNaN(initNum)) {
      res.json('invalid number');
    }
    else if (initUnit == 'invalid') {
      res.json('invalid unit');
    }
    else {
      //Change L upper case because getUnit() method return lower case string
      if (initUnit == 'l') {
        initUnit = initUnit.toUpperCase();
      }
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let returnNum = convertHandler.convert(initNum, initUnit);
      let string = convertHandler.getString(initNum, convertHandler.spellOutUnit(initUnit), returnNum, convertHandler.spellOutUnit(returnUnit));
      //Note: {initNum} equals {"initNum": initNum}
      res.json({initNum, initUnit, returnNum, returnUnit, string});
    }
  });
  
};
