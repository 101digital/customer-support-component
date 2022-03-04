import { StyleSheet } from 'react-native';
import { ImagePickerStyles } from '.';
import { ThemeFontProps } from '../fonts';

const defaultImagePickerTheme = (fonts: ThemeFontProps): ImagePickerStyles => {
  return StyleSheet.create({
    buttonContainerStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingVertical: 10,
      alignItems: 'center',
    },
    buttonTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 14,
      textAlign: 'left',
      color: 'black',
      lineHeight: 17,
      marginLeft: 15,
    },
    cancelButtonContainerStyle: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
    },
    cancelTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
      textAlign: 'center',
      color: 'red',
      lineHeight: 17,
    },
  });
};

export default defaultImagePickerTheme;
