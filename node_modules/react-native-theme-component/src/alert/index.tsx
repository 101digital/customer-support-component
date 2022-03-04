import { defaultsDeep, isEmpty } from 'lodash';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import { CloseIcon } from '../assets/close.icon';
import { InformationIcon } from '../assets/information.icon';
import Button, { ButtonStyles } from '../button';
import { ThemeContext } from '../theme-context';

const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT');

export type AlertModalStyles = {
  modalStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  bodyStyle?: StyleProp<ViewStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  footerStyle?: StyleProp<ViewStyle>;
  leftIconStyle?: StyleProp<ViewStyle>;
  closeButtonStyle?: StyleProp<ViewStyle>;
  cancelButtonStyle?: ButtonStyles;
  confirmButtonStyle?: ButtonStyles;
};

export type AlertModalProps = {
  title: string;
  message?: string;
  isVisible?: boolean;
  horizontalSpace?: number;
  children?: ReactNode;
  leftIcon?: ReactNode;
  closeIcon?: ReactNode;
  confirmTitle?: string;
  cancelTitle?: string;
  isFullWidth?: boolean;
  isShowClose?: boolean;
  backdropOpacity?: number;
  timeOut?: boolean;
  timeLimit?: number;
  style?: AlertModalStyles;
  animationIn?: 'fadeIn' | 'slideInUp' | 'zoomIn' | 'slideInRight';
  animationOut?: 'fadeOut' | 'slideOutDown' | 'zoomOut' | 'slideOutRight';
  animationInTiming?: number;
  animationOutTiming?: number;
  onConfirmed?: () => void;
  onCancel?: () => void;
  onClose: () => void;
  onBackButtonPress?: () => void;
  onBackdropPress?: () => void;
  onModalHide?: () => void;
  avoidKeyboard?: boolean;
  isShowLeftIcon?: boolean;
};

const AlertModal = (props: AlertModalProps) => {
  const {
    title,
    children,
    onConfirmed,
    onCancel,
    message,
    onClose,
    cancelTitle,
    confirmTitle,
    leftIcon,
    backdropOpacity,
    horizontalSpace,
    style,
    isShowClose,
    isFullWidth,
    isVisible,
    timeLimit,
    timeOut,
    closeIcon,
    isShowLeftIcon,
    ...restProps
  } = props;
  const { alert, colors, i18n } = useContext(ThemeContext);
  const [_isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      if (timeOut) {
        setTimeout(() => {
          setIsVisible(true);
        }, timeLimit ?? 100);
      } else {
        setIsVisible(true);
      }
    } else {
      setIsVisible(false);
    }
  }, [isVisible]);

  const styles = defaultsDeep(style, alert);

  const innerStyles = StyleSheet.create({
    spacer: {
      width: horizontalSpace,
    },
    button: {
      flex: 1,
    },
  });
  const _leftIcon = leftIcon ?? (
    <InformationIcon width={20} height={20} color={colors.primaryColor} />
  );

  return (
    <Modal
      isVisible={_isVisible}
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
        <View style={styles.headerStyle}>
          {_leftIcon && (
            <View style={[styles.leftIconStyle, { paddingLeft: horizontalSpace }]}>
              {isShowLeftIcon && _leftIcon}
            </View>
          )}
          <Text style={styles.titleTextStyle}>{title}</Text>
          {isShowClose && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.closeButtonStyle, { paddingHorizontal: horizontalSpace }]}
              onPress={onClose}
            >
              {closeIcon ?? <CloseIcon width={15} height={15} />}
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.bodyStyle, { paddingHorizontal: horizontalSpace }]}>
          {!isEmpty(message) && <Text style={styles.messageTextStyle}>{message}</Text>}
          {children}
        </View>
        <View style={[styles.footerStyle, { marginHorizontal: horizontalSpace }]}>
          {cancelTitle ? (
            <Button
              style={
                style?.cancelButtonStyle ?? {
                  secondaryContainerStyle: {
                    flex: 1,
                  },
                }
              }
              variant='secondary'
              label={cancelTitle}
              onPress={onCancel}
            />
          ) : (
            <View style={!isFullWidth ? innerStyles.button : {}} />
          )}
          {!isFullWidth && <View style={innerStyles.spacer} />}

          <Button
            style={
              style?.confirmButtonStyle ?? {
                primaryContainerStyle: {
                  flex: 1,
                },
              }
            }
            label={confirmTitle ?? i18n?.t('common.btn_confirm') ?? 'OK'}
            onPress={onConfirmed}
          />
        </View>
      </View>
    </Modal>
  );
};

AlertModal.defaultProps = {
  isVisible: false,
  horizontalSpace: 20,
  backdropOpacity: 0.5,
  animationIn: 'fadeIn',
  animationOut: 'fadeOut',
  isShowClose: true,
  isFullWidth: false,
  isShowLeftIcon: true,
};

export default React.memo(AlertModal);
