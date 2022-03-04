import { ThemeFontProps } from '../fonts';
import { Platform, StyleSheet } from 'react-native';
import { InputPhoneNumberStyles } from '.';
import { ThemeColorProps } from '../colors';

const defaultInputPhoneNumberTheme = (
  fonts: ThemeFontProps,
  _: ThemeColorProps
): InputPhoneNumberStyles => {
  return StyleSheet.create({
    contentContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
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
    },
    errorTextStyle: {
      fontSize: 12,
      color: 'red',
      marginTop: Platform.OS === 'ios' ? 5 : 10,
      fontFamily: fonts.regular,
    },
    dialContainerStyle: {
      marginLeft: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 5,
      padding: 0,
    },
    dialTextStyle: {
      fontSize: 16,
      color: 'black',
      marginRight: 5,
      fontFamily: fonts.regular,
    },
  });
};

export default defaultInputPhoneNumberTheme;
