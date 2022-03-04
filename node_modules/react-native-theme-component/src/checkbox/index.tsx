import React, { ReactNode, useContext } from 'react';
import { StyleProp, TextStyle, View, ViewStyle, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../theme-context';
import { defaultsDeep } from 'lodash';
import { TickIcon } from '../assets';

export type CheckBoxStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  selectedBoxStyle?: StyleProp<ViewStyle>;
  unSelectedBoxStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

export type CheckBoxProps = {
  title: string;
  isSelected: boolean;
  activeIconColor?: string;
  tickIcon?: ReactNode;
  onChanged: (value: boolean) => void;
  style?: CheckBoxStyles;
};

const CheckBox = (props: CheckBoxProps) => {
  const { title, isSelected, tickIcon, onChanged, style, activeIconColor } = props;

  const { checkBox } = useContext(ThemeContext);
  const styles: CheckBoxStyles = defaultsDeep(style, checkBox);
  const _activeColor = activeIconColor ?? '#ffffff';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.containerStyle}
      onPress={() => {
        onChanged(!isSelected);
      }}
    >
      <View style={isSelected ? styles.selectedBoxStyle : styles.unSelectedBoxStyle}>
        {isSelected && <>{tickIcon ?? <TickIcon color={_activeColor} size={13} />}</>}
      </View>
      <Text style={styles.titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CheckBox;
