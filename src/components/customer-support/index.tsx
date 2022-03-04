import React from 'react';
import { View } from 'react-native';
import { CustomerSupportComponentProps, CustomerSupportComponentStyles } from './types';
import WebView from 'react-native-webview';
import useMergeStyles from './theme';
import { CustomerSupportService } from '../../service/customer-support-service';

const CustomerSupportComponent = (props: CustomerSupportComponentProps) => {
  const { styles, params } = props;

  const _styles: CustomerSupportComponentStyles = useMergeStyles(styles);

  return (
    <View style={_styles.containerStyle}>
      <WebView
        scalesPageToFit
        incognito
        startInLoadingState
        javaScriptEnabled
        source={{ uri: CustomerSupportService.instance().contactBaseUrl(params) }}
      />
    </View>
  );
};

export default CustomerSupportComponent;
