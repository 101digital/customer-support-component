import { StyleSheet } from 'react-native';
import { AlertModalStyles } from '.';
import { ThemeFontProps } from '../fonts';
import { ThemeColorProps } from '../colors';

const defaultAlertTheme = (fonts: ThemeFontProps, _: ThemeColorProps): AlertModalStyles => {
  return StyleSheet.create({
    modalStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      width: '100%',
    },
    containerStyle: {
      width: '85%',
      borderRadius: 10,
      backgroundColor: 'white',
    },
    headerStyle: {
      marginTop: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    bodyStyle: {},
    footerStyle: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginVertical: 20,
    },
    titleTextStyle: {
      fontSize: 16,
      flex: 1,
      paddingVertical: 15,
      color: 'black',
      paddingLeft: 8,
      fontFamily: fonts.medium,
    },
    leftIconStyle: {
      paddingVertical: 20,
    },
    closeButtonStyle: {
      paddingVertical: 15,
    },
    messageTextStyle: {
      fontSize: 15,
      color: 'black',
      fontFamily: fonts.regular,
    },
  });
};
export default defaultAlertTheme;
