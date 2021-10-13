const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('read a whole number input', () => {
    assert.strictEqual(12, convertHandler.getNum('12mi'));
  });
  test('read a decimal number input', () => {
    assert.strictEqual(2.5, convertHandler.getNum('2.5mi'));
  });
  test('read a fractional input', () => {
    assert.strictEqual(5/2, convertHandler.getNum('5/2mi'));
  });
  test('read a fractional input with a decimal', () => {
    assert.strictEqual(5/2.5, convertHandler.getNum('5/2.5mi'));
  });
  test('error on a double-fraction', () => {
    assert.isTrue(isNaN(convertHandler.getNum('3/2/3mi')));
  });
  test('default 1', () => {
    assert.strictEqual(1, convertHandler.getNum('mi'));
  });
  test('read each valid input unit', () => {
    assert.strictEqual('gal', convertHandler.getUnit('2gal'));
    assert.strictEqual('l', convertHandler.getUnit('2.5l'));
    assert.strictEqual('lbs', convertHandler.getUnit('5/2lbs'));
    assert.strictEqual('kg', convertHandler.getUnit('2kg'));
    assert.strictEqual('mi', convertHandler.getUnit('5/2.5mi'));
    assert.strictEqual('km', convertHandler.getUnit(' 2 km '));
  });
  test('return an error for an invalid input unit', () => {
    assert.strictEqual('invalid', convertHandler.getUnit('2 mieo'));
  });
  test('return unit for each valid input unit', () => {
    assert.strictEqual('gal', convertHandler.getReturnUnit('L'));
    assert.strictEqual('L', convertHandler.getReturnUnit('gal'));
    assert.strictEqual('lbs', convertHandler.getReturnUnit('kg'));
    assert.strictEqual('kg', convertHandler.getReturnUnit('lbs'));
    assert.strictEqual('mi', convertHandler.getReturnUnit('km'));
    assert.strictEqual('km', convertHandler.getReturnUnit('mi'));
  });
  test('spelled-out string unit', () => {
    assert.strictEqual('liters', convertHandler.spellOutUnit('L'));
    assert.strictEqual('gallons', convertHandler.spellOutUnit('gal'));
    assert.strictEqual('kilograms', convertHandler.spellOutUnit('kg'));
    assert.strictEqual('pounds', convertHandler.spellOutUnit('lbs'));
    assert.strictEqual('kilometers', convertHandler.spellOutUnit('km'));
    assert.strictEqual('miles', convertHandler.spellOutUnit('mi'));
  });
  test('convert gal to L', () => {
    assert.strictEqual(3.78541, convertHandler.convert(1, 'gal'));
  });
  test('convert L to gal', () => {
    assert.strictEqual(0.26417, convertHandler.convert(1, 'L'));
  });
  test('convert mi to km', () => {
    assert.strictEqual(1.60934, convertHandler.convert(1, 'mi'));
  });
  test('convert km to mi', () => {
    assert.strictEqual(1.24275, convertHandler.convert(2, 'km'));
  });
  test('convert lbs to kg', () => {
    assert.strictEqual(0.45359, convertHandler.convert(1, 'lbs'));
  });
  test('convert kg to lbs', () => {
    assert.strictEqual(11.02312, convertHandler.convert(5, 'kg'));
  });
});
