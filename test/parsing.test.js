const { test } = require('qunit');
const { ColorUtils } = require('../build/index.js');

// String parsing tests
test('stringToRGBA - named colors', (assert) => {
  // Test basic named colors
  assert.deepEqual(ColorUtils.stringToRGBA('red'), { r: 255, g: 0, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('green'), { r: 0, g: 128, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('blue'), { r: 0, g: 0, b: 255, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('white'), { r: 255, g: 255, b: 255, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('black'), { r: 0, g: 0, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('transparent'), { r: 0, g: 0, b: 0, a: 0 });

  // Test case insensitivity
  assert.deepEqual(ColorUtils.stringToRGBA('RED'), { r: 255, g: 0, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('Blue'), { r: 0, g: 0, b: 255, a: 1 });

  // Test more complex named colors
  assert.deepEqual(ColorUtils.stringToRGBA('cornflowerblue'), { r: 100, g: 149, b: 237, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('darkgoldenrod'), { r: 184, g: 134, b: 11, a: 1 });
});

test('stringToRGBA - hex colors', (assert) => {
  // Test 3-digit hex
  assert.deepEqual(ColorUtils.stringToRGBA('#f00'), { r: 255, g: 0, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('#0f0'), { r: 0, g: 255, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('#00f'), { r: 0, g: 0, b: 255, a: 1 });

  // Test 6-digit hex
  assert.deepEqual(ColorUtils.stringToRGBA('#ff0000'), { r: 255, g: 0, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('#00ff00'), { r: 0, g: 255, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('#0000ff'), { r: 0, g: 0, b: 255, a: 1 });

  // Test 8-digit hex with alpha
  assert.deepEqual(ColorUtils.stringToRGBA('#ff000080'), { r: 255, g: 0, b: 0, a: 0.5 });
  assert.deepEqual(ColorUtils.stringToRGBA('#00ff00ff'), { r: 0, g: 255, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('#0000ff00'), { r: 0, g: 0, b: 255, a: 0 });

  // Test hex without #
  assert.deepEqual(ColorUtils.stringToRGBA('ff0000'), { r: 255, g: 0, b: 0, a: 1 });

  // Test case insensitivity
  assert.deepEqual(ColorUtils.stringToRGBA('#FF0000'), { r: 255, g: 0, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('#AbCdEf'), { r: 171, g: 205, b: 239, a: 1 });
});

test('stringToRGBA - RGB/RGBA colors', (assert) => {
  // Test rgb() format
  assert.deepEqual(ColorUtils.stringToRGBA('rgb(255, 0, 0)'), { r: 255, g: 0, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('rgb(0, 255, 0)'), { r: 0, g: 255, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('rgb(0, 0, 255)'), { r: 0, g: 0, b: 255, a: 1 });

  // Test rgba() format
  assert.deepEqual(ColorUtils.stringToRGBA('rgba(255, 0, 0, 1)'), { r: 255, g: 0, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('rgba(0, 255, 0, 0.5)'), { r: 0, g: 255, b: 0, a: 0.5 });
  assert.deepEqual(ColorUtils.stringToRGBA('rgba(0, 0, 255, 0)'), { r: 0, g: 0, b: 255, a: 0 });

  // Test with percentage values
  assert.deepEqual(ColorUtils.stringToRGBA('rgb(100%, 0%, 0%)'), { r: 255, g: 0, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('rgba(50%, 50%, 50%, 0.8)'), { r: 128, g: 128, b: 128, a: 0.8 });

  // Test with whitespace variations
  assert.deepEqual(ColorUtils.stringToRGBA('rgb( 255 , 0 , 0 )'), { r: 255, g: 0, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('rgba(255,128,64,0.5)'), { r: 255, g: 128, b: 64, a: 0.5 });
});

test('stringToRGBA - HSL/HSLA colors', (assert) => {
  // Test hsl() format
  assert.deepEqual(ColorUtils.stringToRGBA('hsl(0, 100%, 50%)'), { r: 255, g: 0, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('hsl(120, 100%, 50%)'), { r: 0, g: 255, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('hsl(240, 100%, 50%)'), { r: 0, g: 0, b: 255, a: 1 });

  // Test hsla() format
  assert.deepEqual(ColorUtils.stringToRGBA('hsla(0, 100%, 50%, 1)'), { r: 255, g: 0, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('hsla(120, 100%, 50%, 0.5)'), { r: 0, g: 255, b: 0, a: 0.5 });

  // Test grayscale (saturation = 0)
  assert.deepEqual(ColorUtils.stringToRGBA('hsl(0, 0%, 50%)'), { r: 128, g: 128, b: 128, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('hsl(180, 0%, 0%)'), { r: 0, g: 0, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('hsl(360, 0%, 100%)'), { r: 255, g: 255, b: 255, a: 1 });
});

test('stringToRGBA - edge cases and invalid input', (assert) => {
  // Test invalid input returns black
  assert.deepEqual(ColorUtils.stringToRGBA('invalid'), { r: 0, g: 0, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA(''), { r: 0, g: 0, b: 0, a: 1 });
  assert.deepEqual(ColorUtils.stringToRGBA('#gggggg'), { r: 0, g: 0, b: 0, a: 1 });

  // Test edge values
  assert.deepEqual(ColorUtils.stringToRGBA('rgb(300, -50, 256)'), { r: 255, g: 0, b: 255, a: 1 }); // Clamped values
  assert.deepEqual(ColorUtils.stringToRGBA('rgba(255, 255, 255, 2)'), { r: 255, g: 255, b: 255, a: 1 }); // Alpha clamped to 1
  assert.deepEqual(ColorUtils.stringToRGBA('rgba(0, 0, 0, -0.5)'), { r: 0, g: 0, b: 0, a: 0 }); // Alpha clamped to 0
});

test('stringToHSLA - various formats', (assert) => {
  // Test that stringToHSLA properly converts through stringToRGBA -> rgbaToHSLA
  const red = ColorUtils.stringToHSLA('red');
  assert.equal(red.h, 0);
  assert.equal(red.s, 100);
  assert.equal(red.l, 50);
  assert.equal(red.a, 1);

  const green = ColorUtils.stringToHSLA('#00ff00');
  assert.equal(green.h, 120);
  assert.equal(green.s, 100);
  assert.equal(green.l, 50);
  assert.equal(green.a, 1);

  const blue = ColorUtils.stringToHSLA('rgb(0, 0, 255)');
  assert.equal(blue.h, 240);
  assert.equal(blue.s, 100);
  assert.equal(blue.l, 50);
  assert.equal(blue.a, 1);

  // Test alpha preservation
  const semiTransparent = ColorUtils.stringToHSLA('rgba(255, 0, 0, 0.5)');
  assert.equal(semiTransparent.a, 0.5);
});
