import { StyleProp, ViewStyle } from 'react-native';
import { CustomerParam } from '../../types';

export type CustomerSupportComponentProps = {
  params: CustomerParam;
  styles?: CustomerSupportComponentStyles;
};

export type CustomerSupportComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
};
