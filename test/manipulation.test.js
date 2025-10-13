const { test } = require('qunit');
const { ColorUtils } = require('../build/index.js');

test('lighten - RGBA colors', (assert) => {
  // Test lightening red
  const red = { r: 255, g: 0, b: 0, a: 1 };
  const lightenedRed = ColorUtils.lighten(red, 0.2);

  // Should convert to HSL, increase lightness, convert back
  assert.ok(lightenedRed.r === 255, 'Red component should remain max for red');
  assert.ok(lightenedRed.g > 0, 'Green component should increase when lightening red');
  assert.ok(lightenedRed.b > 0, 'Blue component should increase when lightening red');
  assert.equal(lightenedRed.a, 1, 'Alpha should be preserved');

  // Test lightening black (should become gray)
  const black = { r: 0, g: 0, b: 0, a: 1 };
  const lightenedBlack = ColorUtils.lighten(black, 0.5);
  assert.ok(lightenedBlack.r > 0, 'Red should increase when lightening black');
  assert.ok(lightenedBlack.g > 0, 'Green should increase when lightening black');
  assert.ok(lightenedBlack.b > 0, 'Blue should increase when lightening black');
  assert.equal(lightenedBlack.r, lightenedBlack.g, 'RGB should be equal for lightened black');
  assert.equal(lightenedBlack.g, lightenedBlack.b, 'RGB should be equal for lightened black');

  // Test lightening already light color (should not exceed 255)
  const lightGray = { r: 200, g: 200, b: 200, a: 1 };
  const lightenedGray = ColorUtils.lighten(lightGray, 0.5);
  assert.ok(lightenedGray.r <= 255, 'Red should not exceed 255');
  assert.ok(lightenedGray.g <= 255, 'Green should not exceed 255');
  assert.ok(lightenedGray.b <= 255, 'Blue should not exceed 255');
});

test('lighten - HSLA colors', (assert) => {
  // Test lightening red in HSL
  const redHsl = { h: 0, s: 100, l: 50, a: 1 };
  const lightenedRedHsl = ColorUtils.lighten(redHsl, 0.2);

  assert.equal(lightenedRedHsl.h, 0, 'Hue should remain unchanged');
  assert.equal(lightenedRedHsl.s, 100, 'Saturation should remain unchanged');
  assert.equal(lightenedRedHsl.l, 70, 'Lightness should increase by 20%');
  assert.equal(lightenedRedHsl.a, 1, 'Alpha should be preserved');

  // Test lightening at maximum lightness (should clamp to 100)
  const brightHsl = { h: 120, s: 100, l: 90, a: 1 };
  const maxLightened = ColorUtils.lighten(brightHsl, 0.3);
  assert.equal(maxLightened.l, 100, 'Lightness should clamp to 100%');

  // Test default amount (0.1)
  const blueHsl = { h: 240, s: 100, l: 50, a: 1 };
  const defaultLightened = ColorUtils.lighten(blueHsl);
  assert.equal(defaultLightened.l, 60, 'Default lightening should be 10%');
});

test('darken - RGBA and HSLA colors', (assert) => {
  // Test darkening RGBA
  const red = { r: 255, g: 0, b: 0, a: 1 };
  const darkenedRed = ColorUtils.darken(red, 0.2);
  assert.ok(darkenedRed.r < 255, 'Red component should decrease when darkening');
  assert.equal(darkenedRed.a, 1, 'Alpha should be preserved');

  // Test darkening HSLA
  const redHsl = { h: 0, s: 100, l: 50, a: 1 };
  const darkenedRedHsl = ColorUtils.darken(redHsl, 0.2);
  assert.equal(darkenedRedHsl.h, 0, 'Hue should remain unchanged');
  assert.equal(darkenedRedHsl.s, 100, 'Saturation should remain unchanged');
  assert.equal(darkenedRedHsl.l, 30, 'Lightness should decrease by 20%');

  // Test darkening at minimum lightness (should clamp to 0)
  const darkHsl = { h: 120, s: 100, l: 10, a: 1 };
  const maxDarkened = ColorUtils.darken(darkHsl, 0.3);
  assert.equal(maxDarkened.l, 0, 'Lightness should clamp to 0%');

  // Test default amount
  const blueHsl = { h: 240, s: 100, l: 50, a: 1 };
  const defaultDarkened = ColorUtils.darken(blueHsl);
  assert.equal(defaultDarkened.l, 40, 'Default darkening should be 10%');
});

