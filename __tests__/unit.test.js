// unit.test.js

const functions = require('../code-to-unit-test/unit-test-me.js');


/* ----- isPhoneNumber Tests ----- */
//Test1 of isPhoneNumber: Expects tests to pass
test('Checks if value is a valid phone number', () => {
    const testVal = '(858)123-4567';

    expect( functions.isPhoneNumber(testVal) ).toBe(true);
});

//Test2 of isPhoneNumber: Expects tests to pass
test('Checks if value is a valid phone number', () => {
    const testVal = '(619)892-6741';

    expect( functions.isPhoneNumber(testVal) ).toBe(true);
});

//Test3 of isPhoneNumber: Expects tests to fail
test('Checks if value is not a valid phone number', () => {
    const testVal = 123;

    expect( functions.isPhoneNumber(testVal) ).toBe(false);
});

//Test4 of isPhoneNumber: Expects tests to fail
test('Checks if value is not a valid phone number', () => {
    const testVal = '/((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{1}';

    expect( functions.isPhoneNumber(testVal) ).toBe(false);
});


/* ----- isEmail Tests ----- */
//Test1 of isEmail: Expects tests to pass
test('Checks if value is a valid email', () => {
    const testVal = 'd6flores@ucsd.edu';

    expect( functions.isEmail(testVal) ).toBe(true);
});

//Test2 of isEmail: Expects tests to pass
test('Checks if value is a valid email', () => {
    const testVal = 'shh020@ucsd.edu';

    expect( functions.isEmail(testVal) ).toBe(true);
});

//Test3 of isEmail: Expects tests to fail
test('Checks if value is not a valid email', () => {
    const testVal = '/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/';

    expect( functions.isEmail(testVal) ).toBe(false);
});

//Test4 of isEmail: Expects tests to fail
test('Checks if value is not a valid email', () => {
    const testVal = 123;

    expect( functions.isStrongPassword(testVal) ).toBe(false);
});


/* ----- isStrongPassword Tests ----- */
//Test1 of isStrongPassword: Expects tests to pass
test('Checks if value is a valid strong password', () => {
    const testVal = 'Aop49024_UC7SD';

    expect( functions.isStrongPassword(testVal) ).toBe(true);
});

//Test2 of isStrongPassword: Expects tests to pass
test('Checks if value is a valid strong password', () => {
    const testVal = 'Do78_d90gers';

    expect( functions.isStrongPassword(testVal) ).toBe(true);
});

//Test3 of isStrongPassword: Expects tests to fail
test('Checks if value is not a valid strong password', () => {
    const testVal = '1/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/';

    expect( functions.isStrongPassword(testVal) ).toBe(false);
});

//Test4 of isStrongPassword: Expects tests to fail
test('Checks if value is not a valid strong password', () => {
    const testVal = 123456;

    expect( functions.isStrongPassword(testVal) ).toBe(false);
});


/* ----- isDate Tests ----- */
//Test1 of isDate: Expects tests to pass
test('Checks if value is a valid date', () => {
    const testVal = '05/28/2023';

    expect( functions.isDate(testVal) ).toBe(true);
});

//Test2 of isDate: Expects tests to pass
test('Checks if value is a valid date', () => {
    const testVal = '1/1/2020';

    expect( functions.isDate(testVal) ).toBe(true);
});

//Test3 of isDate: Expects tests to fail
test('Checks if value is not a valid date', () => {
    const testVal = '012-34-5678';

    expect( functions.isDate(testVal) ).toBe(false);
});

//Test4 of isDate: Expects tests to fail
test('Checks if value is not a valid date', () => {
    const testVal = '12/4/56';

    expect( functions.isDate(testVal) ).toBe(false);
});

/* ----- isHexColor Tests ----- */
//Test1 of isHexColor: Expects tests to pass
test('Checks if value is a valid Hex Color', () => {
    const testVal = '000';

    expect( functions.isHexColor(testVal) ).toBe(true);
});

//Test2 of isHexColor: Expects tests to pass
test('Checks if value is a valid Hex Color', () => {
    const testVal = '#FFFFFF';

    expect( functions.isHexColor(testVal) ).toBe(true);
});

//Test3 of isHexColor: Expects tests to fail
test('Checks if value is a valid Hex Color', () => {
    const testVal = '#000F';

    expect( functions.isHexColor(testVal) ).toBe(false);
});

//Test4 of isHexColor: Expects tests to fail
test('Checks if value is a valid Hex Color', () => {
    const testVal = '###';

    expect( functions.isHexColor(testVal) ).toBe(false);
});