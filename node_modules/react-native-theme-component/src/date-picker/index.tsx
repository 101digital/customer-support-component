import React, { useState, useContext, useEffect } from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Calendar, CalendarTheme, DateObject } from 'react-native-calendars';
import moment from 'moment';
import { ThemeContext } from '../theme-context';
import { defaultsDeep } from 'lodash';
import Modal from 'react-native-modal';

const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT');

export type DatePickerStyles = {
  headerContainer?: StyleProp<ViewStyle>;
  calendarContainer?: StyleProp<ViewStyle>;
  headerButtonContainer?: StyleProp<ViewStyle>;
  headerButtonTextStyle?: StyleProp<TextStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
};

export type DatePickerProps = {
  isVisible?: boolean;
  backdropOpacity?: number;
  onClose: (value?: Date) => void;
  onChange: (value: Date) => void;
  minDate?: Date;
  pickedDate?: Date;
  maxDate?: Date;
  title?: string;
  calendarTheme?: CalendarTheme;
  style?: DatePickerStyles;
};

const DatePicker = (props: DatePickerProps) => {
  const { fonts, colors, datePicker, i18n } = useContext(ThemeContext);
  const {
    onChange,
    onClose,
    minDate,
    pickedDate,
    maxDate,
    title,
    calendarTheme,
    style,
    isVisible,
    backdropOpacity,
  } = props;
  const [selectedDate, setDate] = useState(moment(pickedDate).format('YYYY-MM-DD'));
  const [_minDate, setMinDate] = useState(minDate);
  const [_maxDate, setMaxDate] = useState(maxDate);

  useEffect(() => {
    setMinDate(minDate);
  }, [minDate]);

  useEffect(() => {
    setMaxDate(maxDate);
  }, [maxDate]);

  useEffect(() => {
    setDate(moment(pickedDate).format('YYYY-MM-DD'));
  }, [pickedDate]);

  const styles: DatePickerStyles = defaultsDeep(style, datePicker);

  const calTheme = defaultsDeep(calendarTheme, {
    todayTextColor: 'black',
    indicatorColor: colors.primaryColor,
    textDayFontFamily: fonts.regular,
    textMonthFontFamily: fonts.medium,
    textDayHeaderFontFamily: fonts.medium,
    textSectionTitleColor: 'black',
    textMonthFontWeight: '600',
    textMonthFontSize: 16,
    monthTextColor: 'black',
    textDayFontWeight: '300',
    arrowColor: 'black',
    'stylesheet.calendar.main': {
      monthView: {
        borderWidth: 0,
        borderColor: '#E5E5E5',
        borderRadius: 0,
        backgroundColor: 'white',
        overflow: 'hidden',
      },
      week: {
        marginVertical: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 0,
      },
    },
  });

  const innerStyles = StyleSheet.create({
    modalStyle: {
      flex: 1,
      justifyContent: 'flex-end',
      margin: 0,
      zIndex: 100,
    },
    container: {
      backgroundColor: 'white',
    },
  });

  const marker = {
    selectedColor: colors.primaryColor,
    textColor: 'white',
    dotColor: 'white',
    selected: true,
  };

  const setupStartMarker = (day: DateObject) => {
    setDate(day.dateString);
  };

  return (
    <Modal
      isVisible={isVisible}
      deviceHeight={deviceHeight}
      backdropTransitionInTiming={50}
      backdropTransitionOutTiming={50}
      hideModalContentWhileAnimating
      useNativeDriverForBackdrop
      useNativeDriver
      backdropOpacity={backdropOpacity}
      statusBarTranslucent
      style={innerStyles.modalStyle}
      animationIn='slideInUp'
      animationOut='slideOutDown'
      onBackdropPress={() => onClose(undefined)}
      onBackButtonPress={() => onClose(undefined)}
    >
      <SafeAreaView style={innerStyles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.headerButtonContainer}
            onPress={() => onClose(undefined)}
            activeOpacity={0.8}
          >
            <Text style={styles.headerButtonTextStyle}>
              {i18n?.t('date_picker.btn_close') ?? 'Close'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.headerTitleStyle}>
            {title ?? i18n?.t('date_picker.lbl_select_date') ?? 'Select Date'}
          </Text>
          <TouchableOpacity
            style={styles.headerButtonContainer}
            onPress={() => {
              const newDate = new Date(selectedDate);
              onChange(newDate);
              onClose(newDate);
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.headerButtonTextStyle}>
              {i18n?.t('date_picker.btn_done') ?? 'Done'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.calendarContainer}>
          <Calendar
            markedDates={{
              [selectedDate]: {
                ...marker,
                marked: selectedDate === moment().format('YYYY-MM-DD'),
              },
            }}
            minDate={_minDate}
            maxDate={_maxDate}
            current={new Date(selectedDate)}
            theme={calTheme}
            onDayPress={(day: DateObject) => {
              setupStartMarker(day);
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

DatePicker.defaultProps = {
  isVisible: false,
  backdropOpacity: 0.5,
};

export default DatePicker;
