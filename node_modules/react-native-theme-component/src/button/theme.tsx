import { StyleSheet } from 'react-native';
import { ButtonStyles } from '.';
import { ThemeFontProps } from '../fonts';
import { ThemeColorProps } from '../colors';

const defaultButtonTheme = (fonts: ThemeFontProps, colors: ThemeColorProps): ButtonStyles => {
  return StyleSheet.create({
    primaryContainerStyle: {
      height: 42,
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primaryButtonColor,
    },
    secondaryContainerStyle: {
      height: 42,
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.secondaryButtonColor,
    },
    primaryLabelStyle: {
      fontSize: 14,
      color: colors.primaryButtonLabelColor,
      fontFamily: fonts.medium,
    },
    secondaryLabelStyle: {
      fontSize: 14,
      color: colors.secondaryButtonLabelColor,
      fontFamily: fonts.medium,
    },
    loadingWrapperStyle: {
      marginHorizontal: 5,
    },
  });
};

export default defaultButtonTheme;
