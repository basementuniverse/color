const { test } = require('qunit');
const { ColorUtils } = require('../build/index.js');

test('rgbaToHSLA - primary colors', (assert) => {
  // Test red
  const red = ColorUtils.rgbaToHSLA({ r: 255, g: 0, b: 0, a: 1 });
  assert.equal(red.h, 0, 'Red hue should be 0');
  assert.equal(red.s, 100, 'Red saturation should be 100%');
  assert.equal(red.l, 50, 'Red lightness should be 50%');
  assert.equal(red.a, 1, 'Red alpha should be 1');

  // Test green
  const green = ColorUtils.rgbaToHSLA({ r: 0, g: 255, b: 0, a: 1 });
  assert.equal(green.h, 120, 'Green hue should be 120');
  assert.equal(green.s, 100, 'Green saturation should be 100%');
  assert.equal(green.l, 50, 'Green lightness should be 50%');
  assert.equal(green.a, 1, 'Green alpha should be 1');

  // Test blue
  const blue = ColorUtils.rgbaToHSLA({ r: 0, g: 0, b: 255, a: 1 });
  assert.equal(blue.h, 240, 'Blue hue should be 240');
  assert.equal(blue.s, 100, 'Blue saturation should be 100%');
  assert.equal(blue.l, 50, 'Blue lightness should be 50%');
  assert.equal(blue.a, 1, 'Blue alpha should be 1');
});

test('rgbaToHSLA - grayscale colors', (assert) => {
  // Test black
  const black = ColorUtils.rgbaToHSLA({ r: 0, g: 0, b: 0, a: 1 });
  assert.equal(black.h, 0, 'Black hue should be 0');
  assert.equal(black.s, 0, 'Black saturation should be 0%');
  assert.equal(black.l, 0, 'Black lightness should be 0%');
  assert.equal(black.a, 1, 'Black alpha should be 1');

  // Test white
  const white = ColorUtils.rgbaToHSLA({ r: 255, g: 255, b: 255, a: 1 });
  assert.equal(white.h, 0, 'White hue should be 0');
  assert.equal(white.s, 0, 'White saturation should be 0%');
  assert.equal(white.l, 100, 'White lightness should be 100%');
  assert.equal(white.a, 1, 'White alpha should be 1');

  // Test gray
  const gray = ColorUtils.rgbaToHSLA({ r: 128, g: 128, b: 128, a: 1 });
  assert.equal(gray.h, 0, 'Gray hue should be 0');
  assert.equal(gray.s, 0, 'Gray saturation should be 0%');
  assert.equal(gray.l, 50, 'Gray lightness should be 50%');
  assert.equal(gray.a, 1, 'Gray alpha should be 1');
});

test('rgbaToHSLA - secondary colors', (assert) => {
  // Test cyan (0, 255, 255)
  const cyan = ColorUtils.rgbaToHSLA({ r: 0, g: 255, b: 255, a: 1 });
  assert.equal(cyan.h, 180, 'Cyan hue should be 180');
  assert.equal(cyan.s, 100, 'Cyan saturation should be 100%');
  assert.equal(cyan.l, 50, 'Cyan lightness should be 50%');

  // Test magenta (255, 0, 255)
  const magenta = ColorUtils.rgbaToHSLA({ r: 255, g: 0, b: 255, a: 1 });
  assert.equal(magenta.h, 300, 'Magenta hue should be 300');
  assert.equal(magenta.s, 100, 'Magenta saturation should be 100%');
  assert.equal(magenta.l, 50, 'Magenta lightness should be 50%');

  // Test yellow (255, 255, 0)
  const yellow = ColorUtils.rgbaToHSLA({ r: 255, g: 255, b: 0, a: 1 });
  assert.equal(yellow.h, 60, 'Yellow hue should be 60');
  assert.equal(yellow.s, 100, 'Yellow saturation should be 100%');
  assert.equal(yellow.l, 50, 'Yellow lightness should be 50%');
});

test('rgbaToHSLA - alpha preservation', (assert) => {
  // Test various alpha values
  const semiRed = ColorUtils.rgbaToHSLA({ r: 255, g: 0, b: 0, a: 0.5 });
  assert.equal(semiRed.a, 0.5, 'Alpha should be preserved');

  const transparentBlue = ColorUtils.rgbaToHSLA({ r: 0, g: 0, b: 255, a: 0 });
  assert.equal(transparentBlue.a, 0, 'Alpha should be preserved');

  // Test undefined alpha (should default to 1)
  const noAlpha = ColorUtils.rgbaToHSLA({ r: 255, g: 0, b: 0 });
  assert.equal(noAlpha.a, 1, 'Undefined alpha should default to 1');
});

test('hslaToRGBA - primary colors', (assert) => {
  // Test red
  const red = ColorUtils.hslaToRGBA({ h: 0, s: 100, l: 50, a: 1 });
  assert.equal(red.r, 255, 'Red r should be 255');
  assert.equal(red.g, 0, 'Red g should be 0');
  assert.equal(red.b, 0, 'Red b should be 0');
  assert.equal(red.a, 1, 'Red alpha should be 1');

  // Test green
  const green = ColorUtils.hslaToRGBA({ h: 120, s: 100, l: 50, a: 1 });
  assert.equal(green.r, 0, 'Green r should be 0');
  assert.equal(green.g, 255, 'Green g should be 255');
  assert.equal(green.b, 0, 'Green b should be 0');
  assert.equal(green.a, 1, 'Green alpha should be 1');

  // Test blue
  const blue = ColorUtils.hslaToRGBA({ h: 240, s: 100, l: 50, a: 1 });
  assert.equal(blue.r, 0, 'Blue r should be 0');
  assert.equal(blue.g, 0, 'Blue g should be 0');
  assert.equal(blue.b, 255, 'Blue b should be 255');
  assert.equal(blue.a, 1, 'Blue alpha should be 1');
});