test('saturate - RGBA colors', (assert) => {
  // Test saturating a gray color (should add color)
  const gray = { r: 128, g: 128, b: 128, a: 1 };
  const saturatedGray = ColorUtils.saturate(gray, 0.5);

  // Gray has 0% saturation, so saturating should make it more colorful
  // The exact color depends on the hue (which is arbitrary for gray)
  assert.equal(saturatedGray.a, 1, 'Alpha should be preserved');

  // Test saturating already saturated color (red)
  const red = { r: 255, g: 0, b: 0, a: 1 };
  const saturatedRed = ColorUtils.saturate(red, 0.2);
  // Red is already fully saturated, so it should remain the same
  assert.equal(saturatedRed.r, 255, 'Fully saturated red should not change');
  assert.equal(saturatedRed.g, 0, 'Fully saturated red should not change');
  assert.equal(saturatedRed.b, 0, 'Fully saturated red should not change');
});

test('saturate - HSLA colors', (assert) => {
  // Test saturating HSLA
  const mutedRed = { h: 0, s: 50, l: 50, a: 1 };
  const saturatedRed = ColorUtils.saturate(mutedRed, 0.3);

  assert.equal(saturatedRed.h, 0, 'Hue should remain unchanged');
  assert.equal(saturatedRed.s, 80, 'Saturation should increase by 30%');
  assert.equal(saturatedRed.l, 50, 'Lightness should remain unchanged');
  assert.equal(saturatedRed.a, 1, 'Alpha should be preserved');

  // Test saturating at maximum saturation (should clamp to 100)
  const brightRed = { h: 0, s: 90, l: 50, a: 1 };
  const maxSaturated = ColorUtils.saturate(brightRed, 0.3);
  assert.equal(maxSaturated.s, 100, 'Saturation should clamp to 100%');

  // Test default amount
  const blue = { h: 240, s: 50, l: 50, a: 1 };
  const defaultSaturated = ColorUtils.saturate(blue);
  assert.equal(defaultSaturated.s, 60, 'Default saturation increase should be 10%');
});

test('desaturate - RGBA and HSLA colors', (assert) => {
  // Test desaturating RGBA (colorful to gray)
  const red = { r: 255, g: 0, b: 0, a: 1 };
  const desaturatedRed = ColorUtils.desaturate(red, 0.5);

  // Should become more gray-ish
  assert.ok(desaturatedRed.g > 0, 'Green should increase when desaturating red');
  assert.ok(desaturatedRed.b > 0, 'Blue should increase when desaturating red');
  assert.equal(desaturatedRed.a, 1, 'Alpha should be preserved');

  // Test desaturating HSLA
  const brightBlue = { h: 240, s: 100, l: 50, a: 1 };
  const desaturatedBlue = ColorUtils.desaturate(brightBlue, 0.4);

  assert.equal(desaturatedBlue.h, 240, 'Hue should remain unchanged');
  assert.equal(desaturatedBlue.s, 60, 'Saturation should decrease by 40%');
  assert.equal(desaturatedBlue.l, 50, 'Lightness should remain unchanged');

  // Test desaturating at minimum saturation (should clamp to 0)
  const mutedColor = { h: 120, s: 10, l: 50, a: 1 };
  const maxDesaturated = ColorUtils.desaturate(mutedColor, 0.3);
  assert.equal(maxDesaturated.s, 0, 'Saturation should clamp to 0%');
});

