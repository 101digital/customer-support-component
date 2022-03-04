import { StyleSheet } from 'react-native';
import { BottomSheetModalStyles } from '.';

const defaultBottomSheetTheme: BottomSheetModalStyles = StyleSheet.create({
  modalStyle: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  containerStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    justifyContent: 'center',
  },
});

export default defaultBottomSheetTheme;