test('hslaToRGBA - grayscale colors', (assert) => {
  // Test black
  const black = ColorUtils.hslaToRGBA({ h: 0, s: 0, l: 0, a: 1 });
  assert.equal(black.r, 0, 'Black r should be 0');
  assert.equal(black.g, 0, 'Black g should be 0');
  assert.equal(black.b, 0, 'Black b should be 0');
  assert.equal(black.a, 1, 'Black alpha should be 1');

  // Test white
  const white = ColorUtils.hslaToRGBA({ h: 0, s: 0, l: 100, a: 1 });
  assert.equal(white.r, 255, 'White r should be 255');
  assert.equal(white.g, 255, 'White g should be 255');
  assert.equal(white.b, 255, 'White b should be 255');
  assert.equal(white.a, 1, 'White alpha should be 1');

  // Test gray (any hue with 0 saturation should work)
  const gray = ColorUtils.hslaToRGBA({ h: 180, s: 0, l: 50, a: 1 });
  assert.equal(gray.r, 128, 'Gray r should be 128');
  assert.equal(gray.g, 128, 'Gray g should be 128');
  assert.equal(gray.b, 128, 'Gray b should be 128');
  assert.equal(gray.a, 1, 'Gray alpha should be 1');
});

test('hslaToRGBA - alpha preservation', (assert) => {
  // Test various alpha values
  const semiRed = ColorUtils.hslaToRGBA({ h: 0, s: 100, l: 50, a: 0.5 });
  assert.equal(semiRed.a, 0.5, 'Alpha should be preserved');

  const transparentBlue = ColorUtils.hslaToRGBA({ h: 240, s: 100, l: 50, a: 0 });
  assert.equal(transparentBlue.a, 0, 'Alpha should be preserved');

  // Test undefined alpha (should default to 1)
  const noAlpha = ColorUtils.hslaToRGBA({ h: 0, s: 100, l: 50 });
  assert.equal(noAlpha.a, 1, 'Undefined alpha should default to 1');
});

test('color conversion roundtrip', (assert) => {
  // Test that RGBA -> HSLA -> RGBA gives approximately the same result
  const originalRgba = { r: 200, g: 100, b: 50, a: 0.8 };
  const convertedHsla = ColorUtils.rgbaToHSLA(originalRgba);
  const backToRgba = ColorUtils.hslaToRGBA(convertedHsla);

  assert.equal(backToRgba.r, originalRgba.r, 'R component should match after roundtrip');
  assert.equal(backToRgba.g, originalRgba.g, 'G component should match after roundtrip');
  assert.equal(backToRgba.b, originalRgba.b, 'B component should match after roundtrip');
  assert.equal(backToRgba.a, originalRgba.a, 'Alpha should match after roundtrip');

  // Test that HSLA -> RGBA -> HSLA gives approximately the same result
  const originalHsla = { h: 30, s: 75, l: 60, a: 0.9 };
  const convertedRgba = ColorUtils.hslaToRGBA(originalHsla);
  const backToHsla = ColorUtils.rgbaToHSLA(convertedRgba);

  assert.equal(backToHsla.h, originalHsla.h, 'Hue should match after roundtrip');
  assert.equal(backToHsla.s, originalHsla.s, 'Saturation should match after roundtrip');
  assert.equal(backToHsla.l, originalHsla.l, 'Lightness should match after roundtrip');
  assert.equal(backToHsla.a, originalHsla.a, 'Alpha should match after roundtrip');
});

test('edge cases and special values', (assert) => {
  // Test hue wraparound (should handle values > 360)
  const hueOver360 = ColorUtils.hslaToRGBA({ h: 390, s: 100, l: 50, a: 1 }); // 390 = 30
  const hue30 = ColorUtils.hslaToRGBA({ h: 30, s: 100, l: 50, a: 1 });
  assert.closeTo(hueOver360.r, hue30.r, 1, 'Hue > 360 should wrap around');
  assert.closeTo(hueOver360.g, hue30.g, 1, 'Hue > 360 should wrap around');
  assert.closeTo(hueOver360.b, hue30.b, 1, 'Hue > 360 should wrap around');

  // Test extreme lightness values
  const veryDark = ColorUtils.hslaToRGBA({ h: 0, s: 100, l: 1, a: 1 });
  assert.ok(veryDark.r < 10, 'Very low lightness should produce dark colors');

  const veryLight = ColorUtils.hslaToRGBA({ h: 0, s: 100, l: 99, a: 1 });
  assert.ok(veryLight.r > 245, 'Very high lightness should produce light colors');

  // Test extreme saturation values
  const noSaturation = ColorUtils.hslaToRGBA({ h: 120, s: 0, l: 50, a: 1 });
  assert.equal(noSaturation.r, noSaturation.g, 'No saturation should produce gray');
  assert.equal(noSaturation.g, noSaturation.b, 'No saturation should produce gray');
});
