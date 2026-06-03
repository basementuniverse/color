// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type RGBAColor = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

export type HSLAColor = {
  h: number;
  s: number;
  l: number;
  a?: number;
};

export type RandomSource = () => number;

export type RandomRange = {
  min?: number;
  max?: number;
  mean?: number;
  stddev?: number;
};

export type RandomRGBAOptions = {
  r?: RandomRange;
  g?: RandomRange;
  b?: RandomRange;
  a?: RandomRange;
  rng?: RandomSource;
};

export type RandomHSLAOptions = {
  h?: RandomRange;
  s?: RandomRange;
  l?: RandomRange;
  a?: RandomRange;
  rng?: RandomSource;
};

export type RandomGradientOptions = {
  position?: RandomRange;
  space?: 'rgb' | 'hsl';
  rng?: RandomSource;
};

// -----------------------------------------------------------------------------
// Type guards
// -----------------------------------------------------------------------------

function isRGBAColor(color: any): color is RGBAColor {
  return (
    color &&
    typeof color === 'object' &&
    typeof color.r === 'number' &&
    typeof color.g === 'number' &&
    typeof color.b === 'number' &&
    (color.a === undefined || typeof color.a === 'number')
  );
}

function isHSLAColor(color: any): color is HSLAColor {
  return (
    color &&
    typeof color === 'object' &&
    typeof color.h === 'number' &&
    typeof color.s === 'number' &&
    typeof color.l === 'number' &&
    (color.a === undefined || typeof color.a === 'number')
  );
}

// -----------------------------------------------------------------------------
// Colour names and corresponding hex values
// -----------------------------------------------------------------------------

const COLOR_NAMES: Record<string, string> = {
  aliceblue: 'f0f8ff',
  antiquewhite: 'faebd7',
  aqua: '0ff',
  aquamarine: '7fffd4',
  azure: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '000',
  blanchedalmond: 'ffebcd',
  blue: '00f',
  blueviolet: '8a2be2',
  brown: 'a52a2a',
  burlywood: 'deb887',
  cadetblue: '5f9ea0',
  chartreuse: '7fff00',
  chocolate: 'd2691e',
  coral: 'ff7f50',
  cornflowerblue: '6495ed',
  cornsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: '0ff',
  darkblue: '00008b',
  darkcyan: '008b8b',
  darkgoldenrod: 'b8860b',
  darkgray: 'a9a9a9',
  darkgreen: '006400',
  darkgrey: 'a9a9a9',
  darkkhaki: 'bdb76b',
  darkmagenta: '8b008b',
  darkolivegreen: '556b2f',
  darkorange: 'ff8c00',
  darkorchid: '9932cc',
  darkred: '8b0000',
  darksalmon: 'e9967a',
  darkseagreen: '8fbc8f',
  darkslateblue: '483d8b',
  darkslategray: '2f4f4f',
  darkslategrey: '2f4f4f',
  darkturquoise: '00ced1',
  darkviolet: '9400d3',
  deeppink: 'ff1493',
  deepskyblue: '00bfff',
  dimgray: '696969',
  dimgrey: '696969',
  dodgerblue: '1e90ff',
  firebrick: 'b22222',
  floralwhite: 'fffaf0',
  forestgreen: '228b22',
  fuchsia: 'f0f',
  gainsboro: 'dcdcdc',
  ghostwhite: 'f8f8ff',
  gold: 'ffd700',
  goldenrod: 'daa520',
  gray: '808080',
  green: '008000',
  greenyellow: 'adff2f',
  grey: '808080',
  honeydew: 'f0fff0',
  hotpink: 'ff69b4',
  indianred: 'cd5c5c',
  indigo: '4b0082',
  ivory: 'fffff0',
  khaki: 'f0e68c',
  lavender: 'e6e6fa',
  lavenderblush: 'fff0f5',
  lawngreen: '7cfc00',
  lemonchiffon: 'fffacd',
  lightblue: 'add8e6',
  lightcoral: 'f08080',
  lightcyan: 'e0ffff',
  lightgoldenrodyellow: 'fafad2',
  lightgray: 'd3d3d3',
  lightgreen: '90ee90',
  lightgrey: 'd3d3d3',
  lightpink: 'ffb6c1',
  lightsalmon: 'ffa07a',
  lightseagreen: '20b2aa',
  lightskyblue: '87cefa',
  lightslategray: '789',
  lightslategrey: '789',
  lightsteelblue: 'b0c4de',
  lightyellow: 'ffffe0',
  lime: '0f0',
  limegreen: '32cd32',
  linen: 'faf0e6',
  magenta: 'f0f',
  maroon: '800000',
  mediumaquamarine: '66cdaa',
  mediumblue: '0000cd',
  mediumorchid: 'ba55d3',
  mediumpurple: '9370db',
  mediumseagreen: '3cb371',
  mediumslateblue: '7b68ee',
  mediumspringgreen: '00fa9a',
  mediumturquoise: '48d1cc',
  mediumvioletred: 'c71585',
  midnightblue: '191970',
  mintcream: 'f5fffa',
  mistyrose: 'ffe4e1',
  moccasin: 'ffe4b5',
  navajowhite: 'ffdead',
  navy: '000080',
  oldlace: 'fdf5e6',
  olive: '808000',
  olivedrab: '6b8e23',
  orange: 'ffa500',
  orangered: 'ff4500',
  orchid: 'da70d6',
  palegoldenrod: 'eee8aa',
  palegreen: '98fb98',
  paleturquoise: 'afeeee',
  palevioletred: 'db7093',
  papayawhip: 'ffefd5',
  peachpuff: 'ffdab9',
  peru: 'cd853f',
  pink: 'ffc0cb',
  plum: 'dda0dd',
  powderblue: 'b0e0e6',
  purple: '800080',
  rebeccapurple: '639',
  red: 'f00',
  rosybrown: 'bc8f8f',
  royalblue: '4169e1',
  saddlebrown: '8b4513',
  salmon: 'fa8072',
  sandybrown: 'f4a460',
  seagreen: '2e8b57',
  seashell: 'fff5ee',
  sienna: 'a0522d',
  silver: 'c0c0c0',
  skyblue: '87ceeb',
  slateblue: '6a5acd',
  slategray: '708090',
  slategrey: '708090',
  snow: 'fffafa',
  springgreen: '00ff7f',
  steelblue: '4682b4',
  tan: 'd2b48c',
  teal: '008080',
  thistle: 'd8bfd8',
  tomato: 'ff6347',
  turquoise: '40e0d0',
  violet: 'ee82ee',
  wheat: 'f5deb3',
  white: 'fff',
  whitesmoke: 'f5f5f5',
  yellow: 'ff0',
  yellowgreen: '9acd32',
  transparent: '00000000',
};

