import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { CustomerSupportComponentProps, CustomerSupportComponentStyles } from './types';
import WebView from 'react-native-webview';
import useMergeStyles from './theme';
import { CustomerSupportService } from '../../service/customer-support-service';

const CustomerSupportComponent = (props: CustomerSupportComponentProps) => {
  const { styles, params } = props;

  const _styles: CustomerSupportComponentStyles = useMergeStyles(styles);

  return (
    <WebView
      incognito
      style={_styles.containerStyle}
      startInLoadingState
      javaScriptEnabled
      source={{ uri: CustomerSupportService.instance().contactBaseUrl(params) }}
      renderLoading={() => (
        <View style={innerStyles.loadingIndicator}>
          <ActivityIndicator color={'grey'} />
        </View>
      )}
    />
  );
};

const innerStyles = StyleSheet.create({
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomerSupportComponent;
