import { StyleSheet } from 'react-native';
import { ErrorModalStyles } from '.';
import { ThemeFontProps } from '../fonts';

const defaultErrorModalTheme = (fonts: ThemeFontProps): ErrorModalStyles => {
  return StyleSheet.create({
    errorIdTextStyle: {
      fontSize: 13,
      fontFamily: fonts.regular,
      color: 'grey',
      marginTop: 10,
    },
  });
};

export default defaultErrorModalTheme;