// -----------------------------------------------------------------------------
// Utility functions
// -----------------------------------------------------------------------------

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function round(value: number, decimals: number = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

function randomUnit(rng: RandomSource): number {
  const value = rng();
  return clamp(value, 0, 1);
}

function randomUniform(rng: RandomSource, min: number, max: number): number {
  if (min === max) return min;
  return min + randomUnit(rng) * (max - min);
}

function randomNormal(rng: RandomSource, mean: number, stddev: number): number {
  if (stddev === 0) return mean;

  const u1 = Math.max(randomUnit(rng), Number.EPSILON);
  const u2 = randomUnit(rng);
  const magnitude = Math.sqrt(-2 * Math.log(u1));
  const z0 = magnitude * Math.cos(2 * Math.PI * u2);

  return mean + z0 * stddev;
}

function sampleRandomRange(
  range: RandomRange | undefined,
  minBound: number,
  maxBound: number,
  rng: RandomSource
): number {
  if (!range) {
    return randomUniform(rng, minBound, maxBound);
  }

  const hasMin = range.min !== undefined;
  const hasMax = range.max !== undefined;
  const hasMean = range.mean !== undefined;
  const hasStddev = range.stddev !== undefined;

  if (hasMean || hasStddev) {
    if (!hasMean || !hasStddev) {
      throw new Error(
        'Invalid random range: mean and stddev must both be provided'
      );
    }

    const clampMin = hasMin ? range.min! : minBound;
    const clampMax = hasMax ? range.max! : maxBound;
    return clamp(
      randomNormal(rng, range.mean!, range.stddev!),
      clampMin,
      clampMax
    );
  }

  if (hasMin || hasMax) {
    if (!hasMin || !hasMax) {
      throw new Error(
        'Invalid random range: min and max must both be provided'
      );
    }

    return clamp(
      randomUniform(rng, range.min!, range.max!),
      minBound,
      maxBound
    );
  }

  return randomUniform(rng, minBound, maxBound);
}

function lerp(start: number, end: number, ratio: number): number {
  return start * (1 - ratio) + end * ratio;
}

function interpolateRGBA(
  color1: RGBAColor,
  color2: RGBAColor,
  ratio: number
): RGBAColor {
  return {
    r: Math.round(lerp(color1.r, color2.r, ratio)),
    g: Math.round(lerp(color1.g, color2.g, ratio)),
    b: Math.round(lerp(color1.b, color2.b, ratio)),
    a: round(lerp(color1.a ?? 1, color2.a ?? 1, ratio), 2),
  };
}

function interpolateHSLA(
  color1: HSLAColor,
  color2: HSLAColor,
  ratio: number
): HSLAColor {
  let h1 = color1.h;
  let h2 = color2.h;

  const delta = h2 - h1;
  if (Math.abs(delta) > 180) {
    if (delta > 0) {
      h1 += 360;
    } else {
      h2 += 360;
    }
  }

  const hue = lerp(h1, h2, ratio) % 360;

  return {
    h: hue < 0 ? hue + 360 : hue,
    s: Math.round(lerp(color1.s, color2.s, ratio)),
    l: Math.round(lerp(color1.l, color2.l, ratio)),
    a: round(lerp(color1.a ?? 1, color2.a ?? 1, ratio), 2),
  };
}

function getGradientSpace(
  colors: Array<RGBAColor | HSLAColor>,
  space?: 'rgb' | 'hsl'
): 'rgb' | 'hsl' {
  if (space) return space;
  return isHSLAColor(colors[0]) ? 'hsl' : 'rgb';
}

function toGradientColor(
  color: RGBAColor | HSLAColor,
  space: 'rgb' | 'hsl'
): RGBAColor | HSLAColor {
  return space === 'rgb'
    ? isRGBAColor(color)
      ? color
      : hslaToRGBA(color)
    : isHSLAColor(color)
      ? color
      : rgbaToHSLA(color);
}

function interpolateGradient(
  colors: Array<RGBAColor | HSLAColor>,
  position: number,
  space: 'rgb' | 'hsl'
): RGBAColor | HSLAColor {
  if (colors.length === 1) {
    return toGradientColor(colors[0], space);
  }

  const t = clamp(position, 0, 1);
  const scaled = t * (colors.length - 1);
  const index = Math.min(Math.floor(scaled), colors.length - 2);
  const ratio = scaled - index;
  const first = toGradientColor(colors[index], space);
  const second = toGradientColor(colors[index + 1], space);

  return space === 'rgb'
    ? interpolateRGBA(first as RGBAColor, second as RGBAColor, ratio)
    : interpolateHSLA(first as HSLAColor, second as HSLAColor, ratio);
}

function randomRGBA(options: RandomRGBAOptions = {}): RGBAColor {
  const rng = options.rng ?? Math.random;

  return {
    r: Math.round(sampleRandomRange(options.r, 0, 255, rng)),
    g: Math.round(sampleRandomRange(options.g, 0, 255, rng)),
    b: Math.round(sampleRandomRange(options.b, 0, 255, rng)),
    a: options.a ? round(sampleRandomRange(options.a, 0, 1, rng), 2) : 1,
  };
}

function randomHSLA(options: RandomHSLAOptions = {}): HSLAColor {
  const rng = options.rng ?? Math.random;

  return {
    h: Math.round(sampleRandomRange(options.h, 0, 360, rng)),
    s: Math.round(sampleRandomRange(options.s, 0, 100, rng)),
    l: Math.round(sampleRandomRange(options.l, 0, 100, rng)),
    a: options.a ? round(sampleRandomRange(options.a, 0, 1, rng), 2) : 1,
  };
}

function randomGradient(
  colors: Array<RGBAColor | HSLAColor>,
  options: RandomGradientOptions = {}
): RGBAColor | HSLAColor {
  if (colors.length === 0) {
    throw new Error('At least one seed color is required');
  }

  const rng = options.rng ?? Math.random;
  const space = getGradientSpace(colors, options.space);
  const position = sampleRandomRange(options.position, 0, 1, rng);

  return interpolateGradient(colors, position, space);
}

// -----------------------------------------------------------------------------
// Conversion functions
// -----------------------------------------------------------------------------

function toUnit(rgba: RGBAColor): RGBAColor;
function toUnit(hsla: HSLAColor): HSLAColor;
function toUnit(c: RGBAColor | HSLAColor): RGBAColor | HSLAColor {
  if (isRGBAColor(c)) {
    return {
      r: clamp(c.r / 255, 0, 1),
      g: clamp(c.g / 255, 0, 1),
      b: clamp(c.b / 255, 0, 1),
      a: c.a !== undefined ? clamp(c.a, 0, 1) : 1,
    };
  }

  if (isHSLAColor(c)) {
    return {
      h: clamp(c.h / 360, 0, 1),
      s: clamp(c.s / 100, 0, 1),
      l: clamp(c.l / 100, 0, 1),
      a: c.a !== undefined ? clamp(c.a, 0, 1) : 1,
    };
  }

  throw new Error('Invalid color object');
}

function fromUnit(rgba: RGBAColor): RGBAColor;
function fromUnit(hsla: HSLAColor): HSLAColor;
function fromUnit(c: RGBAColor | HSLAColor): RGBAColor | HSLAColor {
  if (isRGBAColor(c)) {
    return {
      r: clamp(Math.round(c.r * 255), 0, 255),
      g: clamp(Math.round(c.g * 255), 0, 255),
      b: clamp(Math.round(c.b * 255), 0, 255),
      a: c.a !== undefined ? clamp(c.a, 0, 1) : 1,
    };
  }

  if (isHSLAColor(c)) {
    return {
      h: clamp(Math.round(c.h * 360), 0, 360),
      s: clamp(Math.round(c.s * 100), 0, 100),
      l: clamp(Math.round(c.l * 100), 0, 100),
      a: c.a !== undefined ? clamp(c.a, 0, 1) : 1,
    };
  }

  throw new Error('Invalid color object');
}

function hslaToRGBA(hsla: HSLAColor): RGBAColor {
  const h = hsla.h / 360;
  const s = hsla.s / 100;
  const l = hsla.l / 100;
  const a = hsla.a !== undefined ? hsla.a : 1;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a,
  };
}

