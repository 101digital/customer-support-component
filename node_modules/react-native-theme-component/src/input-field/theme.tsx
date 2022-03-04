import { ThemeFontProps } from '../fonts';
import { Platform, StyleSheet } from 'react-native';
import { InputFieldStyles } from '.';
import { ThemeColorProps } from '../colors';

const defaultInputFieldTheme = (fonts: ThemeFontProps, _: ThemeColorProps): InputFieldStyles => {
  return StyleSheet.create({
    contentContainerStyle: {
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomWidth: 2,
    },
    inputContainerStyle: {
      flex: 1,
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textInputStyle: {
      flex: 1,
      marginHorizontal: 10,
      fontSize: 16,
      color: 'black',
      fontFamily: fonts.regular,
      paddingBottom: 0,
      paddingTop: 0,
    },
    errorTextStyle: {
      fontSize: 12,
      color: 'red',
      marginTop: Platform.OS === 'ios' ? 5 : 10,
      fontFamily: fonts.regular,
    },
  });
};
export default defaultInputFieldTheme;
