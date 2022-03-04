import { ThemeFontProps } from '../fonts';
import { DatePickerStyles } from '.';
import { StyleSheet } from 'react-native';
import { ThemeColorProps } from '../colors';

const defaultDatePickerTheme = (
  fonts: ThemeFontProps,
  colors: ThemeColorProps
): DatePickerStyles => {
  return StyleSheet.create({
    calendarContainer: {
      alignSelf: 'auto',
      paddingVertical: 10,
    },
    headerContainer: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: 'white',
      borderBottomColor: colors.dividerColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    headerButtonContainer: {
      padding: 16,
    },
    headerButtonTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 15,
      color: colors.primaryColor,
    },
    headerTitleStyle: {
      padding: 16,
      textAlign: 'center',
      fontFamily: fonts.medium,
      fontSize: 15,
      color: colors.primaryColor,
    },
  });
};

export default defaultDatePickerTheme;