function rgbaToHSLA(rgba: RGBAColor): HSLAColor {
  const r = rgba.r / 255;
  const g = rgba.g / 255;
  const b = rgba.b / 255;
  const a = rgba.a !== undefined ? rgba.a : 1;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number, s: number;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a,
  };
}

function parseHex(hex: string): RGBAColor | null {
  // Remove # if present
  hex = hex.replace('#', '');

  // Handle 3-digit hex
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(char => char + char)
      .join('');
  }

  // Handle 4-digit hex (with alpha)
  if (hex.length === 4) {
    hex = hex
      .split('')
      .map(char => char + char)
      .join('');
  }

  // Parse 6-digit or 8-digit hex
  if (hex.length === 6) {
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);
    if (Number.isNaN(r)) r = 0;
    if (Number.isNaN(g)) g = 0;
    if (Number.isNaN(b)) b = 0;
    return { r, g, b, a: 1 };
  }

  if (hex.length === 8) {
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);
    let a = parseInt(hex.slice(6, 8), 16) / 255;
    if (Number.isNaN(r)) r = 0;
    if (Number.isNaN(g)) g = 0;
    if (Number.isNaN(b)) b = 0;
    if (Number.isNaN(a)) a = 0;
    return { r, g, b, a: round(a, 2) };
  }

  return null;
}

