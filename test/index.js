// Main test file that imports all test modules
const QUnit = require('qunit');

// Configure QUnit
QUnit.config.autostart = false;
QUnit.config.noglobals = true;

// Import all test modules
require('./parsing.test.js');
require('./conversion.test.js');
require('./tostring.test.js');
require('./manipulation.test.js');

// Start the tests
QUnit.start();
