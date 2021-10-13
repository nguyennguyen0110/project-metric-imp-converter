const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);
  test('Convert a valid input', done => {
    chai
      .request(server)
      .get('/api/convert?input=10L')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.string, '10 liters converts to 2.64172 gallons');
        done();
      });
  });
  test('Convert an invalid unit', done => {
    chai
      .request(server)
      .get('/api/convert?input=32g')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'invalid unit');
        done();
      });
  });
  test('Convert an invalid number', done => {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'invalid number');
        done();
      });
  });
  test('Convert an invalid number AND unit', done => {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kilomega')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'invalid number and unit');
        done();
      });
  });
  test('Convert with no number', done => {
    chai
      .request(server)
      .get('/api/convert?input=kg')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds');
        done();
      });
  })
});


const Browser = require('zombie');
Browser.site = 'https://project-metric-imp-converter.nguyennguyen50.repl.co';

suite('Test HTML input and convert button, and the result display', function() {
  this.timeout(5000);
  const browser = new Browser();
  suiteSetup(done => browser.visit('/', done));
  
  test('Submit the input "1 mieo" in the HTML form', function (done) {
    //Fill the input element which has name='input'
    browser.fill('input', '1 mieo').then(function() {
      //Press the input element which has type='submit' and value='Convert!'
      browser.pressButton('Convert!', function () {
        //Check if connection is success
        browser.assert.success();
        //Check <p> element with id='result' has the text 'invalid unit' inside
        browser.assert.text('p#result', 'invalid unit');
        //Check if there is just 1 <p> element with id='result'
        browser.assert.elements('p#result', 1);
        //IMPORTANT: NEVER forget done()
        done();
      });
    });
  });
  
  test('Submit the input "1 mi" in the HTML form', function (done) {
    browser.fill('input', '1 mi').then(function() {
      browser.pressButton('Convert!', function () {
        browser.assert.success();
        browser.assert.text('p#result', '1 miles converts to 1.60934 kilometers');
        browser.assert.elements('p#result', 1);
        done();
      });
    });
  });

});
