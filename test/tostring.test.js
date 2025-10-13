const { test } = require('qunit');
const { ColorUtils } = require('../build/index.js');

test('rgbaToString - RGB format (default)', (assert) => {
  // Test basic colors
  assert.equal(ColorUtils.rgbaToString({ r: 255, g: 0, b: 0, a: 1 }), 'rgb(255, 0, 0)', 'Red should format correctly');
  assert.equal(ColorUtils.rgbaToString({ r: 0, g: 255, b: 0, a: 1 }), 'rgb(0, 255, 0)', 'Green should format correctly');
  assert.equal(ColorUtils.rgbaToString({ r: 0, g: 0, b: 255, a: 1 }), 'rgb(0, 0, 255)', 'Blue should format correctly');

  // Test with undefined alpha (should default to 1 and use rgb format)
  assert.equal(ColorUtils.rgbaToString({ r: 128, g: 128, b: 128 }), 'rgb(128, 128, 128)', 'Undefined alpha should use rgb format');

  // Test with alpha = 1 (should use rgb format)
  assert.equal(ColorUtils.rgbaToString({ r: 200, g: 100, b: 50, a: 1 }), 'rgb(200, 100, 50)', 'Alpha = 1 should use rgb format');
});

test('rgbaToString - RGBA format (alpha < 1)', (assert) => {
  // Test with alpha < 1 (should use rgba format)
  assert.equal(ColorUtils.rgbaToString({ r: 255, g: 0, b: 0, a: 0.5 }), 'rgba(255, 0, 0, 0.5)', 'Alpha < 1 should use rgba format');
  assert.equal(ColorUtils.rgbaToString({ r: 0, g: 255, b: 0, a: 0 }), 'rgba(0, 255, 0, 0)', 'Alpha = 0 should use rgba format');
  assert.equal(ColorUtils.rgbaToString({ r: 100, g: 150, b: 200, a: 0.75 }), 'rgba(100, 150, 200, 0.75)', 'Fractional alpha should use rgba format');
});

test('rgbaToString - RGB format with alpha option', (assert) => {
  // Test forcing RGB format even with alpha < 1
  assert.equal(ColorUtils.rgbaToString({ r: 255, g: 0, b: 0, a: 0.5 }, { alpha: false }), 'rgb(255, 0, 0)', 'Alpha option false should force RGB format');
  assert.equal(ColorUtils.rgbaToString({ r: 0, g: 255, b: 0, a: 0.8 }, { alpha: false }), 'rgb(0, 255, 0)', 'Alpha option false should ignore alpha');

  // Test forcing RGBA format even with alpha = 1
  assert.equal(ColorUtils.rgbaToString({ r: 255, g: 0, b: 0, a: 1 }, { alpha: true }), 'rgba(255, 0, 0, 1)', 'Alpha option true should force RGBA format');
});

test('rgbaToString - hex format', (assert) => {
  // Test basic hex format
  assert.equal(ColorUtils.rgbaToString({ r: 255, g: 0, b: 0, a: 1 }, { mode: 'hex' }), '#ff0000', 'Red should format as hex');
  assert.equal(ColorUtils.rgbaToString({ r: 0, g: 255, b: 0, a: 1 }, { mode: 'hex' }), '#00ff00', 'Green should format as hex');
  assert.equal(ColorUtils.rgbaToString({ r: 0, g: 0, b: 255, a: 1 }, { mode: 'hex' }), '#0000ff', 'Blue should format as hex');
  assert.equal(ColorUtils.rgbaToString({ r: 255, g: 255, b: 255, a: 1 }, { mode: 'hex' }), '#ffffff', 'White should format as hex');
  assert.equal(ColorUtils.rgbaToString({ r: 0, g: 0, b: 0, a: 1 }, { mode: 'hex' }), '#000000', 'Black should format as hex');

  // Test with various values
  assert.equal(ColorUtils.rgbaToString({ r: 171, g: 205, b: 239, a: 1 }, { mode: 'hex' }), '#abcdef', 'Mixed colors should format as hex');
  assert.equal(ColorUtils.rgbaToString({ r: 16, g: 32, b: 48, a: 1 }, { mode: 'hex' }), '#102030', 'Low values should pad with zeros');
});

test('rgbaToString - hex format with alpha', (assert) => {
  // Test hex with alpha when alpha < 1
  assert.equal(ColorUtils.rgbaToString({ r: 255, g: 0, b: 0, a: 0.5 }, { mode: 'hex' }), '#ff000080', 'Alpha 0.5 should add alpha channel');
  assert.equal(ColorUtils.rgbaToString({ r: 0, g: 255, b: 0, a: 0 }, { mode: 'hex' }), '#00ff0000', 'Alpha 0 should add alpha channel');
  assert.equal(ColorUtils.rgbaToString({ r: 0, g: 0, b: 255, a: 0.25 }, { mode: 'hex' }), '#0000ff40', 'Alpha 0.25 should add alpha channel');

  // Test hex without alpha when alpha = 1
  assert.equal(ColorUtils.rgbaToString({ r: 255, g: 0, b: 0, a: 1 }, { mode: 'hex' }), '#ff0000', 'Alpha 1 should not add alpha channel by default');

  // Test forcing alpha in hex
  assert.equal(ColorUtils.rgbaToString({ r: 255, g: 0, b: 0, a: 1 }, { mode: 'hex', alpha: true }), '#ff0000ff', 'Alpha option true should force alpha in hex');

  // Test disabling alpha in hex
  assert.equal(ColorUtils.rgbaToString({ r: 255, g: 0, b: 0, a: 0.5 }, { mode: 'hex', alpha: false }), '#ff0000', 'Alpha option false should ignore alpha in hex');
});

