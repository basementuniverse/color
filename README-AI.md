# Color Library API Reference

TypeScript color manipulation library. Import: `@basementuniverse/color`

## Types

```typescript
type RGBAColor = { r: number; g: number; b: number; a?: number };
type HSLAColor = { h: number; s: number; l: number; a?: number };
```

RGBA: r,g,b ∈ [0,255], a ∈ [0,1] (default: 1)
HSLA: h ∈ [0,360), s,l ∈ [0,100], a ∈ [0,1] (default: 1)

## Exported Functions

All functions available via named imports or `ColorUtils` object.

### Parsing

**stringToRGBA(colorString: string): RGBAColor**
Parse string to RGBA. Supports: named colors, hex (#RGB, #RRGGBB, #RRGGBBAA), rgb(a), hsl(a). Returns black {r:0,g:0,b:0,a:1} if invalid.

**stringToHSLA(colorString: string): HSLAColor**
Parse string to HSLA (converts via RGBA internally).

### Conversion

**rgbaToHSLA(rgba: RGBAColor): HSLAColor**
Convert RGBA to HSLA.

**hslaToRGBA(hsla: HSLAColor): RGBAColor**
Convert HSLA to RGBA.

### String Output

**rgbaToString(rgba: RGBAColor, options?: { mode?: 'rgb' | 'hex'; alpha?: boolean }): string**
- mode: 'rgb' (default) → "rgb(r,g,b)" or "rgba(r,g,b,a)", 'hex' → "#rrggbb" or "#rrggbbaa"
- alpha: true forces alpha output, false omits, undefined auto (includes if a<1)

**hslaToString(hsla: HSLAColor, options?: { mode?: 'hsl' | 'hex'; alpha?: boolean }): string**
- mode: 'hsl' (default) → "hsl(h,s%,l%)" or "hsla(h,s%,l%,a)", 'hex' converts to RGBA first
- alpha: same as rgbaToString

### Manipulation

All manipulation functions accept generic `T extends RGBAColor | HSLAColor` and return same type T.

**lighten<T>(color: T, amount: number = 0.1): T**
Increase lightness by amount (0-1 scale, default 0.1 = 10%). RGBA converts to HSLA internally.

**darken<T>(color: T, amount: number = 0.1): T**
Decrease lightness by amount. Equivalent to lighten(color, -amount).

**saturate<T>(color: T, amount: number = 0.1): T**
Increase saturation by amount (0-1 scale, default 0.1 = 10%). RGBA converts to HSLA internally.

**desaturate<T>(color: T, amount: number = 0.1): T**
Decrease saturation by amount. Equivalent to saturate(color, -amount).

**fadeIn<T>(color: T, amount: number = 0.1): T**
Increase alpha by amount (0-1 scale, default 0.1).

**fadeOut<T>(color: T, amount: number = 0.1): T**
Decrease alpha by amount. Equivalent to fadeIn(color, -amount).

**invert<T>(color: T): T**
Invert color channels. RGBA: (255-r, 255-g, 255-b). HSLA converts to RGBA internally. Alpha unchanged.

**blend<T>(color1: T, color2: T, ratio: number = 0.5): T**
Linear interpolate between color1 and color2. ratio=0 → color1, ratio=1 → color2. Both colors must be same type. Clamped to [0,1].

### Random color generation

```
type RandomSource = () => number;

type RandomRange = {
  min?: number;
  max?: number;
  mean?: number;
  stddev?: number;
};

type RandomRGBAOptions = {
  r?: RandomRange;
  g?: RandomRange;
  b?: RandomRange;
  a?: RandomRange;
  rng?: RandomSource;
};

type RandomHSLAOptions = {
  h?: RandomRange;
  s?: RandomRange;
  l?: RandomRange;
  a?: RandomRange;
  rng?: RandomSource;
};

type RandomGradientOptions = {
  position?: RandomRange;
  space?: 'rgb' | 'hsl';
  rng?: RandomSource;
};
```

**randomRGBA(options?: RandomRGBAOptions): RGBAColor**
Generate random RGBA color.

**randomHSLA(options?: RandomHSLAOptions): HSLAColor**
Generate random HSLA color.

**randomGradient(colors: (RGBAColor | HSLAColor)[], options?: RandomGradientOptions): RGBAColor | HSLAColor**
Generate random color along a gradient defined by input colors.

## Type Guards

**isRGBAColor(color: any): color is RGBAColor**
Runtime type check for RGBAColor.

**isHSLAColor(color: any): color is HSLAColor**
Runtime type check for HSLAColor.

## Supported Color Names

147 named colors including: red, blue, green, white, black, transparent, aliceblue, antiquewhite, etc. Full CSS3/HTML5 color names.

## Usage Patterns

```typescript
import { RGBAColor, HSLAColor, ColorUtils } from '@basementuniverse/color';

// Direct imports
import { stringToRGBA, lighten, rgbaToString } from '@basementuniverse/color';

// Via ColorUtils object
ColorUtils.stringToRGBA('red');
ColorUtils.lighten(myColor, 0.2);

// All manipulation functions are type-preserving
const rgba: RGBAColor = { r: 255, g: 0, b: 0, a: 1 };
const lightRgba: RGBAColor = lighten(rgba, 0.1); // Returns RGBAColor

const hsla: HSLAColor = { h: 0, s: 100, l: 50, a: 1 };
const lightHsla: HSLAColor = lighten(hsla, 0.1); // Returns HSLAColor
```

## Internal Behavior Notes

- All values auto-clamped to valid ranges
- RGBA manipulation (except fadeIn/Out/blend) converts to HSLA internally
- HSLA invert converts to RGBA internally
- Parsing is case-insensitive, whitespace-tolerant
- Hex parsing accepts 3,4,6,8 digit formats with/without #
- RGB/RGBA parsing accepts both absolute (0-255) and percentage (0%-100%) values
- HSL hue wraps at 360 degrees
- Invalid parses default to black
- Alpha defaults to 1 when undefined
- Rounding: HSLA values rounded to integers, alpha to 2 decimals
