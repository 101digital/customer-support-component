import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { SelectSubjectModalStyles } from './index';

const useMergeStyles = (style?: SelectSubjectModalStyles): SelectSubjectModalStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: SelectSubjectModalStyles = StyleSheet.create({
    containerStyle: {
      paddingHorizontal: 25,
    },
    modalTitleStyle: {
      fontFamily: fonts.bold,
      fontSize: 16,
      lineHeight: 27,
      color: colors.primaryTextColor,
      marginVertical: 20
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
