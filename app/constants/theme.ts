/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const primaryGreenLight = '#1B7F4A';
const primaryGreenDark = '#7AD9A0';
const secondaryTealLight = '#1F8A70';
const secondaryTealDark = '#63D2D6';
const backgroundLight = '#F5F7F2';
const backgroundDark = '#0D1510';
const cardLight = '#FFFFFF';
const cardDark = '#151F18';
const subtleBorderLight = '#D7E2D3';
const subtleBorderDark = '#243326';

export const Colors = {
  light: {
    text: '#102116',
    background: backgroundLight,
    card: cardLight,
    border: subtleBorderLight,
    tint: primaryGreenLight,
    icon: '#5B6C5E',
    tabIconDefault: '#7A8A7D',
    tabIconSelected: primaryGreenLight,
    success: primaryGreenLight,
    warning: '#E9A100',
    danger: '#C73535',
    info: secondaryTealLight,
    muted: '#9BA9A0',
  },
  dark: {
    text: '#F2F7F3',
    background: backgroundDark,
    card: cardDark,
    border: subtleBorderDark,
    tint: primaryGreenDark,
    icon: '#A7BAAA',
    tabIconDefault: '#7D9180',
    tabIconSelected: primaryGreenDark,
    success: primaryGreenDark,
    warning: '#F4C452',
    danger: '#FF7A7A',
    info: secondaryTealDark,
    muted: '#9BA9A0',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
