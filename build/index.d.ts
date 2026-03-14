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
declare function toUnit(rgba: RGBAColor): RGBAColor;
declare function toUnit(hsla: HSLAColor): HSLAColor;
declare function fromUnit(rgba: RGBAColor): RGBAColor;
declare function fromUnit(hsla: HSLAColor): HSLAColor;
declare function hslaToRGBA(hsla: HSLAColor): RGBAColor;
declare function rgbaToHSLA(rgba: RGBAColor): HSLAColor;
declare function stringToRGBA(colorString: string): RGBAColor;
declare function stringToHSLA(colorString: string): HSLAColor;
declare function rgbaToString(rgba: RGBAColor, options?: {
    mode?: 'rgb' | 'hex';
    alpha?: boolean;
    convert?: 'fromUnit' | 'toUnit';
}): string;
declare function hslaToString(hsla: HSLAColor, options?: {
    mode?: 'hsl' | 'hex';
    alpha?: boolean;
    convert?: 'fromUnit' | 'toUnit';
}): string;
declare function lighten<T extends RGBAColor | HSLAColor>(color: T, amount?: number): T;
declare function darken<T extends RGBAColor | HSLAColor>(color: T, amount?: number): T;
declare function saturate<T extends RGBAColor | HSLAColor>(color: T, amount?: number): T;
declare function desaturate<T extends RGBAColor | HSLAColor>(color: T, amount?: number): T;
declare function fadeIn<T extends RGBAColor | HSLAColor>(color: T, amount?: number): T;
declare function fadeOut<T extends RGBAColor | HSLAColor>(color: T, amount?: number): T;
declare function invert<T extends RGBAColor | HSLAColor>(color: T): T;
declare function blend<T extends RGBAColor | HSLAColor>(color1: T, color2: T, ratio?: number): T;
export declare const ColorUtils: {
    toUnit: typeof toUnit;
    fromUnit: typeof fromUnit;
    stringToRGBA: typeof stringToRGBA;
    stringToHSLA: typeof stringToHSLA;
    rgbaToHSLA: typeof rgbaToHSLA;
    hslaToRGBA: typeof hslaToRGBA;
    rgbaToString: typeof rgbaToString;
    hslaToString: typeof hslaToString;
    lighten: typeof lighten;
    darken: typeof darken;
    saturate: typeof saturate;
    desaturate: typeof desaturate;
    fadeIn: typeof fadeIn;
    fadeOut: typeof fadeOut;
    invert: typeof invert;
    blend: typeof blend;
};
export {};
