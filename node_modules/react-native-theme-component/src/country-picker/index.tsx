import React, { createRef, useContext, useEffect, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  ActivityIndicator,
  Platform,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { ThemeContext } from '../theme-context';
import { CloseIcon } from '../assets';
import { defaultsDeep, filter, isEmpty } from 'lodash';
import { Formik } from 'formik';
import { SearchData } from './search-data';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import ItemCountryCode from './item-country';
import Modal from 'react-native-modal';
import { CountryInformation } from './types';

const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT');

export type CountryPickerStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  topSpacer?: StyleProp<ViewStyle>;
  headerTextStyle?: StyleProp<TextStyle>;
  searchContainer?: StyleProp<ViewStyle>;
  searchInput?: StyleProp<TextStyle>;
  listContentContainerStyle?: StyleProp<ViewStyle>;
  countryNameTextStyle?: StyleProp<TextStyle>;
  countryCodeTextStyle?: StyleProp<TextStyle>;
  flagContainerStyle?: StyleProp<ViewStyle>;
};

export type CountryPickerProps = {
  isVisible?: boolean;
  backdropOpacity?: number;
  onClose: () => void;
  onSelectedCountry: (code: string, name: string, code3: string) => void;
  style?: CountryPickerStyles;
};

const CountryPicker = (props: CountryPickerProps) => {
  const { i18n, countries, countryPicker, isLoadingCountry, colors } = useContext(ThemeContext);
  const { onClose, isVisible, style, onSelectedCountry, backdropOpacity } = props;
  const [_currentCountries, setCurrentCountries] = useState<CountryInformation[]>(countries);
  const searchRef = createRef<any>();

  const styles: CountryPickerStyles = defaultsDeep(style, countryPicker);

  const innerStyles = StyleSheet.create({
    modalStyle: {
      flex: 1,
      justifyContent: 'flex-end',
      margin: 0,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    closeButton: {
      padding: 25,
    },
  });

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        searchRef?.current?.focus();
      }, 250);
    }
  }, [searchRef, isVisible]);

  const handleSearch = (key: string) => {
    const lowerKey = key.toLowerCase();
    const result = isEmpty(key)
      ? countries
      : filter(
          countries,
          (country) =>
            country.attributes.name.toLowerCase().includes(lowerKey) ||
            country.attributes.code2.toLowerCase().includes(lowerKey) ||
            country.attributes.code3.toLowerCase().includes(lowerKey)
        );
    setCurrentCountries(result);
  };

  useEffect(() => {
    if (isVisible) {
      setCurrentCountries(countries);
    }
  }, [isVisible]);

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
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
    >
      <View style={styles.topSpacer} />
      <SafeAreaView style={styles.containerStyle}>
        <View style={innerStyles.header}>
          <Text style={styles.headerTextStyle}>
            {i18n?.t('country_picker.lbl_select_country') ?? 'Select a country'}
          </Text>
          <TouchableOpacity onPress={onClose} style={innerStyles.closeButton}>
            <CloseIcon width={15} height={15} />
          </TouchableOpacity>
        </View>
        <Formik initialValues={SearchData.empty()} onSubmit={() => {}}>
          {({ setFieldValue }) => (
            <View style={styles.searchContainer}>
              <TextInput
                ref={searchRef}
                style={styles.searchInput}
                placeholder={i18n?.t('country_picker.plh_search_country') ?? 'Search country'}
                placeholderTextColor={'gray'}
                returnKeyType={'search'}
                onChangeText={(text: string) => {
                  setFieldValue('key', text);
                  handleSearch(text);
                }}
              />
            </View>
          )}
        </Formik>
        {isLoadingCountry ? (
          <ActivityIndicator color={colors.primaryColor} />
        ) : (
          <KeyboardAwareFlatList
            enableOnAndroid
            keyExtractor={(item, index) => `${item.id}-${index}`}
            data={_currentCountries}
            contentContainerStyle={styles.listContentContainerStyle}
            keyboardShouldPersistTaps='handled'
            renderItem={({ item }) => (
              <ItemCountryCode
                icon={{
                  uri: `https://static.101digital.io/${item.attributes.flagUrlRect}_92.png`,
                }}
                countryName={item.attributes.name}
                countryCode={item.attributes.idd}
                onPress={() =>
                  onSelectedCountry(
                    item.attributes.idd,
                    item.attributes.name,
                    item.attributes.code3
                  )
                }
                flagStyle={styles.flagContainerStyle}
                countryCodeStyle={styles.countryCodeTextStyle}
                countryNameStyle={styles.countryNameTextStyle}
              />
            )}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

CountryPicker.defaultProps = {
  isVisible: false,
  backdropOpacity: 0.5,
};

export default CountryPicker;