test('fadeIn - RGBA and HSLA colors', (assert) => {
  // Test fading in RGBA
  const semiRed = { r: 255, g: 0, b: 0, a: 0.5 };
  const fadedInRed = ColorUtils.fadeIn(semiRed, 0.3);

  assert.equal(fadedInRed.r, 255, 'RGB values should remain unchanged');
  assert.equal(fadedInRed.g, 0, 'RGB values should remain unchanged');
  assert.equal(fadedInRed.b, 0, 'RGB values should remain unchanged');
  assert.closeTo(fadedInRed.a, 0.8, 0.1, 'Alpha should increase by 0.3');

  // Test fading in HSLA
  const semiBlue = { h: 240, s: 100, l: 50, a: 0.2 };
  const fadedInBlue = ColorUtils.fadeIn(semiBlue, 0.4);

  assert.equal(fadedInBlue.h, 240, 'HSL values should remain unchanged');
  assert.equal(fadedInBlue.s, 100, 'HSL values should remain unchanged');
  assert.equal(fadedInBlue.l, 50, 'HSL values should remain unchanged');
  assert.closeTo(fadedInBlue.a, 0.6, 0.1, 'Alpha should increase by 0.4');

  // Test fading in at maximum alpha (should clamp to 1)
  const almostOpaque = { r: 255, g: 255, b: 255, a: 0.9 };
  const maxFadedIn = ColorUtils.fadeIn(almostOpaque, 0.3);
  assert.equal(maxFadedIn.a, 1, 'Alpha should clamp to 1');

  // Test default amount
  const transparent = { r: 0, g: 0, b: 0, a: 0.5 };
  const defaultFadedIn = ColorUtils.fadeIn(transparent);
  assert.closeTo(defaultFadedIn.a, 0.6, 0.1, 'Default fade in should be 0.1');

  // Test undefined alpha (should treat as 1)
  const noAlpha = { r: 100, g: 100, b: 100 };
  const fadedInNoAlpha = ColorUtils.fadeIn(noAlpha, 0.1);
  assert.equal(fadedInNoAlpha.a, 1, 'Undefined alpha should be treated as 1 and clamped');
});

test('fadeOut - RGBA and HSLA colors', (assert) => {
  // Test fading out RGBA
  const opaqueRed = { r: 255, g: 0, b: 0, a: 1 };
  const fadedOutRed = ColorUtils.fadeOut(opaqueRed, 0.3);

  assert.equal(fadedOutRed.r, 255, 'RGB values should remain unchanged');
  assert.equal(fadedOutRed.g, 0, 'RGB values should remain unchanged');
  assert.equal(fadedOutRed.b, 0, 'RGB values should remain unchanged');
  assert.equal(fadedOutRed.a, 0.7, 'Alpha should decrease by 0.3');

  // Test fading out HSLA
  const opaqueGreen = { h: 120, s: 100, l: 50, a: 0.8 };
  const fadedOutGreen = ColorUtils.fadeOut(opaqueGreen, 0.4);

  assert.equal(fadedOutGreen.h, 120, 'HSL values should remain unchanged');
  assert.equal(fadedOutGreen.s, 100, 'HSL values should remain unchanged');
  assert.equal(fadedOutGreen.l, 50, 'HSL values should remain unchanged');
  assert.equal(fadedOutGreen.a, 0.4, 'Alpha should decrease by 0.4');

  // Test fading out at minimum alpha (should clamp to 0)
  const almostTransparent = { r: 255, g: 255, b: 255, a: 0.1 };
  const maxFadedOut = ColorUtils.fadeOut(almostTransparent, 0.3);
  assert.equal(maxFadedOut.a, 0, 'Alpha should clamp to 0');

  // Test default amount
  const opaque = { r: 0, g: 0, b: 0, a: 1 };
  const defaultFadedOut = ColorUtils.fadeOut(opaque);
  assert.equal(defaultFadedOut.a, 0.9, 'Default fade out should be 0.1');
});

test('invert - RGBA colors', (assert) => {
  // Test inverting primary colors
  const red = { r: 255, g: 0, b: 0, a: 1 };
  const invertedRed = ColorUtils.invert(red);
  assert.equal(invertedRed.r, 0, 'Red should invert to 0');
  assert.equal(invertedRed.g, 255, 'Green should invert to 255');
  assert.equal(invertedRed.b, 255, 'Blue should invert to 255');
  assert.equal(invertedRed.a, 1, 'Alpha should be preserved');

  const green = { r: 0, g: 255, b: 0, a: 1 };
  const invertedGreen = ColorUtils.invert(green);
  assert.equal(invertedGreen.r, 255, 'Red should invert to 255');
  assert.equal(invertedGreen.g, 0, 'Green should invert to 0');
  assert.equal(invertedGreen.b, 255, 'Blue should invert to 255');

  const blue = { r: 0, g: 0, b: 255, a: 1 };
  const invertedBlue = ColorUtils.invert(blue);
  assert.equal(invertedBlue.r, 255, 'Red should invert to 255');
  assert.equal(invertedBlue.g, 255, 'Green should invert to 255');
  assert.equal(invertedBlue.b, 0, 'Blue should invert to 0');

  // Test inverting black and white
  const black = { r: 0, g: 0, b: 0, a: 1 };
  const invertedBlack = ColorUtils.invert(black);
  assert.equal(invertedBlack.r, 255, 'Black should invert to white');
  assert.equal(invertedBlack.g, 255, 'Black should invert to white');
  assert.equal(invertedBlack.b, 255, 'Black should invert to white');

  const white = { r: 255, g: 255, b: 255, a: 1 };
  const invertedWhite = ColorUtils.invert(white);
  assert.equal(invertedWhite.r, 0, 'White should invert to black');
  assert.equal(invertedWhite.g, 0, 'White should invert to black');
  assert.equal(invertedWhite.b, 0, 'White should invert to black');

  // Test inverting gray (should remain gray)
  const gray = { r: 128, g: 128, b: 128, a: 0.5 };
  const invertedGray = ColorUtils.invert(gray);
  assert.equal(invertedGray.r, 127, 'Gray should invert to complementary gray');
  assert.equal(invertedGray.g, 127, 'Gray should invert to complementary gray');
  assert.equal(invertedGray.b, 127, 'Gray should invert to complementary gray');
  assert.equal(invertedGray.a, 0.5, 'Alpha should be preserved');
});

