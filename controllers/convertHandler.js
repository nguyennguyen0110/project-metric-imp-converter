function ConvertHandler() {
  
  this.getNum = function(input) {
    //Split input by number, get last element by .pop()
    let unit = input.split(/[0-9]+/g).pop();
    let num = input.replace(unit, '');
    //num = num.trim(); //Do not need this
    if (num == '') {
      return 1;
    }
    else if (num.includes('/')) {
      let nums = num.split('/');
      if (nums.length > 2) {
        //Number(string) return NaN (not a number) if cannot convert string to number
        //So here return NaN for easily check in "/routes/api.js"
        return NaN;
      }
      else {
        //Round to 5 decimals (ex: 12.12345)
        return Math.round(Number(nums[0]) / Number(nums[1]) * 100000) / 100000;
      }
    }
    else {
      return Math.round(Number(num) * 100000) / 100000;
    }
  };
  
  this.getUnit = function(input) {
    let unit = input.split(/[0-9]+/g).pop();
    //Change to lower case and trim space at both ends
    unit = unit.toLowerCase().trim();
    let units = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
    if (!units.includes(unit)) {
      return 'invalid';
    }
    else {
      return unit;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let changeUnit = {'gal': 'L', 'L': 'gal', 'lbs': 'kg', 'kg': 'lbs', 'mi': 'km', 'km': 'mi'};
    return changeUnit[initUnit];
  };

  this.spellOutUnit = function(unit) {
    let spellOut = {'gal': 'gallons', 'L': 'liters', 'lbs': 'pounds', 'kg': 'kilograms', 'mi': 'miles', 'km': 'kilometers'};
    return spellOut[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      //Because "return" keyword will stop execute next code so no need "break" keyword
      case 'gal': return Math.round(initNum * galToL * 100000) / 100000;
      case 'L': return Math.round(initNum / galToL * 100000) / 100000;
      case 'lbs': return Math.round(initNum * lbsToKg * 100000) / 100000;
      case 'kg': return Math.round(initNum / lbsToKg * 100000) / 100000;
      case 'mi': return Math.round(initNum * miToKm * 100000) / 100000;
      case 'km': return Math.round(initNum / miToKm * 100000) / 100000;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
  
}

module.exports = ConvertHandler;
