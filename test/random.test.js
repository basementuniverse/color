const { test } = require('qunit');
const { ColorUtils } = require('../build/index.js');

function makeRng(values) {
  let index = 0;
  return () => {
    const value = values[index % values.length];
    index += 1;
    return value;
  };
}

test('randomRGBA - uniform channel ranges', (assert) => {
  const color = ColorUtils.randomRGBA({
    r: { min: 10, max: 20 },
    g: { min: 20, max: 40 },
    b: { min: 100, max: 200 },
    a: { min: 0.2, max: 0.6 },
    rng: makeRng([0.25, 0.5, 0.75, 0.1]),
  });

  assert.equal(color.r, 13, 'Red should be sampled from the requested range');
  assert.equal(color.g, 30, 'Green should be sampled from the requested range');
  assert.equal(color.b, 175, 'Blue should be sampled from the requested range');
  assert.equal(color.a, 0.24, 'Alpha should be sampled and rounded');
});

test('randomRGBA - normal channel ranges', (assert) => {
  const color = ColorUtils.randomRGBA({
    r: { mean: 120, stddev: 15 },
    g: { mean: 80, stddev: 10 },
    b: { mean: 40, stddev: 5 },
    a: { mean: 0.65, stddev: 0.1 },
    rng: makeRng([0.5, 0.25, 0.5, 0.25, 0.5, 0.25, 0.5, 0.25]),
  });

  assert.equal(color.r, 120, 'Normal sampling should use the provided mean when the random offset is zero');
  assert.equal(color.g, 80, 'Normal sampling should use the provided mean when the random offset is zero');
  assert.equal(color.b, 40, 'Normal sampling should use the provided mean when the random offset is zero');
  assert.equal(color.a, 0.65, 'Normal sampling should preserve the requested alpha mean');
});

test('randomHSLA - uniform and default alpha', (assert) => {
  const color = ColorUtils.randomHSLA({
    h: { min: 30, max: 60 },
    s: { min: 10, max: 20 },
    l: { min: 70, max: 90 },
    rng: makeRng([0.5, 0.25, 0.75]),
  });

  assert.equal(color.h, 45, 'Hue should be sampled from the requested range');
  assert.equal(color.s, 13, 'Saturation should be sampled from the requested range');
  assert.equal(color.l, 85, 'Lightness should be sampled from the requested range');
  assert.equal(color.a, 1, 'Alpha should default to 1 when omitted');
});

test('randomHSLA - normal channel ranges', (assert) => {
  const color = ColorUtils.randomHSLA({
    h: { mean: 180, stddev: 20 },
    s: { mean: 55, stddev: 5 },
    l: { mean: 45, stddev: 10 },
    a: { mean: 0.3, stddev: 0.1 },
    rng: makeRng([0.5, 0.25, 0.5, 0.25, 0.5, 0.25, 0.5, 0.25]),
  });

  assert.equal(color.h, 180, 'Normal sampling should use the provided mean when the random offset is zero');
  assert.equal(color.s, 55, 'Normal sampling should use the provided mean when the random offset is zero');
  assert.equal(color.l, 45, 'Normal sampling should use the provided mean when the random offset is zero');
  assert.equal(color.a, 0.3, 'Normal sampling should preserve the requested alpha mean');
});

test('randomGradient - rgb interpolation', (assert) => {
  const color = ColorUtils.randomGradient(
    [
      { r: 255, g: 0, b: 0, a: 1 },
      { r: 0, g: 255, b: 0, a: 1 },
      { r: 0, g: 0, b: 255, a: 1 },
    ],
    {
      position: { min: 0, max: 1 },
      rng: makeRng([0.25]),
    }
  );

  assert.equal(color.r, 128, 'Gradient should interpolate between the first two stops');
  assert.equal(color.g, 128, 'Gradient should interpolate between the first two stops');
  assert.equal(color.b, 0, 'Gradient should interpolate between the first two stops');
  assert.equal(color.a, 1, 'Alpha should be preserved across gradient interpolation');
});

test('randomGradient - normal position and hsl interpolation', (assert) => {
  const color = ColorUtils.randomGradient(
    [
      { h: 0, s: 100, l: 50, a: 1 },
      { h: 240, s: 100, l: 50, a: 1 },
    ],
    {
      space: 'hsl',
      position: { mean: 2, stddev: 0 },
      rng: makeRng([0.5, 0.25]),
    }
  );

  assert.equal(color.h, 240, 'Position should clamp to the end of the gradient');
  assert.equal(color.s, 100, 'Saturation should be preserved during HSL interpolation');
  assert.equal(color.l, 50, 'Lightness should be preserved during HSL interpolation');
  assert.equal(color.a, 1, 'Alpha should be preserved during HSL interpolation');
});

test('randomGradient - empty seed list throws', (assert) => {
  assert.throws(
    () => ColorUtils.randomGradient([]),
    /At least one seed color is required/,
    'An empty gradient should be rejected'
  );
});
