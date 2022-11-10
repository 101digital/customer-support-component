import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { SelectCategoryModalStyles } from './index';

const useMergeStyles = (style?: SelectCategoryModalStyles): SelectCategoryModalStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: SelectCategoryModalStyles = StyleSheet.create({
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