test('hslaToString - HSL format (default)', (assert) => {
  // Test basic colors
  assert.equal(ColorUtils.hslaToString({ h: 0, s: 100, l: 50, a: 1 }), 'hsl(0, 100%, 50%)', 'Red should format correctly');
  assert.equal(ColorUtils.hslaToString({ h: 120, s: 100, l: 50, a: 1 }), 'hsl(120, 100%, 50%)', 'Green should format correctly');
  assert.equal(ColorUtils.hslaToString({ h: 240, s: 100, l: 50, a: 1 }), 'hsl(240, 100%, 50%)', 'Blue should format correctly');

  // Test with undefined alpha (should default to 1 and use hsl format)
  assert.equal(ColorUtils.hslaToString({ h: 180, s: 50, l: 25 }), 'hsl(180, 50%, 25%)', 'Undefined alpha should use hsl format');

  // Test with alpha = 1 (should use hsl format)
  assert.equal(ColorUtils.hslaToString({ h: 300, s: 75, l: 60, a: 1 }), 'hsl(300, 75%, 60%)', 'Alpha = 1 should use hsl format');
});

test('hslaToString - HSLA format (alpha < 1)', (assert) => {
  // Test with alpha < 1 (should use hsla format)
  assert.equal(ColorUtils.hslaToString({ h: 0, s: 100, l: 50, a: 0.5 }), 'hsla(0, 100%, 50%, 0.5)', 'Alpha < 1 should use hsla format');
  assert.equal(ColorUtils.hslaToString({ h: 120, s: 100, l: 50, a: 0 }), 'hsla(120, 100%, 50%, 0)', 'Alpha = 0 should use hsla format');
  assert.equal(ColorUtils.hslaToString({ h: 240, s: 75, l: 25, a: 0.8 }), 'hsla(240, 75%, 25%, 0.8)', 'Fractional alpha should use hsla format');
});

test('hslaToString - HSL format with alpha option', (assert) => {
  // Test forcing HSL format even with alpha < 1
  assert.equal(ColorUtils.hslaToString({ h: 0, s: 100, l: 50, a: 0.5 }, { alpha: false }), 'hsl(0, 100%, 50%)', 'Alpha option false should force HSL format');
  assert.equal(ColorUtils.hslaToString({ h: 120, s: 75, l: 25, a: 0.8 }, { alpha: false }), 'hsl(120, 75%, 25%)', 'Alpha option false should ignore alpha');

  // Test forcing HSLA format even with alpha = 1
  assert.equal(ColorUtils.hslaToString({ h: 0, s: 100, l: 50, a: 1 }, { alpha: true }), 'hsla(0, 100%, 50%, 1)', 'Alpha option true should force HSLA format');
});

test('hslaToString - hex format', (assert) => {
  // Test hex format (should convert to RGBA first)
  assert.equal(ColorUtils.hslaToString({ h: 0, s: 100, l: 50, a: 1 }, { mode: 'hex' }), '#ff0000', 'Red HSL should convert to hex');
  assert.equal(ColorUtils.hslaToString({ h: 120, s: 100, l: 50, a: 1 }, { mode: 'hex' }), '#00ff00', 'Green HSL should convert to hex');
  assert.equal(ColorUtils.hslaToString({ h: 240, s: 100, l: 50, a: 1 }, { mode: 'hex' }), '#0000ff', 'Blue HSL should convert to hex');

  // Test hex with alpha
  assert.equal(ColorUtils.hslaToString({ h: 0, s: 100, l: 50, a: 0.5 }, { mode: 'hex' }), '#ff000080', 'HSL with alpha should convert to hex with alpha');

  // Test grayscale
  assert.equal(ColorUtils.hslaToString({ h: 0, s: 0, l: 50, a: 1 }, { mode: 'hex' }), '#808080', 'Grayscale HSL should convert to hex');
  assert.equal(ColorUtils.hslaToString({ h: 180, s: 0, l: 0, a: 1 }, { mode: 'hex' }), '#000000', 'Black HSL should convert to hex');
  assert.equal(ColorUtils.hslaToString({ h: 360, s: 0, l: 100, a: 1 }, { mode: 'hex' }), '#ffffff', 'White HSL should convert to hex');
});

test('edge cases and rounding', (assert) => {
  // Test rounding of RGB values
  const color1 = { r: 255.7, g: 128.3, b: 0.1, a: 1 };
  assert.equal(ColorUtils.rgbaToString(color1), 'rgb(256, 128, 0)', 'RGB values should be rounded');

  // Test hex formatting with single digits
  const color2 = { r: 1, g: 16, b: 255, a: 1 };
  assert.equal(ColorUtils.rgbaToString(color2, { mode: 'hex' }), '#0110ff', 'Single digit hex should be padded');

  // Test HSL with decimal values
  const hsla1 = { h: 180.5, s: 75.7, l: 50.3, a: 1 };
  assert.equal(ColorUtils.hslaToString(hsla1), 'hsl(181, 76%, 50%)', 'HSL values should be rounded');

  // Test alpha precision
  const color3 = { r: 255, g: 0, b: 0, a: 0.123456 };
  assert.equal(ColorUtils.rgbaToString(color3), 'rgba(255, 0, 0, 0.123456)', 'Alpha precision should be preserved');
});
