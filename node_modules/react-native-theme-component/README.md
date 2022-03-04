# react-native-theme-component

<b>react-native-theme-component</b> is a reusable component which provides set of base elements that can be used across all the apps developed by 101 Digital.

## Table of Content

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
  - [Configurate ThemeProvider](#configurate-themeprovider)
  - [Create custom theme data](#create-custom-theme-data)
  - [Multiple languages](#multiple-languages)
- [API reference](#api-reference)
  - [Theme data](#theme-data)
  - [Access Theme Data](#access-theme-data)
  - [Colors](#colors)
  - [Fonts](#fonts)
  - [Button](#button)
  - [Alert](#alert)
  - [BottomSheet](#bottomsheet)
  - [Image](#image)
  - [InputField](#inputfield)
  - [InputPhoneNumber](#inputphonenumber)
  - [ErrorModal](#errormodal)
  - [Date Picker](#date-picker)
  - [Country Picker](#country-picker)
  - [Image Picker](#image-picker)
  - [Check Box](#check-box)
  - [Add component to the config.json file manually](#add-component-to-the-configjson-file-manually)

## Features

- Configure theme data (colors, fonts, button styles, alert styles... )
- Easy to access theme data inside React component
- Easy to use elements as other React Native elements

## Installation

To add the theme-component to React Native app, run this command with tag version

```
yarn add git+ssh://git@github.com/101digital/react-native-theme-component.git#tag-version
```

Make sure you have permission to access this repository

- The theme-component is using [react-native-localize](https://github.com/zoontek/react-native-localize) to get default country code for iOS device. Make sure you installed and linked it to your app.

- The theme-component is using [react-native-async-storage](https://react-native-async-storage.github.io/async-storage) to save countries data. Make sure you installed and linked it to your app.

- The theme-component is using [react-native-svg](https://github.com/react-native-svg/react-native-svg) to display icon assets. Make sure you installed and linked it to your app.

- If you use `ImagePicker`, you need install [react-native-permissions](https://github.com/zoontek/react-native-permissions) and [react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker). Make sure you installed and linked them to your app

## Quick Start

### Configurate ThemeProvider

Before using the theme-component, you must wrap your app with `ThemProvider` in your `app.ts`

```javascript
import { ThemeProvider } from 'react-native-theme-component';

const App = () => {
  return <ThemProvider theme={yourThemeData}>/* YOUR COMPONENTS */</ThemProvider>;
};
```

### Create custom theme data

You can create your theme data by using `createThemeData` function. Or elese, default theme will be used.

```javascript
import { createThemeData } from 'react-native-theme-component';

const yourThemeData = createThemeData({
  fonts: {},
  colors: {},
  button: {},
  alert: {},
  bottomSheet: {},
  inputField: {},
  inputPhoneNumber: {},
  errorModal: {},
  countryPicker: {},
  datePicker: {},
  imagePicker: {},
  checkBox: {},
});
export default yourThemeData;
```

### Multiple languages

If you wanna use multiple language, you must pass your translate function to `i18n` props, then use `i18n` as a context props (see below code) and get all values `texts` in `src/theme-component.json` and put them into your app language data.

```javascript
import { ThemeProvider } from 'react-native-theme-component';

const App = () => {
  return (
    <ThemProvider theme={yourThemeData} i18n={translate_func}>
      /* YOUR COMPONENTS */
    </ThemProvider>
  );
};
```

## API reference

### Theme data

Use `createThemeData` function to create your theme, see below props

```javascript
type ThemeProps = {
  colors: ThemeColorProps,
  button: ButtonStyles,
  fonts: ThemeFontProps,
  alert: AlertModalStyles,
  bottomSheet: BottomSheetModalStyles,
  inputField: InputFieldStyles,
  inputPhoneNumber: InputPhoneNumberStyles,
  errorModal: ErrorModalStyles,
  countryPicker: CountryPickerStyles,
  datePicker: DatePickerStyles,
  imagePicker: ImagePickerStyles,
  checkBox: CheckBoxStyles,
};
```

### Access Theme Data

<b>react-native-theme-component</b> using Context API to manage theme data, you can using `useContext` to access theme data
Additional, or can use prodive hooks function to acceess `colors` or `fonts`

```javascript
const fonts = useThemeFonts();
const colors = useThemeColors();
```

### Colors

The colors are being used for elements inside the theme-component or in your app as well. ThemeColorProps and default values can be found [here](https://github.com/101digital/react-native-theme-component/blob/master/src/colors.ts)

### Fonts

The fonts are being used for element inside the theme-component or in your app as well. ThemeFontProps can be found [here](https://github.com/101digital/react-native-theme-component/blob/master/src/fonts.ts)

- Note: If you use default font family (Poppins), you need some steps to link default font to your app.

1. Create `react-native.config.js` in root folder
2. Add assets folder path <b>'./node_modules/react-native-theme-component/src/assets/fonts'</b> to config

```javascript
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts', './node_modules/react-native-theme-component/src/assets/fonts'],
};
```

3. Run link assets command

```
npx react-native link
```

### Button

| Name             | Type                                | Description                                                                                                      |
| :--------------- | :---------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| label            | string (Required)                   | Button label                                                                                                     |
| isLoading        | bool (Optional)                     | Show loading indicator inside button                                                                             |
| variant          | 'primary' or 'secondary' (Optional) | Default is `primary`                                                                                             |
| disableOpacity   | number (Optional)                   | Default is `0.6`                                                                                                 |
| loadingIndicator | React Node (Optional)               | Provide custom indicator loading, default is `ActivityIndicator`                                                 |
| indicatorColor   | string (Optional)                   | Default is `#ffffff`                                                                                             |
| ...restProps     | TouchableOpacityProps (Optional)    | Other ToucableOpacity props (onPress, disabled ...)                                                              |
| style            | ButtonStyles (Optional)             | Can be found [here](https://github.com/101digital/react-native-theme-component/blob/master/src/button/index.tsx) |

- Example

```javascript
import { Button } from 'react-native-theme-component';

const TestScreen = () => {
  return (
    <View>
      <Button
        label={'CONTINUE'}
        onPress={() => {
          // handle when button is pressed
        }}
      />
    </View>
  );
};
```

### Alert

| Name               | Type                                 | Description                                                                         |
| :----------------- | :----------------------------------- | :---------------------------------------------------------------------------------- |
| title              | string (Required)                    | Alert title                                                                         |
| message            | string (Optional)                    | Alert message                                                                       |
| isVisible          | bool (Optional)                      | If `true` alert will be shown. Default is `false`                                   |
| timeOut            | bool (Optional)                      | Timeout before error showing                                                        |
| timeLimit          | number (Optional)                    | Delay showing time                                                                  |
| horizontalSpace    | number (Optional)                    | Horizontal space between elements inside Alert                                      |
| children           | React Node (Optional)                | Children below message and above CTA buttons                                        |
| leftIcon           | React Node (Optional)                | Top left icon, default is information icon                                          |
| closeIcon          | React Node (Optional)                | Close icon (top right), default is cross icon                                       |
| confirmTitle       | string (Optional)                    | Title of confirm button, default is `OK`                                            |
| cancelTitle        | string (Optional)                    | Title of cancel button, default is `undefined`. If `undefined`, cancel button hiden |
| backdropOpacity    | number (Optional)                    | Backdrop opacity, default is `0.5`                                                  |
| animationIn        | 'fadeIn', 'slideInUp', 'zoomIn'      | Animation when alert appear. Default is `fadeIn`                                    |
| animationOut       | 'fadeOut', 'slideOutDown', 'zoomOut' | Animation when alert disappear. Default is `fadeOut`                                |
| animationInTiming  | number (Optional)                    | Animation in duration                                                               |
| animationOutTiming | number (Optional)                    | Animation out duration                                                              |
| onConfirmed        | Function (Optional)                  | Handle action when clicked confirm button                                           |
| onCancel           | Function (Optional)                  | Handle action when clicked cancel button                                            |
| onClose            | Function (Optional)                  | Handle action when clicked close button                                             |
| onBackButtonPress  | Function (Optional)                  | Handle action when press back button in Android                                     |
| onBackdropPress    | Function (Optional)                  | Handle action when press on backdrop                                                |
| onModalHide        | Function (Optional)                  | Callback function when alert hiden                                                  |
| style              | AlertModalStyles (Optional)          | Can be found [here](/src/alert/index.tsx)                                           |

- Example

```javascript
import { AlertModal } from 'react-native-theme-component';

const TestScreen = () => {
  const [isShowAlert, setShowAlert] = useState(false);

  return (
    <View>
      <AlertModal
        isVisible={isShowAlert}
        title={'Error'}
        message={'Something went wrong'}
        onConfirmed={() => {
          // handle next action
        }}
        leftIcon={<FailedSvg width={18} height={18} fill='red' />}
        onClose={() => setShowAlert(false)}
      />
    </View>
  );
};
```

### BottomSheet

| Name               | Type                                 | Description                                                 |
| :----------------- | :----------------------------------- | :---------------------------------------------------------- |
| children           | React Node (Required)                | Children below message and above CTA buttons                |
| isVisible          | bool (Optional)                      | If `true` bottom sheet will be shown. Default is `false`    |
| backdropOpacity    | number (Optional)                    | Backdrop opacity, default is `0.5`                          |
| animationIn        | 'fadeIn', 'slideInUp', 'zoomIn'      | Animation when bottom sheet appear. Default is `fadeIn`     |
| animationOut       | 'fadeOut', 'slideOutDown', 'zoomOut' | Animation when bottom sheet disappear. Default is `fadeOut` |
| animationInTiming  | number (Optional)                    | Animation in duration                                       |
| animationOutTiming | number (Optional)                    | Animation out duration                                      |
| onBackButtonPress  | Function (Optional)                  | Handle action when press back button in Android             |
| onBackdropPress    | Function (Optional)                  | Handle action when press on backdrop                        |
| onModalHide        | Function (Optional)                  | Callback function when bottom sheet hiden                   |
| style              | BottomSheetModalStyles (Optional)    | Can be found [here](/src/bottom-sheet/index.tsx)            |

- Example

```javascript
import { BottomSheetModal } from 'react-native-theme-component';

const TestScreen = () => {
  const [isShowBottomSheet, setShowBottomSheet] = useState(false);

  return (
    <View>
      <BottomSheetModal isVisible={isShowBottomSheet}>
        <Text>Section 1</Text>
        <Text>Section 2</Text>
        <Text>Section 3</Text>
      </BottomSheetModal>
    </View>
  );
};
```

### Image

- Props

| Name          | Type                      | Description                          |
| :------------ | :------------------------ | :----------------------------------- |
| fallbackImage | ImageURISource (Required) | Default images if load source failed |
| ...restProps  | ImageProps                | All image props                      |

- Example

```javascript
import { Image } from 'react-native-theme-component';

const TestScreen = () => {
  return (
    <View>
      <Image
        resizeMode='cover'
        source={{
          uri: 'https://image_url',
        }}
        fallbackImage={images.bank} // fackback image when load image failed
      />
    </View>
  );
};
```

### InputField

| Name                 | Type                                | Description                                                             |
| :------------------- | :---------------------------------- | :---------------------------------------------------------------------- |
| name                 | srting (Required)                   | Formik field name                                                       |
| prefixIcon           | React Node (Optional)               | Prefix icon of InputField (on the left)                                 |
| suffixIcon           | React Node (Optional)               | Suffic icon of InputField (on the right)                                |
| errorBorderColor     | string (Optional)                   | Color of border when error happened                                     |
| activeBorderColor    | string (Optional)                   | Color of border when field is focused                                   |
| inactiveBorderColor  | string (Optional)                   | Color of border when field is unfocused                                 |
| placeholderTextColor | string (Optional)                   | Color of placeholder text                                               |
| placeholderTextColor | string (Optional)                   | Color of placeholder text                                               |
| formatError          | Function return string (Optional)   | Format in-line error message, example translate error message by locale |
| ...restProps         | TextInputProps & TextInputMaskProps | Props of text input and text input mask                                 |
| style                | InputFieldStyles (Optional)         | Can be found [here](/src/input-field/index.tsx)                         |

- Example

```javascript
import { InputField } from 'react-native-theme-component';

const TestScreen = () => {
  return (
    <View>
      <InputField formatError={(error) => error} />
    </View>
  );
};
```

### InputPhoneNumber

| Name                 | Type                                | Description                                                             |
| :------------------- | :---------------------------------- | :---------------------------------------------------------------------- |
| name                 | srting (Required)                   | Formik field name                                                       |
| dialCode             | srting (Required)                   | Dial code (ex: 84, 65, 1, 94, ...)                                      |
| onPressDialCode      | Function (Required)                 | Handle action when clicked dial code                                    |
| prefixIcon           | React Node (Optional)               | Prefix icon of InputField (on the left)                                 |
| suffixIcon           | React Node (Optional)               | Suffic icon of InputField (on the right)                                |
| errorBorderColor     | string (Optional)                   | Color of border when error happened                                     |
| activeBorderColor    | string (Optional)                   | Color of border when field is focused                                   |
| inactiveBorderColor  | string (Optional)                   | Color of border when field is unfocused                                 |
| placeholderTextColor | string (Optional)                   | Color of placeholder text                                               |
| placeholderTextColor | string (Optional)                   | Color of placeholder text                                               |
| formatError          | Function return string (Optional)   | Format in-line error message, example translate error message by locale |
| ...restProps         | TextInputProps & TextInputMaskProps | Props of text input and text input mask                                 |
| style                | InputPhoneNumberStyles(Optional)    | Can be found [here](/src/input-phone-number/index.tsx)                  |

- Example

```javascript
import { InputPhoneNumber } from 'react-native-theme-component';

const TestScreen = () => {
  return (
    <View>
      <InputPhoneNumber
        dialCode={'84'}
        onPressDialCode={() => {
          // call function to show CountryPicker
        }}
        formatError={(error) => error}
      />
    </View>
  );
};
```

### ErrorModal

| Name      | Type                        | Description                                             |
| :-------- | :-------------------------- | :------------------------------------------------------ |
| error     | ErrorData (Optional)        | The error modal will be shown once you give an error    |
| timeOut   | bool (Optional)             | delay for showing. Default is `false`                   |
| timeLimit | number (Optional)           | Delay time for showing error modal. Default is `100` ms |
| leftIcon  | ReactNode (Optional)        | Error icon show on left of modal                        |
| onClose   | Function (Required)         | Callback to handle closing error modal                  |
| timeOut   | bool (Optional)             | Timeout before error showing                            |
| timeLimit | number (Optional)           | Delay showing time                                      |
| style     | ErrorModalStyles (Optional) | Can be found [here](/src/error-modal/index.tsx)         |

- Example

```javascript
import { ErrorModal, ErrorData } from 'react-native-theme-component';

const TestScreen = () => {
  const [error, setError] = (useState < ErrorData) | (undefined > undefined);
  return (
    <View>
      <ErrorModal error={error} onClose={() => setError(undefined)} />
    </View>
  );
};
```

### Date Picker

| Name          | Type                        | Description                                                                         |
| :------------ | :-------------------------- | :---------------------------------------------------------------------------------- |
| isVisible     | bool (Optional)             | If `true`, date picker will be shown. Default is `false`                            |
| onClose       | Function (Required)         | Callback to handle closing date picker with date or not                             |
| onChange      | Function (Required)         | Callback when selecting date is done                                                |
| minDate       | Date (Optional)             | Min date can pick                                                                   |
| maxDate       | Date (Optional)             | Max date can pick                                                                   |
| title         | String (Optional)           | Center title of date picker                                                         |
| calendarTheme | CalendarTheme (Optional)    | Can be found [here](https://github.com/wix/react-native-calendars#advanced-styling) |
| style         | DatePickerStyles (Optional) | Can be found [here](/src/date-picker/index.tsx)                                     |

- Example

```javascript
import { DatePicker } from 'react-native-theme-component';

const TestScreen = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View>
      <DatePicker
        isVisible={showDatePicker}
        pickedDate={new Date()} // initial date
        minDate={new Date()} // min date can choose
        maxDate={new Date()} // max date can choose
        onClose={(date) => setShowDatePicker(false)}
        onChange={(date) => {
          // handler your bussiness with date value
        }}
      />
    </View>
  );
};
```

### Country Picker

| Name              | Type                           | Description                                                     |
| :---------------- | :----------------------------- | :-------------------------------------------------------------- |
| isVisible         | bool (Optional)                | If `true` country picker will be shown . Default is `false`     |
| backdropOpacity   | number (Optional)              | Backdrop opacity. Default is `0.5`                              |
| onClose           | Function (Required)            | Callback to handle closing country picker                       |
| onSelectedCountry | Function (Required)            | Callback once a country item is picked then return country code |
| style             | CountryPickerStyles (Optional) | Can be found [here](/src/country-picker/index.tsx)              |

- Example

```javascript
import { CountryPicker } from 'react-native-theme-component';

const TestScreen = () => {
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  return (
    <View>
      <CountryPicker
        isVisible={showCountryPicker}
        onClose={() => {
          setShowCountryPicker(false);
        }}
        onSelectedCountry={(code) => {
          // handle picked country code
        }}
      />
    </View>
  );
};
```

### Image Picker

To use `ImagePicker`, make sure you installed [react-native-permissions](https://github.com/zoontek/react-native-permissions) and [react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)

| Name                 | Type                           | Description                                                                               |
| :------------------- | :----------------------------- | :---------------------------------------------------------------------------------------- |
| isVisible            | bool (Optional)                | If `true` image picker will be shown . Default is `false`                                 |
| maxImageSize         | number (Optional)              | Max image size can be picked. Default is `2MB`                                            |
| allowTypes           | String[](Optional)             | List of document's extension can be picked                                                |
| cropping             | bool (Optional)                | Crop image after picked. Default is `false`                                               |
| cropping             | bool (Optional)                | Crop image after picked. Default is `false`                                               |
| cropperCircleOverlay | bool (Optional)                | If allow crop image, then can crop into circle image or keep original. Default is `false` |
| useFrontCamera       | bool (Optional)                | User front camera when taking a photo. Default is `false`                                 |
| onClose              | Function (Required)            | Callback to handle closing image picker                                                   |
| onUpload             | Function (Required)            | Callback once completed pick an image, then return image data                             |
| style                | CountryPickerStyles (Optional) | Can be found [here](/src/image-picker/index.tsx')                                         |

- Example:

```javascript
import { ImagePicker } from 'react-native-theme-component';

const TestScreen = () => {
  const [showModel, setShowModel] = useState < boolean > false;

  return (
    <View>
      <ImagePicker
        cropping={true}
        cropperCircleOverlay={true}
        useFrontCamera={true}
        showModel={showModel}
        tapShowModel={tapShowModel}
        onUpload={(image) => {
          // handle your business with image data
        }}
      />
    </View>
  );
};
```

### Check Box

| Name            | Type                      | Description                                  |
| :-------------- | :------------------------ | :------------------------------------------- |
| title           | string (Required)         | Title of check box                           |
| isSelected      | bool (Required)           | If `true` check box will be selected state   |
| onChanged       | Function (Required)       | Listen when selected state changed           |
| activeIconColor | string (Optional)         | Color of tick icon when is selected state    |
| tickIcon        | ReactNode (Optional)      | Custom tick icon                             |
| style           | CheckBoxStyles (Optional) | Can be found [here](/src/checkbox/index.tsx) |

- Example

```javascript
import { CheckBox } from 'react-native-theme-component';

const TestScreen = () => {
  const [isSelected, setSelected] = useState(false);

  return (
    <View>
      <CheckBox
        title='Do you have a book'
        isSelected={isSelected}
        onChanged={(value) => {
          setSelected(value);
        }}
      />
    </View>
  );
};
```

### Add component to the config.json file manually

1. Make sure you synced latest local data in `theme-component.json` into [theme-component.json](https://github.com/101digital/components-data/blob/main/data/theme-component.json). They should be synced once you update

2. Add the theme-component to `components` tags. The theme-component have `componentId` is "74a603bd-a36a-4f2b-bc18-385a4101878c" and it can't be changed.

```json
{
  "components": [
    {
      "componentId": "74a603bd-a36a-4f2b-bc18-385a4101878c",
      "componentName": "ThemeComponent",
      "isRequired": true
    }
  ]
}
```

- If you wanna add custome fonts, colors to the theme-component, you can see the example below:

```json
{
  "components": [
    {
      "componentId": "74a603bd-a36a-4f2b-bc18-385a4101878c",
      "componentName": "ThemeComponent",
      "isRequired": true,
      "config": {
        "fonts": [
          {
            "source": "https://link-to-regular-font",
            "name": "Regular.ttf",
            "type": "regular"
          },
          {
            "source": "https://link-to-medium-font",
            "name": "Medium.ttf",
            "type": "medium"
          },
          {
            "source": "https://link-to-semibold-font",
            "name": "SemiBold.ttf",
            "type": "semiBold"
          },
          {
            "source": "https://link-to-bold-font",
            "name": "Bold.ttf",
            "type": "bold"
          }
        ],
        "colors": {
          "primaryColor": "red"
        }
      }
    }
  ]
}
```

- Custom fonts: You can add arrays of fonts to the config, each of them must have: source, name. type. Source is a link to fonts source to download it. Name is name of font. Type is one of fonts props name. Fonts props can be found here: [Fonts prps](https://github.com/101digital/react-native-theme-component/blob/master/README.md#fonts)

- Custom colors: contain color keys and color values. Color keys can be found here: [Colors props](https://github.com/101digital/react-native-theme-component/blob/master/README.md#colors)

3. Check required dependencies of auth-component inside tag `dependencies` in `config.json`. Make sure tag `dependencies` must have enough below data

```json
{
  "dependencies": [
    { "name": "@react-native-async-storage/async-storage", "version": "^1.15.5" },
    { "name": "react-native-localize", "version": "^2.1.1" },
    {
      "name": "lodash",
      "version": "^4.17.19",
      "typescript": {
        "name": "@types/lodash",
        "version": "^4.14.161"
      }
    },
    { "name": "formik", "version": "^2.2.9" },
    { "name": "react-native-masked-text", "version": "^1.13.0" },
    { "name": "react-native-modal", "version": "^12.0.2" },
    { "name": "react-native-svg", "version": "^12.1.1" },
    { "name": "react-native-extra-dimensions-android", "version": "^1.2.5" },
    { "name": "react-native-keyboard-aware-scroll-view", "version": "^0.9.3" },
    { "name": "react-native-image-crop-picker", "version": "^0.36.2" }, // if you use ImagePicker
    { "name": "react-native-permissions", "version": "^3.0.5" } // if you use ImagePicker
  ]
}
```

If have any item is not existing in `dependencies` of `config.json` file, please find missing one from `src/component.json` and put it to `dependencies`.