function parseRgb(str: string): RGBAColor | null {
  // Match rgb(r, g, b) or rgba(r, g, b, a)
  const rgbMatch = str.match(
    /rgba?\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,)]+)(?:\s*,\s*([^)]+))?\s*\)/
  );

  if (!rgbMatch) return null;

  const parseValue = (value: string, isAlpha: boolean = false): number => {
    value = value.trim();
    if (value.endsWith('%')) {
      const percent = parseFloat(value.slice(0, -1));
      return isAlpha ? percent / 100 : (percent / 100) * 255;
    }
    return parseFloat(value);
  };

  const r = clamp(Math.round(parseValue(rgbMatch[1])), 0, 255);
  const g = clamp(Math.round(parseValue(rgbMatch[2])), 0, 255);
  const b = clamp(Math.round(parseValue(rgbMatch[3])), 0, 255);
  const a = rgbMatch[4] ? clamp(parseValue(rgbMatch[4], true), 0, 1) : 1;

  return { r, g, b, a: round(a, 2) };
}

function parseHsl(str: string): RGBAColor | null {
  // Match hsl(h, s%, l%) or hsla(h, s%, l%, a)
  const hslMatch = str.match(
    /hsla?\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,)]+)(?:\s*,\s*([^)]+))?\s*\)/
  );

  if (!hslMatch) return null;

  const h = parseFloat(hslMatch[1].trim()) % 360;
  const s = parseFloat(hslMatch[2].trim().replace('%', ''));
  const l = parseFloat(hslMatch[3].trim().replace('%', ''));
  const a = hslMatch[4] ? clamp(parseFloat(hslMatch[4].trim()), 0, 1) : 1;

  const hsla: HSLAColor = { h, s, l, a: round(a, 2) };
  return hslaToRGBA(hsla);
}

