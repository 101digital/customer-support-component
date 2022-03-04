import { StyleSheet } from 'react-native';
import { LoadingModalStyles } from './index';

const defaultLoadingModalStyles = (): LoadingModalStyles => {
  return StyleSheet.create({
    containerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainerStyle: {
      height: 75,
      width: 75,
      backgroundColor: 'white',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

export default defaultLoadingModalStyles;
