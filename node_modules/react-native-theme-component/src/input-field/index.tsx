import { useField } from 'formik';
import { defaultsDeep } from 'lodash';
import React, { ReactNode, useContext, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';
import { ThemeContext } from '../theme-context';

export type InputFieldProps = TextInputMaskProps &
  TextInputProps & {
    name: string;
    prefixIcon?: ReactNode;
    suffixIcon?: ReactNode;
    errorBorderColor?: string;
    activeBorderColor?: string;
    inactiveBorderColor?: string;
    placeholderTextColor?: string;
    style?: InputFieldStyles;
    formatError?: (error: string) => string;
  };

export type InputFieldStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  errorTextStyle?: StyleProp<TextStyle>;
};

const InputField = (props: InputFieldProps) => {
  const {
    name,
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
    ...restProps
  } = props;
  const { inputField, colors } = useContext(ThemeContext);
  const [active, setActive] = useState(false);
  const [field, meta, helpers] = useField(name);
  const styles: InputFieldStyles = defaultsDeep(style, inputField);
  const showMask = !!options?.mask;

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
        <View style={styles.inputContainerStyle}>
          {showMask ? (
            <TextInputMask
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              value={field.value}
              onChangeText={field.onChange(name)}
              style={styles.textInputStyle}
              placeholderTextColor={placeholderTextColor}
              options={options}
              {...restProps}
            />
          ) : (
            <TextInput
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              value={field.value}
              onChangeText={field.onChange(name)}
              style={styles.textInputStyle}
              placeholderTextColor={placeholderTextColor}
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

InputField.defaultProps = {
  errorBorderColor: '#E63946',
  inactiveBorderColor: '#E6E6E6',
  type: 'custom',
};

export default InputField;
