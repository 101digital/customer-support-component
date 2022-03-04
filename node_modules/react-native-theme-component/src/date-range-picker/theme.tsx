import { ThemeFontProps } from '../fonts';
import { DateRangePickerStyles } from '.';
import { StyleSheet } from 'react-native';
import { ThemeColorProps } from '../colors';

const defaultDateRangePickerTheme = (
  fonts: ThemeFontProps,
  colors: ThemeColorProps
): DateRangePickerStyles => {
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
    headerTitleStyle: {
      padding: 16,
      textAlign: 'center',
      fontFamily: fonts.medium,
      fontSize: 15,
      color: colors.primaryColor,
    },
    bottomContainer: {
      marginHorizontal: 15,
      flexDirection: 'row',
      marginTop: 32,
      marginBottom: 10,
    },
    titleContainerStyle: {
      flex: 1,
    },
  });
};

export default defaultDateRangePickerTheme;
