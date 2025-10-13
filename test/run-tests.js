#!/usr/bin/env node

const { ColorUtils } = require('../build/index.js');

console.log('🧪 Running Color Library Tests...\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  process.stdout.write(`  ${name}... `);
  try {
    fn();
    console.log('✅');
    passed++;
  } catch (error) {
    console.log('❌');
    console.log(`    Error: ${error.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function deepEqual(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

// === Basic parsing tests ===
console.log('📝 String Parsing Tests');

test('Parse named color "red"', () => {
  const red = ColorUtils.stringToRGBA('red');
  deepEqual(red, { r: 255, g: 0, b: 0, a: 1 });
});

test('Parse hex color #ff0000', () => {
  const red = ColorUtils.stringToRGBA('#ff0000');
  deepEqual(red, { r: 255, g: 0, b: 0, a: 1 });
});

test('Parse 3-digit hex #f00', () => {
  const red = ColorUtils.stringToRGBA('#f00');
  deepEqual(red, { r: 255, g: 0, b: 0, a: 1 });
});

test('Parse RGB rgb(0, 255, 0)', () => {
  const green = ColorUtils.stringToRGBA('rgb(0, 255, 0)');
  deepEqual(green, { r: 0, g: 255, b: 0, a: 1 });
});

test('Parse RGBA rgba(0, 0, 255, 0.5)', () => {
  const blue = ColorUtils.stringToRGBA('rgba(0, 0, 255, 0.5)');
  deepEqual(blue, { r: 0, g: 0, b: 255, a: 0.5 });
});

test('Parse HSL hsl(0, 100%, 50%)', () => {
  const red = ColorUtils.stringToRGBA('hsl(0, 100%, 50%)');
  deepEqual(red, { r: 255, g: 0, b: 0, a: 1 });
});

// === Color conversion tests ===
console.log('\n🔄 Color Conversion Tests');

test('Convert RGBA to HSLA', () => {
  const hsla = ColorUtils.rgbaToHSLA({ r: 255, g: 0, b: 0, a: 1 });
  deepEqual(hsla, { h: 0, s: 100, l: 50, a: 1 });
});

test('Convert HSLA to RGBA', () => {
  const rgba = ColorUtils.hslaToRGBA({ h: 120, s: 100, l: 50, a: 1 });
  deepEqual(rgba, { r: 0, g: 255, b: 0, a: 1 });
});

test('Color conversion roundtrip', () => {
  const original = { r: 200, g: 100, b: 50, a: 0.8 };
  const converted = ColorUtils.rgbaToHSLA(original);
  const backToRgba = ColorUtils.hslaToRGBA(converted);
  deepEqual(backToRgba, original);
});

// === String output tests ===
console.log('\n📤 Color-to-String Tests');

test('RGBA to RGB string', () => {
  const str = ColorUtils.rgbaToString({ r: 255, g: 0, b: 0, a: 1 });
  assert(str === 'rgb(255, 0, 0)', `Expected 'rgb(255, 0, 0)', got '${str}'`);
});

test('RGBA to hex string', () => {
  const str = ColorUtils.rgbaToString({ r: 255, g: 0, b: 0, a: 1 }, { mode: 'hex' });
  assert(str === '#ff0000', `Expected '#ff0000', got '${str}'`);
});

test('HSLA to HSL string', () => {
  const str = ColorUtils.hslaToString({ h: 0, s: 100, l: 50, a: 1 });
  assert(str === 'hsl(0, 100%, 50%)', `Expected 'hsl(0, 100%, 50%)', got '${str}'`);
});

test('RGBA with alpha to RGBA string', () => {
  const str = ColorUtils.rgbaToString({ r: 255, g: 0, b: 0, a: 0.5 });
  assert(str === 'rgba(255, 0, 0, 0.5)', `Expected 'rgba(255, 0, 0, 0.5)', got '${str}'`);
});

// === Color manipulation tests ===
console.log('\n🎨 Color Manipulation Tests');

test('Lighten HSLA color', () => {
  const original = { h: 0, s: 100, l: 50, a: 1 };
  const lightened = ColorUtils.lighten(original, 0.2);
  deepEqual(lightened, { h: 0, s: 100, l: 70, a: 1 });
});

test('Darken RGBA color', () => {
  const original = { r: 255, g: 0, b: 0, a: 1 };
  const darkened = ColorUtils.darken(original, 0.2);
  // Should convert to HSL, darken, convert back
  assert(darkened.r < 255, 'Red component should decrease');
  assert(darkened.a === 1, 'Alpha should be preserved');
});

test('Saturate color', () => {
  const original = { h: 0, s: 50, l: 50, a: 1 };
  const saturated = ColorUtils.saturate(original, 0.3);
  deepEqual(saturated, { h: 0, s: 80, l: 50, a: 1 });
});

test('Fade out color', () => {
  const original = { r: 255, g: 0, b: 0, a: 1 };
  const faded = ColorUtils.fadeOut(original, 0.3);
  deepEqual(faded, { r: 255, g: 0, b: 0, a: 0.7 });
});

test('Invert RGBA color', () => {
  const original = { r: 255, g: 0, b: 0, a: 1 };
  const inverted = ColorUtils.invert(original);
  deepEqual(inverted, { r: 0, g: 255, b: 255, a: 1 });
});

// === Results ===
console.log(`\n📊 Test Results:`);
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📈 Total: ${passed + failed}`);

if (failed === 0) {
  console.log('\n🎉 All tests passed!');
  process.exit(0);
} else {
  console.log('\n💥 Some tests failed!');
  process.exit(1);
}
