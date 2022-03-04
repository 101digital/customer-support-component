import { defaultFont } from '../fonts';
import { defaultsDeep } from 'lodash';
import React, { ReactNode, useContext } from 'react';
import {
  defaultTheme,
  ThemeContext,
  ThemeContextData,
  ThemeProps,
  useThemeContextValue,
} from './context';
import { defaultColors } from '../colors';
import FlashMessage from 'react-native-flash-message';

export type BankingProviderProps = {
  children: ReactNode;
  theme: ThemeProps;
  i18n?: any;
};

export const createThemeData = (theme: ThemeProps): ThemeContextData => {
  const _fonts = defaultsDeep(theme.fonts, defaultFont);
  const _colors = defaultsDeep(theme.colors, defaultColors);
  return defaultsDeep(theme, defaultTheme(_fonts, _colors));
};

export const ThemeProvider = (props: BankingProviderProps) => {
  const { children, theme, i18n } = props;
  const themeContextData = useThemeContextValue(theme, i18n);

  return (
    <ThemeContext.Provider value={themeContextData}>
      {children}
      <FlashMessage position="top" />
    </ThemeContext.Provider>
  );
};

export const useThemeColors = () => useContext(ThemeContext).colors;
export const useThemeFonts = () => useContext(ThemeContext).fonts;
