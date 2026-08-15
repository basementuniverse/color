# Color

A small color utilities library.

## Installation

```bash
npm i @basementuniverse/color
```

For direct browser usage, include the UMD build with a script tag:

```html
<script src="build/index.js"></script>
```

The build exposes its exports through the `BasementUniverseColor` browser
namespace. It does not add each export directly to `window`.

## Usage

```typescript
import { RGBAColor, HSLAColor } from '@basementuniverse/color';

const myRGBAColor: RGBAColor = { r: 255, g: 0, b: 0, a: 1 }; // Red color in RGBA
const myHSLAColor: HSLAColor = { h: 0, s: 100, l: 50, a: 1 }; // Red color in HSLA
```

When using the library directly from a browser script, prefix exports with
`BasementUniverseColor`:

```html
<script src="/build/index.js"></script>
<script>
  const color = BasementUniverseColor.ColorUtils.stringToRGBA('#ff0000');
</script>
```

### Type guards

```typescript
import { isRGBAColor, isHSLAColor } from '@basementuniverse/color';

if (isRGBAColor(myColor)) {
  // myColor is RGBAColor
} else if (isHSLAColor(myColor)) {
  // myColor is HSLAColor
}
```

### Parse a string to a colour object

```typescript
import { ColorUtils } from '@basementuniverse/color';

const rgbaColor = ColorUtils.stringToRGBA('rgba(255, 0, 0, 1)'); // { r: 255, g: 0, b: 0, a: 1 }
const hslaColor = ColorUtils.stringToHSLA('hsla(0, 100%, 50%, 1)'); // { h: 0, s: 100, l: 50, a: 1 }
```

Supported format examples:

```
red
#f00
#ff0000
#ff0000ff
rgb(255, 0, 0)
rgb(100%, 0%, 0%)
rgba(255, 0, 0, 1)
rgba(100%, 0%, 0%, 1)
hsl(0, 100%, 50%)
hsla(0, 100%, 50%, 1)
```

### Convert between RGBA and HSLA

```typescript
import { ColorUtils } from '@basementuniverse/color';

const hslaColor = ColorUtils.rgbaToHSLA(myRGBAColor); // Convert RGBA to HSLA
const rgbaColor = ColorUtils.hslaToRGBA(myHSLAColor); // Convert HSLA to RGBA
```

### Convert color object to string

```typescript
import { ColorUtils } from '@basementuniverse/color';

const rgbaString = ColorUtils.rgbaToString(myRGBAColor); // "rgba(255, 0, 0, 1)"
const hslaString = ColorUtils.hslaToString(myHSLAColor); // "hsla(0, 100%, 50%, 1)"

// With options...
const hexRgbaString = ColorUtils.rgbaToString(myRGBAColor, { mode: 'hex' }); // "#ff0000"
const hexRgbaStringWithAlpha = ColorUtils.rgbaToString(myRGBAColor, { mode: 'hex', alpha: true }); // "#ff0000ff"
```

Supported modes: `rgb` | `hsl` | `hex`.

### Manipulate colors

```typescript
import { ColorUtils } from '@basementuniverse/color';

const lighterColor = ColorUtils.lighten(myRGBAColor, 0.1); // Lighten color by 10%
const darkerColor = ColorUtils.darken(myRGBAColor, 0.1); // Darken color by 10%
const moreSaturatedColor = ColorUtils.saturate(myRGBAColor, 0.1); // Increase saturation by 10%
const lessSaturatedColor = ColorUtils.desaturate(myRGBAColor, 0.1); // Decrease saturation by 10%
const moreOpaqueColor = ColorUtils.fadeIn(myRGBAColor, 0.1); // Increase opacity by 10%
const moreTransparentColor = ColorUtils.fadeOut(myRGBAColor, 0.1); // Decrease opacity by 10%
const invertedColor = ColorUtils.invert(myRGBAColor); // Invert color
const blendedColor = ColorUtils.blend(myRGBAColor, anotherColor, 0.5); // Blend with another color at 50%
const tintedColor = ColorUtils.hue(myRGBAColor, 180); // Change hue by 180 degrees
```

### Generate random colors

```typescript
import { ColorUtils } from '@basementuniverse/color';

const randomRedTint = ColorUtils.randomRGBA({
  r: { min: 180, max: 255 },
  g: { min: 0, max: 90 },
  b: { min: 0, max: 90 },
});

const randomPastel = ColorUtils.randomHSLA({
  h: { min: 0, max: 360 },
  s: { min: 20, max: 50 },
  l: { min: 65, max: 85 },
});

const randomGradientColor = ColorUtils.randomGradient(
  [
    { r: 255, g: 0, b: 0, a: 1 },
    { r: 255, g: 255, b: 0, a: 1 },
    { r: 0, g: 255, b: 0, a: 1 },
  ],
  {
    position: { mean: 0.5, stddev: 0.15 },
  }
);
```

Pass `rng: () => number` if you want reproducible output for tests or procedural generation.
