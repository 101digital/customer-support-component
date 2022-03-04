import { CustomerSupportComponentStyles } from './types';
import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';

const useMergeStyles = (
  styles?: CustomerSupportComponentStyles
): CustomerSupportComponentStyles => {
  const defaultStyle: CustomerSupportComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
  });

  return defaultsDeep(styles, defaultStyle);
};

export default useMergeStyles;
