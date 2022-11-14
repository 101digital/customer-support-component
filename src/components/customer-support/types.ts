import { StyleProp, ViewStyle } from 'react-native';

export type CustomerSupportComponentProps = {
  props: {
    onRequestSuccess: () => void;
    userInfo: {
      name?: string,
      phone?: string
    }
  }
  styles?: CustomerSupportComponentStyles;
};

export type CustomerSupportComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
};
