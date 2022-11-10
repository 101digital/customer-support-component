import { StyleProp, ViewStyle } from 'react-native';
import { CustomerParam } from '../../types';

export type CustomerSupportComponentRef = {
  updateCountryCode: (code: string) => void;
};

export type CustomerSupportComponentProps = {
  params: CustomerParam;
  styles?: CustomerSupportComponentStyles;

};

export type CustomerSupportComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
};
