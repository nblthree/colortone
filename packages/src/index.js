const hexToRgb = hex => {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ]
    : null;
};

const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const validateArgs = (color, ratio) => {
  if (typeof color === "string") {
    if (!hexToRgb(color)) {
      throw new Error(`The passed value isn't a valid hex string`);
    }
  } else if (Array.isArray(color)) {
    const [r, b, g] = color;

    if (color.length !== 3) {
      throw new Error(`The passed array should contains 3 values [r, g, b]`);
    }

    if (
      !Number.isInteger(r) ||
      !Number.isInteger(g) ||
      !Number.isInteger(b) ||
      r < 0 ||
      r > 255 ||
      g < 0 ||
      g > 255 ||
      b < 0 ||
      b > 255
    ) {
      throw new Error(`The passed RGB value isn't a valid one`);
    }
  } else if (typeof color === "object") {
    const { r, g, b } = color;

    if (
      typeof r === "undefined" ||
      typeof g === "undefined" ||
      typeof b === "undefined"
    ) {
      throw new Error(`The passed object isn't a valid one`);
    }

    if (
      !Number.isInteger(r) ||
      !Number.isInteger(g) ||
      !Number.isInteger(b) ||
      r < 0 ||
      r > 255 ||
      g < 0 ||
      g > 255 ||
      b < 0 ||
      b > 255
    ) {
      throw new Error(`The passed RGB value isn't a valid one`);
    }
  } else {
    throw new Error(`Invalid arguments`);
  }

  if (typeof ratio !== "number" || ratio < 0 || ratio > 1) {
    throw new Error(`The ratio value isn't a valid one`);
  }
};

export const darken = (color, ratio) => {
  validateArgs(color, ratio);

  const rgb = [];
  if (typeof color === "string") {
    rgb.push(...hexToRgb(color));
  } else if (Array.isArray(color)) {
    rgb.push(...color);
  } else if (typeof color === "object") {
    const { r, g, b } = color;
    rgb.push(r, g, b);
  }

  for (let i = 0; i < rgb.length; i++) {
    rgb[i] = Math.round(rgb[i] - ratio * rgb[i]);
  }

  return rgbToHex(...rgb);
};

export const lighten = (color, ratio) => {
  validateArgs(color, ratio);

  const rgb = [];
  if (typeof color === "string") {
    rgb.push(...hexToRgb(color));
  } else if (Array.isArray(color)) {
    rgb.push(...color);
  } else if (typeof color === "object") {
    const { r, g, b } = color;
    rgb.push(r, g, b);
  }

  for (let i = 0; i < rgb.length; i++) {
    rgb[i] = Math.round(rgb[i] + ratio * (255 - rgb[i]));
  }

  return rgbToHex(...rgb);
};

const colortone = { darken, lighten };

export default colortone;
