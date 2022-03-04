import { StyleSheet } from 'react-native';
import { CheckBoxStyles } from '.';
import { ThemeFontProps } from '../fonts';
import { ThemeColorProps } from '../colors';

const defaultCheckBoxTheme = (fonts: ThemeFontProps, colors: ThemeColorProps): CheckBoxStyles => {
  return StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    selectedBoxStyle: {
      width: 20,
      height: 20,
      borderRadius: 4,
      backgroundColor: colors.primaryColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    unSelectedBoxStyle: {
      width: 20,
      height: 20,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.primaryColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleStyle: {
      flex: 1,
      fontFamily: fonts.regular,
      fontSize: 12,
      color: '#000000',
      marginLeft: 12,
    },
  });
};

export default defaultCheckBoxTheme;
