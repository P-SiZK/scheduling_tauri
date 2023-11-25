import rgba from 'color-rgba';

export function getLuminance(color: string) {
  const rgb = (rgba(color) as number[]).slice(0, 3).map((_v) => {
    const v = _v / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

// ref: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
export function getContrastRatio(fgColor: string, bgColor: string) {
  const fgLuminance = getLuminance(fgColor);
  const bgLuminance = getLuminance(bgColor);
  const lighterLuminance = Math.max(fgLuminance, bgLuminance);
  const darkerLuminance = Math.min(fgLuminance, bgLuminance);
  return (lighterLuminance + 0.05) / (darkerLuminance + 0.05);
}

export function getContrastText(color: string) {
  return getContrastRatio(color, '#fff') > 4.5
    ? 'text-white'
    : 'text-black';
}
