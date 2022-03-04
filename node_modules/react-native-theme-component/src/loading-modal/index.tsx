import React, { useContext } from 'react';
import { ActivityIndicator, Dimensions, Platform, StyleProp, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { ThemeContext } from '../theme-context';
import { defaultsDeep } from 'lodash';

const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT');

interface ComponentProps {
  shouldShow?: boolean;
  indicatorColor?: string;
  backgropOpacity?: number;
  style?: LoadingModalStyles;
}

export type LoadingModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export type LoadingModalProps = ComponentProps;

const LoadingModal = (props: LoadingModalProps) => {
  const { shouldShow, indicatorColor, backgropOpacity, style } = props;
  const { loadingModal } = useContext(ThemeContext);
  const styles: LoadingModalStyles = defaultsDeep(style, loadingModal);

  return (
    <Modal
      isVisible={shouldShow}
      deviceHeight={deviceHeight}
      backdropTransitionInTiming={50}
      backdropTransitionOutTiming={50}
      hideModalContentWhileAnimating
      useNativeDriverForBackdrop
      useNativeDriver
      backdropOpacity={backgropOpacity}
      statusBarTranslucent
      animationIn='fadeIn'
      animationOut='fadeOut'
    >
      <View style={styles.containerStyle}>
        <View style={styles.contentContainerStyle}>
          <ActivityIndicator color={indicatorColor} size='large' />
        </View>
      </View>
    </Modal>
  );
};

LoadingModal.defaultProps = {
  shouldShow: false,
  backgropOpacity: 0.3,
};

export default LoadingModal;
