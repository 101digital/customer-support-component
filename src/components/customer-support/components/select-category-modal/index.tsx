import { categorySelections } from 'customer-support-component/src/const';
import React, { useContext, useEffect, useState } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { BottomSheet, Button, RadioButtonGroup, RadioButtonItem, ThemeContext } from 'react-native-theme-component';
import useMergeStyles from './styles';

export type SelectCategoryModalProps = {
  isVisible: boolean;
  onClose: () => void;
  initValue?: string;
  onValueChanged: (value: any) => void;
  selectedSubjectId?: string;
  style?: SelectCategoryModalStyles;
};

export type SelectCategoryModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  modalTitleStyle?: StyleProp<TextStyle>;
};

const SelectCategoryModal = ({
  style,
  isVisible,
  onClose,
  onValueChanged,
  initValue,
  selectedSubjectId = '1'
}: SelectCategoryModalProps) => {
  const styles: SelectCategoryModalStyles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);
  const [value, setValue] = useState(initValue);

  const selectedSelections = categorySelections.find(s => s.subjectId === selectedSubjectId)?.options || [];

  console.log('selectedSubjectId', selectedSubjectId, selectedSelections)

  useEffect(() => {
    if (initValue) {
    //   setValue(selections.find((g) => g.id === initVal ue || g.label === initValue));
    }
  }, [initValue]);

  return (
    <BottomSheet onBackButtonPress={onClose} onBackdropPress={onClose} isVisible={isVisible}>
      <View style={styles.containerStyle}>
        <Text style={styles.modalTitleStyle}>Select Category</Text>
        <RadioButtonGroup style={{
            container: {
                marginBottom: 0
            }
        }} 
          data={selectedSelections} onSelect={value => setValue(value) }      
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

export default SelectCategoryModal;