test('invert - HSLA colors', (assert) => {
  // Test inverting HSLA colors (should convert to RGBA, invert, convert back)
  const redHsl = { h: 0, s: 100, l: 50, a: 1 };
  const invertedRedHsl = ColorUtils.invert(redHsl);

  // Inverted red (cyan-ish) should have different hue
  assert.equal(invertedRedHsl.h, 180, 'Red hue should invert to cyan (180°)');
  assert.equal(invertedRedHsl.s, 100, 'Saturation should remain 100%');
  assert.equal(invertedRedHsl.l, 50, 'Lightness should remain 50%');
  assert.equal(invertedRedHsl.a, 1, 'Alpha should be preserved');

  // Test inverting grayscale (saturation = 0)
  const grayHsl = { h: 0, s: 0, l: 50, a: 1 };
  const invertedGrayHsl = ColorUtils.invert(grayHsl);
  assert.equal(invertedGrayHsl.s, 0, 'Gray saturation should remain 0');
  assert.equal(invertedGrayHsl.l, 50, 'Gray lightness should remain 50% (128 -> 127 -> ~50%)');

  // Test alpha preservation
  const semiTransparentBlue = { h: 240, s: 100, l: 50, a: 0.7 };
  const invertedSemiBlue = ColorUtils.invert(semiTransparentBlue);
  assert.equal(invertedSemiBlue.a, 0.7, 'Alpha should be preserved');
});

test('blend - RGBA colors', (assert) => {
  // Test blending red and blue at 50%
  const red = { r: 255, g: 0, b: 0, a: 1 };
  const blue = { r: 0, g: 0, b: 255, a: 1 };
  const blendedPurple = ColorUtils.blend(red, blue, 0.5);

  assert.equal(blendedPurple.r, 128, 'Red component should be average of red and blue');
  assert.equal(blendedPurple.g, 0, 'Green component should be average of red and blue');
  assert.equal(blendedPurple.b, 128, 'Blue component should be average of red and blue');
  assert.equal(blendedPurple.a, 1, 'Alpha should be preserved');

  // Test blending with different alpha values
  const semiTransparentRed = { r: 255, g: 0, b: 0, a: 0.5 };
  const semiTransparentBlue = { r: 0, g: 0, b: 255, a: 0.5 };
  const blendedSemi = ColorUtils.blend(semiTransparentRed, semiTransparentBlue, 0.5);

  assert.equal(blendedSemi.r, 128, 'Red component should be average of red and blue');
  assert.equal(blendedSemi.g, 0, 'Green component should be average of red and blue');
  assert.equal(blendedSemi.b, 128, 'Blue component should be average of red and blue');
  assert.equal(blendedSemi.a, 0.5, 'Alpha should be average of both alphas');

  // Test blending with amount = 0 (should return first color)
  const blendAmountZero = ColorUtils.blend(red, blue, 0);
  assert.deepEqual(blendAmountZero, red, 'Blending with amount 0 should return the first color');

  // Test blending with amount = 1 (should return second color)
  const blendAmountOne = ColorUtils.blend(red, blue, 1);
  assert.deepEqual(blendAmountOne, blue, 'Blending with amount 1 should return the second color');
});

