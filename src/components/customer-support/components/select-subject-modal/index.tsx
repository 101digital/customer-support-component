import { subjectSelections } from 'customer-support-component/src/const';
import React, { useContext, useState } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { BottomSheet, Button, RadioButtonGroup, ThemeContext } from 'react-native-theme-component';
import useMergeStyles from './styles';

export type SelectSubjectModalProps = {
  isVisible: boolean;
  onClose: () => void;
  initValue?: string;
  onValueChanged: (value: any) => void;
  style?: SelectSubjectModalStyles;
};

export type SelectSubjectModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  modalTitleStyle?: StyleProp<TextStyle>;
};

const SelectSubjectModal = ({
  style,
  isVisible,
  onClose,
  onValueChanged,
  initValue,
}: SelectSubjectModalProps) => {
  const styles: SelectSubjectModalStyles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);

  const [value, setValue] = useState(initValue);

  return (
    <BottomSheet onBackButtonPress={onClose} onBackdropPress={onClose} isVisible={isVisible}>
      <View style={styles.containerStyle}>
        <Text style={styles.modalTitleStyle}>Select gender</Text>
        <RadioButtonGroup style={{
            container: {
                marginBottom: 0
            }
        }} 
        data={subjectSelections} 
        onSelect={(value) => setValue(value)}        
        selectedValue={value}
        />
        <Button
          onPress={() => {
            onValueChanged(value!);
          }}
          label="Select"
          disabled={value === undefined}
          disableColor={colors.secondaryButtonColor}
          style={{
            primaryContainerStyle: {
              marginTop: 30,
            },
          }}
        />
      </View>
    </BottomSheet>
  );
};

export default SelectSubjectModal;
