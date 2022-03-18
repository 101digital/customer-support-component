# customer-support-component

## Feature

- Open support customer

## Installation

To add the customer-support-component to React Native app, run this command with tag version

```sh
yarn add https://github.com/101digital/customer-support-component.git#{tag-version}
```

Make sure you have permission to access this repository

- The theme-component is using [react-native-localize](https://github.com/zoontek/react-native-localize) to get default country code for iOS device. Make sure you installed and linked it to your app.
- Installed [react-native-webview](https://github.com/react-native-webview/react-native-webview)

## Quick Start

### Init API Service

- `CustomerSupportService` is initiated should be from `App.ts`

```javascript
import { CustomerSupportService } from 'customer-support-component';

CustomerSupportService.instance().initClients({
  contactBaseUrl: 'url',
});
```

### Assets And Multiple Languages

- All icons, images and texts are provided by default. You can use your custom by passing them as a props into each component

- In order to do multiple languages, you need to configurate `i18n` for [react-native-theme-component](https://github.com/101digital/react-native-theme-component.git). And then, you have to copy and paste all fields and values in [texts](customer-support-data.json) into your app locale file. You can also change text value, but DON'T change the key.

### CustomerSupportComponent

Open a web-view to cutomer can add help details

- Props, styles and component can be found [here](./src/components/customer-support/types.ts)

- Example

```javascript
const HelpScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomerSupportComponent
        params={{
          app: '101pay',
          platform: 'mobile',
          email: 'tuyen@gmail.com',
          name: 'Tuyen Nguyen',
          mobileNumber: '0172123',
        }}
      />
    </SafeAreaView>
  );
};
```
