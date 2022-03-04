import React, { useContext } from 'react';
import { Alert, StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import Picker from 'react-native-image-crop-picker';
// @ts-ignore
import * as mime from 'react-native-mime-types';
import { openSettings } from 'react-native-permissions';
import BottomSheetModal from '../bottom-sheet';
import { ThemeContext } from '../theme-context';
import { GalleryIcon, CameraIcon } from '../assets';
import { defaultsDeep } from 'lodash';
import { showMessage } from 'react-native-flash-message';

export type ImagePickerStyles = {
  buttonContainerStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  cancelTextStyle?: StyleProp<TextStyle>;
  cancelButtonContainerStyle?: StyleProp<ViewStyle>;
};

export type ImagePickerProps = {
  isVisible?: boolean;
  maxImageSize?: number;
  allowTypes?: string[];
  cropping?: boolean;
  cropperCircleOverlay?: boolean;
  useFrontCamera?: boolean;
  onClose: () => void;
  onUpload: (image: any) => void;
  style?: ImagePickerStyles;
};

const ImagePicker = (props: ImagePickerProps) => {
  const { i18n, imagePicker } = useContext(ThemeContext);
  const {
    maxImageSize,
    allowTypes,
    cropping,
    cropperCircleOverlay,
    useFrontCamera,
    onClose,
    onUpload,
    isVisible,
    style,
  } = props;

  const styles: ImagePickerStyles = defaultsDeep(style, imagePicker);

  const launchCamera = () => {
    Picker.openCamera({
      mediaType: 'photo',
      includeBase64: true,
      compressImageMaxWidth: 1440,
      compressImageMaxHeight: 890,
      compressImageQuality: 0.8,
      cropping: cropping,
      cropperCircleOverlay: cropperCircleOverlay,
      useFrontCamera: useFrontCamera,
      loadingLabelText: i18n?.t('image_picker.msg_loading_picker') ?? 'Please waiting...',
    })
      .then((image) => {
        if (image.size < maxImageSize!) {
          const imageType = imageHandler(image.sourceURL ? image.sourceURL : image.path);
          const validatedImageType = allowTypes?.filter((element: String) =>
            imageType.toLowerCase().includes(element)
          );
          if (validatedImageType) {
            onUpload(image);
          } else {
            showMessage({
              message:
                i18n?.t('image_picker.msg_allow_file_type') ??
                `Allowed file types are ${allowTypes?.map((al) => al.toUpperCase()).join(', ')}.`,
              backgroundColor: '#ff0000',
            });
          }
        } else {
          showMessage({
            message: i18n?.t('image_picker.msg_max_file_size') ?? 'Maximum file size should be 2MB',
            backgroundColor: '#ff0000',
          });
        }
      })
      .catch((e) => {
        if (e.toString() !== 'Error: User cancelled image selection') {
          Alert.alert(
            i18n?.t('image_picker.msg_allow_access_camera') ??
              'Allow Application To Access Your Camera',
            i18n?.t('image_picker.msg_turn_camera_setting') ??
              'Tap Open Settings and turn on Camera to allow access.',
            [
              { text: i18n?.t('image_picker.btn_cancel') ?? 'Cancel' },
              {
                text: i18n?.t('image_picker.btn_open_setting') ?? 'Open Settings',
                onPress: () => openSettings(),
              },
            ]
          );
        }
      });
  };

  const launchImageLibrary = () => {
    Picker.openPicker({
      mediaType: 'photo',
      includeBase64: true,
      compressImageMaxWidth: 1440,
      compressImageMaxHeight: 890,
      compressImageQuality: 0.8,
      cropping: cropping,
      cropperCircleOverlay: cropperCircleOverlay,
      loadingLabelText: i18n?.t('image_picker.msg_loading_picker') ?? 'Please waiting...',
    })
      .then((image) => {
        if (image.size < maxImageSize!) {
          const imageType = imageHandler(image.sourceURL ? image.sourceURL : image.path);
          const validatedImageType = allowTypes?.filter((element: String) =>
            imageType.toLowerCase().includes(element)
          );

          if (validatedImageType) {
            onUpload(image);
          } else {
            showMessage({
              message:
                i18n?.t('image_picker.msg_allow_file_type') ??
                `Allowed file types are ${allowTypes?.map((al) => al.toUpperCase()).join(', ')}.`,
              backgroundColor: '#ff0000',
            });
          }
        } else {
          showMessage({
            message: i18n?.t('image_picker.msg_max_file_size') ?? 'Maximum file size should be 2MB',
            backgroundColor: '#ff0000',
          });
        }
      })
      .catch((e) => {
        if (e.toString() !== 'Error: User cancelled image selection') {
          Alert.alert(
            i18n?.t('image_picker.msg_allow_access_photo') ??
              'Allow Application To Access Your Photos',
            i18n?.t('image_picker.msg_turn_photo_setting') ??
              'Tap Open Settings and turn on Photos to allow access',
            [
              { text: i18n?.t('image_picker.btn_cancel') ?? 'Cancel' },
              {
                text: i18n?.t('image_picker.btn_open_setting') ?? 'Open Settings',
                onPress: () => openSettings(),
              },
            ]
          );
        }
      });
  };

  const imageHandler = (uri?: String) => {
    if (uri) {
      const getFilename = uri.split('/');
      const imgName = getFilename[getFilename.length - 1];
      return mime.lookup(imgName);
    } else {
      return null;
    }
  };

  return (
    <BottomSheetModal
      onBackButtonPress={onClose}
      isVisible={isVisible}
      backdropOpacity={0.25}
      onBackdropPress={onClose}
    >
      <TouchableOpacity
        onPress={() => {
          onClose();
          setTimeout(() => {
            launchCamera();
          }, 1000);
        }}
        style={styles.buttonContainerStyle}
        activeOpacity={0.8}
      >
        <CameraIcon width={18} height={18} />
        <Text style={styles.buttonTextStyle}>
          {i18n?.t('image_picker.btn_take_photo') ?? 'Take photo'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onClose();
          setTimeout(() => {
            launchImageLibrary();
          }, 1000);
        }}
        style={styles.buttonContainerStyle}
        activeOpacity={0.8}
      >
        <GalleryIcon width={18} height={18} />
        <Text style={styles.buttonTextStyle}>
          {i18n?.t('image_picker.btn_choose_photo') ?? 'Choose photo'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onClose}
        style={styles.cancelButtonContainerStyle}
        activeOpacity={0.8}
      >
        <Text style={styles.cancelTextStyle}>
          {i18n?.t('image_picker.btn_cancel').toUpperCase() ?? 'CANCEL'}
        </Text>
      </TouchableOpacity>
    </BottomSheetModal>
  );
};

ImagePicker.defaultProps = {
  isVisible: false,
  maxImageSize: 2097151,
  allowTypes: ['jpeg', 'jpg', 'png', 'heic'],
  cropping: true,
  cropperCircleOverlay: true,
  useFrontCamera: false,
};

export default ImagePicker;
