# Color

A small color utilities library.

## Installation

```bash
npm i @basementuniverse/color
```

## Usage

```typescript
import { RGBAColor, HSLAColor } from '@basementuniverse/color';

const myRGBAColor: RGBAColor = { r: 255, g: 0, b: 0, a: 1 }; // Red color in RGBA
const myHSLAColor: HSLAColor = { h: 0, s: 100, l: 50, a: 1 }; // Red color in HSLA
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
import { stringToRGBA, stringToHSLA } from '@basementuniverse/color';

const rgbaColor = stringToRGBA('rgba(255, 0, 0, 1)'); // { r: 255, g: 0, b: 0, a: 1 }
const hslaColor = stringToHSLA('hsla(0, 100%, 50%, 1)'); // { h: 0, s: 100, l: 50, a: 1 }
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
import { rgbaToHSLA, hslaToRGBA } from '@basementuniverse/color';

const hslaColor = rgbaToHSLA(myRGBAColor); // Convert RGBA to HSLA
const rgbaColor = hslaToRGBA(myHSLAColor); // Convert HSLA to RGBA
```

### Convert color object to string

```typescript
import { rgbaToString, hslaToString } from '@basementuniverse/color';

const rgbaString = rgbaToString(myRGBAColor); // "rgba(255, 0, 0, 1)"
const hslaString = hslaToString(myHSLAColor); // "hsla(0, 100%, 50%, 1)"

// With options...
const hexRgbaString = rgbaToString(myRGBAColor, { mode: 'hex' }); // "#ff0000"
const hexRgbaStringWithAlpha = rgbaToString(myRGBAColor, { mode: 'hex', alpha: true }); // "#ff0000ff"
```

Supported modes: `rgb` | `hsl` | `hex`.

### Manipulate colors

```typescript
import { lighten, darken, saturate, desaturate, fadeIn, fadeOut, invert, blend } from '@basementuniverse/color';

const lighterColor = lighten(myRGBAColor, 0.1); // Lighten color by 10%
const darkerColor = darken(myRGBAColor, 0.1); // Darken color by 10%
const moreSaturatedColor = saturate(myRGBAColor, 0.1); // Increase saturation by 10%
const lessSaturatedColor = desaturate(myRGBAColor, 0.1); // Decrease saturation by 10%
const moreOpaqueColor = fadeIn(myRGBAColor, 0.1); // Increase opacity by 10%
const moreTransparentColor = fadeOut(myRGBAColor, 0.1); // Decrease opacity by 10%
const invertedColor = invert(myRGBAColor); // Invert color
const blendedColor = blend(myRGBAColor, anotherColor, 0.5); // Blend with another color at 50%
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