function stringToRGBA(colorString: string): RGBAColor {
  const str = colorString.trim().toLowerCase();

  // Check if it's a named color
  if (COLOR_NAMES[str]) {
    const hex = COLOR_NAMES[str];
    const parsed = parseHex(hex);
    if (parsed) return parsed;
  }

  // Try to parse as hex
  if (str.startsWith('#')) {
    const hex = parseHex(str);
    if (hex) return hex;
  }

  // Try to parse as rgb/rgba
  if (str.startsWith('rgb')) {
    const rgb = parseRgb(str);
    if (rgb) return rgb;
  }

  // Try to parse as hsl/hsla
  if (str.startsWith('hsl')) {
    const hsl = parseHsl(str);
    if (hsl) return hsl;
  }

  // Try to parse as hex without # (fallback for hex strings without prefix)
  const hex = parseHex(str);
  if (hex) return hex;

  // Default to black if parsing fails
  return { r: 0, g: 0, b: 0, a: 1 };
}

function stringToHSLA(colorString: string): HSLAColor {
  const rgba = stringToRGBA(colorString);
  return rgbaToHSLA(rgba);
}

function rgbaToString(
  rgba: RGBAColor,
  options?: {
    mode?: 'rgb' | 'hex';
    alpha?: boolean;
    convert?: 'fromUnit' | 'toUnit';
  }
): string {
  const { mode = 'rgb', alpha, convert } = options || {};
  const a = rgba.a !== undefined ? rgba.a : 1;

  if (convert === 'fromUnit') {
    rgba = ColorUtils.fromUnit(rgba);
  } else if (convert === 'toUnit') {
    rgba = ColorUtils.toUnit(rgba);
  }

  if (mode === 'hex') {
    const toHex = (n: number): string =>
      Math.round(n).toString(16).padStart(2, '0');
    const hex = `#${toHex(rgba.r)}${toHex(rgba.g)}${toHex(rgba.b)}`;

    if (alpha === true || (alpha === undefined && a < 1)) {
      return hex + toHex(a * 255);
    }
    return hex;
  }

  // RGB mode
  if (alpha === true || (alpha === undefined && a < 1)) {
    return `rgba(${Math.round(rgba.r)}, ${Math.round(rgba.g)}, ${Math.round(
      rgba.b
    )}, ${a})`;
  }
  return `rgb(${Math.round(rgba.r)}, ${Math.round(rgba.g)}, ${Math.round(
    rgba.b
  )})`;
}

function hslaToString(
  hsla: HSLAColor,
  options?: {
    mode?: 'hsl' | 'hex';
    alpha?: boolean;
    convert?: 'fromUnit' | 'toUnit';
  }
): string {
  const { mode = 'hsl', alpha, convert } = options || {};
  const a = hsla.a !== undefined ? hsla.a : 1;

  if (convert === 'fromUnit') {
    hsla = ColorUtils.fromUnit(hsla);
  } else if (convert === 'toUnit') {
    hsla = ColorUtils.toUnit(hsla);
  }

  if (mode === 'hex') {
    // Convert to RGBA first, then to hex
    const rgba = hslaToRGBA(hsla);
    return rgbaToString(rgba, { mode: 'hex', alpha });
  }

  // HSL mode
  if (alpha === true || (alpha === undefined && a < 1)) {
    return `hsla(${Math.round(hsla.h)}, ${Math.round(hsla.s)}%, ${Math.round(
      hsla.l
    )}%, ${a})`;
  }
  return `hsl(${Math.round(hsla.h)}, ${Math.round(hsla.s)}%, ${Math.round(
    hsla.l
  )}%)`;
}

// -----------------------------------------------------------------------------
// Color manipulation functions
// -----------------------------------------------------------------------------

