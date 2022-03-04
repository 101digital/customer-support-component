import React from 'react';
import {
  ImageURISource,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
  Text,
  View,
  Image,
  Platform,
  TextStyle,
} from 'react-native';

interface ComponentProps {
  icon: ImageURISource;
  countryCode: string;
  countryName: string;
  flagStyle?: StyleProp<ViewStyle>;
  countryNameStyle?: StyleProp<TextStyle>;
  countryCodeStyle?: StyleProp<TextStyle>;
}

export type ItemCountryProps = ComponentProps & TouchableOpacityProps;

const ItemCountryCode = (props: ItemCountryProps) => {
  const {
    icon,
    countryCode,
    countryName,
    flagStyle,
    countryCodeStyle,
    countryNameStyle,
    ...restProps
  } = props;

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} {...restProps}>
      <View style={flagStyle}>
        <Image
          source={icon}
          style={styles.image}
          resizeMode='stretch'
          borderRadius={Platform.OS === 'android' ? undefined : 5}
        />
      </View>
      <Text style={countryNameStyle}>{countryName}</Text>
      <Text style={countryCodeStyle}>{`+${countryCode}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    flex: 1,
  },
});

export default ItemCountryCode;
