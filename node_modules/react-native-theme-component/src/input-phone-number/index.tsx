import { useField } from 'formik';
import { defaultsDeep } from 'lodash';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';
import { ArrowDownIcon } from '../assets';
import { ThemeContext } from '../theme-context';

export type InputPhoneNumberProps = TextInputProps &
  TextInputMaskProps & {
    name: string;
    dialCode: string;
    onPressDialCode?: () => void;
    prefixIcon?: ReactNode;
    suffixIcon?: ReactNode;
    errorBorderColor?: string;
    activeBorderColor?: string;
    inactiveBorderColor?: string;
    placeholderTextColor?: string;
    style?: InputPhoneNumberStyles;
    formatError?: (error: string) => string;
  };

export type InputPhoneNumberStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  errorTextStyle?: StyleProp<TextStyle>;
  dialContainerStyle?: StyleProp<ViewStyle>;
  dialTextStyle?: StyleProp<TextStyle>;
};

const InputPhoneNumber = (props: InputPhoneNumberProps) => {
  const {
    name,
    dialCode,
    onPressDialCode,
    onFocus,
    onBlur,
    suffixIcon,
    prefixIcon,
    errorBorderColor,
    activeBorderColor,
    inactiveBorderColor,
    style,
    placeholderTextColor,
    formatError,
    options,
    type,
    ...restProps
  } = props;
  const { inputPhoneNumber, colors } = useContext(ThemeContext);
  const [active, setActive] = useState(false);
  const [field, meta, helpers] = useField(name);
  const styles: InputPhoneNumberStyles = defaultsDeep(style, inputPhoneNumber);
  const showMask = !!options?.mask;
  const [mobileNumber, setMobileNumber] = useState('');

  useEffect(() => {
    field.onChange(name)(`${dialCode}${mobileNumber}`);
  }, [dialCode, mobileNumber]);

  const handleMobileNumberTextOnChange = (text: string) => {
    const sanitizedNumber = text === '0' ? '' : text.replace(/\D+/g, '');
    setMobileNumber(sanitizedNumber);
  };

  const handleOnFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setActive(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleOnBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setActive(false);
    field.onBlur(name);
    helpers.setTouched(true);
    if (onBlur) {
      onBlur(event);
    }
  };

  let separatorColor: string;

  if (meta.error && meta.touched) {
    separatorColor = errorBorderColor!;
  } else {
    separatorColor = active ? (activeBorderColor ?? colors.primaryColor)! : inactiveBorderColor!;
  }

  const getErrorMessage = (error: string) => {
    return formatError?.(error) ?? error;
  };

  return (
    <View style={styles.containerStyle}>
      <View style={[styles.contentContainerStyle, { borderColor: separatorColor }]}>
        {prefixIcon}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.dialContainerStyle}
          onPress={onPressDialCode}
        >
          <Text style={styles.dialTextStyle}>{`+${dialCode}`}</Text>
          <ArrowDownIcon width={10} height={10} color={'black'} />
        </TouchableOpacity>
        <View style={styles.inputContainerStyle}>
          {showMask ? (
            <TextInputMask
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              value={mobileNumber}
              onChangeText={handleMobileNumberTextOnChange}
              style={styles.textInputStyle}
              placeholderTextColor={placeholderTextColor}
              options={options}
              keyboardType="number-pad"
              type={type}
              {...restProps}
            />
          ) : (
            <TextInput
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              value={mobileNumber}
              onChangeText={handleMobileNumberTextOnChange}
              style={styles.textInputStyle}
              placeholderTextColor={placeholderTextColor}
              keyboardType="number-pad"
              {...restProps}
            />
          )}
        </View>
        {suffixIcon}
      </View>
      {meta.error && meta.touched && (
        <Text style={styles.errorTextStyle}>{getErrorMessage(meta.error)}</Text>
      )}
    </View>
  );
};

InputPhoneNumber.defaultProps = {
  errorBorderColor: '#E63946',
  inactiveBorderColor: '#E6E6E6',
  type: 'custom',
};

export default InputPhoneNumber;