function lighten<T extends RGBAColor | HSLAColor>(
  color: T,
  amount: number = 0.1
): T {
  if (isHSLAColor(color)) {
    // HSLAColor
    const hsla = color as HSLAColor;
    return {
      ...hsla,
      l: clamp(hsla.l + amount * 100, 0, 100),
    } as T;
  }

  if (isRGBAColor(color)) {
    // RGBAColor - convert to HSLA, lighten, convert back
    const rgba = color as RGBAColor;
    const hsla = rgbaToHSLA(rgba);
    const lightened = lighten(hsla, amount);
    return hslaToRGBA(lightened) as T;
  }

  return color;
}

function darken<T extends RGBAColor | HSLAColor>(
  color: T,
  amount: number = 0.1
): T {
  return lighten(color, -amount);
}

function saturate<T extends RGBAColor | HSLAColor>(
  color: T,
  amount: number = 0.1
): T {
  if (isHSLAColor(color)) {
    // HSLAColor
    const hsla = color as HSLAColor;
    return {
      ...hsla,
      s: clamp(hsla.s + amount * 100, 0, 100),
    } as T;
  }

  if (isRGBAColor(color)) {
    // RGBAColor - convert to HSLA, saturate, convert back
    const rgba = color as RGBAColor;
    const hsla = rgbaToHSLA(rgba);
    const saturated = saturate(hsla, amount);
    return hslaToRGBA(saturated) as T;
  }

  return color;
}

function desaturate<T extends RGBAColor | HSLAColor>(
  color: T,
  amount: number = 0.1
): T {
  return saturate(color, -amount);
}

function fadeIn<T extends RGBAColor | HSLAColor>(
  color: T,
  amount: number = 0.1
): T {
  const currentAlpha = color.a !== undefined ? color.a : 1;
  return {
    ...color,
    a: clamp(currentAlpha + amount, 0, 1),
  };
}

function fadeOut<T extends RGBAColor | HSLAColor>(
  color: T,
  amount: number = 0.1
): T {
  return fadeIn(color, -amount);
}

function invert<T extends RGBAColor | HSLAColor>(color: T): T {
  if (isHSLAColor(color)) {
    // HSLAColor - convert to RGBA, invert, convert back
    const hsla = color as HSLAColor;
    const rgba = hslaToRGBA(hsla);
    const inverted = invert(rgba);
    return rgbaToHSLA(inverted) as T;
  }

  if (isRGBAColor(color)) {
    // RGBAColor
    const rgba = color as RGBAColor;
    return {
      ...rgba,
      r: 255 - rgba.r,
      g: 255 - rgba.g,
      b: 255 - rgba.b,
    } as T;
  }

  return color;
}

function blend<T extends RGBAColor | HSLAColor>(
  color1: T,
  color2: T,
  ratio: number = 0.5
): T {
  const r = clamp(ratio, 0, 1);
  const invR = 1 - r;

  if (isHSLAColor(color1) && isHSLAColor(color2)) {
    // Both HSLAColor
    const hsla1 = color1 as HSLAColor;
    const hsla2 = color2 as HSLAColor;
    return {
      h: Math.round(hsla1.h * invR + hsla2.h * r),
      s: Math.round(hsla1.s * invR + hsla2.s * r),
      l: Math.round(hsla1.l * invR + hsla2.l * r),
      a: round((hsla1.a ?? 1) * invR + (hsla2.a ?? 1) * r, 2),
    } as T;
  }

  if (isRGBAColor(color1) && isRGBAColor(color2)) {
    // Both RGBAColor
    const rgba1 = color1 as RGBAColor;
    const rgba2 = color2 as RGBAColor;
    return {
      r: Math.round(rgba1.r * invR + rgba2.r * r),
      g: Math.round(rgba1.g * invR + rgba2.g * r),
      b: Math.round(rgba1.b * invR + rgba2.b * r),
      a: round((rgba1.a ?? 1) * invR + (rgba2.a ?? 1) * r, 2),
    } as T;
  }

  // If types don't match, return the first color
  return color1;
}

export const ColorUtils = {
  // Convert to and from [0, 1] range and [0, 255] / [0, 360] ranges
  toUnit,
  fromUnit,

  // Random color generation
  randomRGBA,
  randomHSLA,
  randomGradient,

  // String parsing functions
  stringToRGBA,
  stringToHSLA,

  // Color conversion functions
  rgbaToHSLA,
  hslaToRGBA,

  // Color-to-string functions
  rgbaToString,
  hslaToString,

  // Color manipulation functions
  lighten,
  darken,
  saturate,
  desaturate,
  fadeIn,
  fadeOut,
  invert,
  blend,
};
