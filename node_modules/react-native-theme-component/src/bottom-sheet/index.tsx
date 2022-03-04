import { defaultsDeep } from 'lodash';
import React, { ReactNode, useContext } from 'react';
import { Dimensions, Platform, SafeAreaView, StyleProp, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { ThemeContext } from '../theme-context';

const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT');

export type BottomSheetModalStyles = {
  modalStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export type BottomSheetModalProps = {
  isVisible?: boolean;
  children: ReactNode;
  backdropOpacity?: number;
  style?: BottomSheetModalStyles;
  animationIn?: 'fadeIn' | 'slideInUp' | 'zoomIn' | 'slideInRight';
  animationOut?: 'fadeOut' | 'slideOutDown' | 'zoomOut' | 'slideOutRight';
  animationInTiming?: number;
  animationOutTiming?: number;
  avoidKeyboard?: boolean;
  onBackButtonPress?: () => void;
  onBackdropPress?: () => void;
  onModalHide?: () => void;
};

const BottomSheetModal = (props: BottomSheetModalProps) => {
  const { children, backdropOpacity, style, ...restProps } = props;
  const { bottomSheet } = useContext(ThemeContext);

  const styles = defaultsDeep(style, bottomSheet);

  return (
    <Modal
      deviceHeight={deviceHeight}
      backdropTransitionInTiming={50}
      backdropTransitionOutTiming={50}
      hideModalContentWhileAnimating
      useNativeDriverForBackdrop
      useNativeDriver
      backdropOpacity={backdropOpacity}
      statusBarTranslucent
      style={styles.modalStyle}
      {...restProps}
    >
      <View style={styles.containerStyle}>
        <SafeAreaView style={styles.contentContainerStyle}>{children}</SafeAreaView>
      </View>
    </Modal>
  );
};

BottomSheetModal.defaultProps = {
  isVisible: false,
  backdropOpacity: 0.5,
  animationIn: 'slideInUp',
  animationOut: 'slideOutDown',
};

export default BottomSheetModal;