test('blend - HSLA colors', (assert) => {
  // Test blending red and blue in HSLA at 50%
  const redHsl = { h: 0, s: 100, l: 50, a: 1 };
  const blueHsl = { h: 240, s: 100, l: 50, a: 1 };
  const blendedPurpleHsl = ColorUtils.blend(redHsl, blueHsl, 0.5);

  // The resulting hue should be between red (0) and blue (240)
  assert.ok(blendedPurpleHsl.h > 0 && blendedPurpleHsl.h < 240, 'Hue should be between red and blue');
  assert.equal(blendedPurpleHsl.s, 100, 'Saturation should remain 100%');
  assert.equal(blendedPurpleHsl.l, 50, 'Lightness should remain 50%');
  assert.equal(blendedPurpleHsl.a, 1, 'Alpha should be preserved');

  // Test blending with different alpha values
  const semiTransparentRedHsl = { h: 0, s: 100, l: 50, a: 0.5 };
  const semiTransparentBlueHsl = { h: 240, s: 100, l: 50, a: 0.5 };
  const blendedSemiHsl = ColorUtils.blend(semiTransparentRedHsl, semiTransparentBlueHsl, 0.5);

  assert.ok(blendedSemiHsl.h > 0 && blendedSemiHsl.h < 240, 'Hue should be between red and blue');
  assert.equal(blendedSemiHsl.s, 100, 'Saturation should remain 100%');
  assert.equal(blendedSemiHsl.l, 50, 'Lightness should remain 50%');
  assert.equal(blendedSemiHsl.a, 0.5, 'Alpha should be average of both alphas');

  // Test blending with amount = 0 (should return first color)
  const blendAmountZeroHsl = ColorUtils.blend(redHsl, blueHsl, 0);
  assert.deepEqual(blendAmountZeroHsl, redHsl, 'Blending with amount 0 should return the first color');

  // Test blending with amount = 1 (should return second color)
  const blendAmountOneHsl = ColorUtils.blend(redHsl, blueHsl, 1);
  assert.deepEqual(blendAmountOneHsl, blueHsl, 'Blending with amount 1 should return the second color');
});

test('color manipulation - type preservation', (assert) => {
  // Test that RGBA input returns RGBA output
  const rgbaInput = { r: 255, g: 128, b: 0, a: 0.8 };
  const lightenedRgba = ColorUtils.lighten(rgbaInput, 0.2);

  assert.ok('r' in lightenedRgba, 'Output should have r property');
  assert.ok('g' in lightenedRgba, 'Output should have g property');
  assert.ok('b' in lightenedRgba, 'Output should have b property');
  assert.ok(!('h' in lightenedRgba), 'Output should not have h property');

  // Test that HSLA input returns HSLA output
  const hslaInput = { h: 120, s: 75, l: 50, a: 0.9 };
  const saturatedHsla = ColorUtils.saturate(hslaInput, 0.2);

  assert.ok('h' in saturatedHsla, 'Output should have h property');
  assert.ok('s' in saturatedHsla, 'Output should have s property');
  assert.ok('l' in saturatedHsla, 'Output should have l property');
  assert.ok(!('r' in saturatedHsla), 'Output should not have r property');
});

test('edge cases and clamping', (assert) => {
  // Test extreme lightening
  const white = { h: 0, s: 100, l: 100, a: 1 };
  const overLightened = ColorUtils.lighten(white, 1.0);
  assert.equal(overLightened.l, 100, 'Lightness should not exceed 100%');

  // Test extreme darkening
  const black = { h: 0, s: 100, l: 0, a: 1 };
  const overDarkened = ColorUtils.darken(black, 1.0);
  assert.equal(overDarkened.l, 0, 'Lightness should not go below 0%');

  // Test extreme saturation
  const fullSat = { h: 0, s: 100, l: 50, a: 1 };
  const overSaturated = ColorUtils.saturate(fullSat, 1.0);
  assert.equal(overSaturated.s, 100, 'Saturation should not exceed 100%');

  // Test extreme desaturation
  const noSat = { h: 0, s: 0, l: 50, a: 1 };
  const overDesaturated = ColorUtils.desaturate(noSat, 1.0);
  assert.equal(overDesaturated.s, 0, 'Saturation should not go below 0%');

  // Test extreme fade in
  const opaque = { r: 255, g: 0, b: 0, a: 1 };
  const overFadedIn = ColorUtils.fadeIn(opaque, 1.0);
  assert.equal(overFadedIn.a, 1, 'Alpha should not exceed 1');

  // Test extreme fade out
  const transparent = { r: 255, g: 0, b: 0, a: 0 };
  const overFadedOut = ColorUtils.fadeOut(transparent, 1.0);
  assert.equal(overFadedOut.a, 0, 'Alpha should not go below 0');
});
