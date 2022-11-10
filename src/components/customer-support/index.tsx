import React, { useRef, useCallback, useContext, useState, useImperativeHandle, forwardRef } from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, Keyboard, TextInput } from 'react-native';
import { CustomerSupportComponentProps, CustomerSupportComponentRef } from './types';
import { Formik } from 'formik';
import { CustomerSupportData, CustomerSupportSchema } from './model';
import { Button, ImagePicker, InputField, InputPhoneNumber, ThemeContext } from 'react-native-theme-component';
import Recaptcha, { RecaptchaHandles } from "react-native-recaptcha-that-works";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SelectCategoryModal from './components/select-category-modal';
import { ArrowDownIcon } from 'react-native-theme-component/src/assets';
import SelectSubjectModal from 'customer-support-component/src/components/customer-support/components/select-subject-modal';
import { categorySelections, subjectSelections } from 'customer-support-component/src/const';


const siteKey = '6LfvtkcfAAAAAHQniYzxVOByhcMqx7lN1P5yx9fj';
const baseUrl = 'https://contact.uniondigitalbank.io';

const CustomerSupportComponent = forwardRef((props: CustomerSupportComponentProps, ref) => {
  const { params } = props;
  const { onPressCountryPicker } = params || {};
  const { deviceCountryCode } = useContext(ThemeContext);
  const recaptcha = useRef<RecaptchaHandles>(null);
  const formikRef = useRef(null);
  const [dialCode, setDialCode] = useState(deviceCountryCode);
  const [openSubjectModal, setOpenSubjectModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [isShowSelectAttachmentFilesPopup, setIsShowSelectAttachmentFilesPopup] = useState(false);
  

  useImperativeHandle(
    ref,
    (): CustomerSupportComponentRef => ({
      updateCountryCode,
    })
  );

  const updateCountryCode = (code: string) => {
    setDialCode(code);
  };
  const send = () => {
      console.log('send!');
      recaptcha.current?.open();
  };

  const onVerify = (token: string) => {
      console.log('success!', token);
  };

  const onExpire = () => {
      console.warn('expired!');
  }

  const handleClosePress = useCallback(() => {
    recaptcha.current?.close();
  }, []);


  const handleOnValidate = async (values) => {
    Keyboard.dismiss();

    // const validInvitation = await register(validateToken, mobileNumber, 'firstName', 'lastName');
    // if (validInvitation) {
    //   Root?.props?.onPress();
    // } else if (errorRegister) {
    //   formikRef?.current?.setFieldError('code', 'Invalid invite code');
    // }
  };

  const phoneNumberInputStyles = {
    contentContainerStyle: {
      borderBottomColor: '#F1F6FC',
      backgroundColor:'#F1F6FC'
    },
    inputContainerStyle: {
      height: 42,
      marginLeft: 10,
      borderWidth: 1, 
      borderRadius: 4,
      backgroundColor: "#fff",
      borderColor: 'rgba(0 ,0 ,0, 0.1)',
    },
    textInputStyle: {
      fontSize: 15,
      color: '#000000',
    },
    dialContainerStyle: {
      borderWidth: 1,
      borderColor: 'rgba(0 ,0 ,0, 0.1)',
      borderRadius: 4,
      padding: 9,
      width: 100,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 0,
      backgroundColor: "#fff"
    },
  }

  const inputStyles = {
    contentContainerStyle: {
      borderWidth: 1,
      borderRadius: 5,
      borderBottomWidth: 1,
      backgroundColor: "#fff"
    }
  }


  console.log('selectedSubject', selectedSubject);

  
  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize={true}
      initialValues={CustomerSupportData.empty()}
      validationSchema={CustomerSupportSchema}
      onSubmit={(values) => {
        Keyboard.dismiss();
        console.log('CustomerSupportData', values);
      }}
    >
      
      {({ isValid, submitForm }) => {
          return (
            <SafeAreaView style={styles.container}>
              <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                style={styles.mainContainer}
                keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
                showsVerticalScrollIndicator={false}
                extraScrollHeight={50}
              >

              <Text style={styles.labelTextStyle}>
                {'Full name'}
              </Text>
              <InputField
                name="firstName"
                placeholder={
                  "Enter your full name"
                }
                maxLength={100}
                style={inputStyles}
              />

              <Text style={styles.labelTextStyle}>
                {'Email'}
              </Text>
              <InputField
                name="email"
                placeholder={
                  "Enter your email"
                }
                maxLength={100}
                style={inputStyles}
              />
                <Text style={styles.labelTextStyle}>{'Mobile number'}</Text>
                <InputPhoneNumber
                  dialCode={dialCode}
                  onPressDialCode={onPressCountryPicker}
                  name="userPhone"
                  returnKeyType="done"
                  placeholder={'Mobile number'}
                  autoCapitalize="none"
                  style={phoneNumberInputStyles}
                  withDialCode={true}
                />

              <Text style={styles.labelTextStyle}>
                {'Main concern'}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setOpenSubjectModal(true)}
              >
                <InputField
                  name="mainConcern"
                  value={subjectSelections.find(s => s.value === selectedSubject)?.title}
                  placeholder={
                  'Select a subject'
                  }
                  pointerEvents="none"
                  editable={false}
                  suffixIcon={
                    <View style={styles.suffixContainerStyle}>
                      <ArrowDownIcon width={12} height={12} />
                    </View>
                  }
                  style={{
                    contentContainerStyle: {
                      borderWidth: 1,
                      borderRadius: 5,
                      borderBottomWidth: 1,
                      backgroundColor: "#fff"
                    }
                  }}
                />
              </TouchableOpacity>
              {selectedSubject && (
                <>
                <Text style={styles.labelTextStyle}>
                  {'Sub concern'}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setOpenCategoryModal(true)}
                >
                  <InputField
                    name="subConcern"
                    placeholder={
                    'Select a category'
                    }
                    value={categorySelections.find(s => s.subjectId === selectedSubject)?.options.find((opt) => opt.value === selectedCategory)?.title  }
                    pointerEvents="none"
                    editable={false}
                    suffixIcon={
                      <View style={styles.suffixContainerStyle}>
                        <ArrowDownIcon width={12} height={12} />
                      </View>
                    }
                    style={{
                      contentContainerStyle: {
                        borderWidth: 1,
                        borderRadius: 5,
                        borderBottomWidth: 1,
                        backgroundColor: "#fff"
                      }
                    }}
                  />
                </TouchableOpacity>
              <Text style={styles.labelTextStyle}>How can we help you?</Text>
              <InputField
                name="details"
                placeholder={
                  "Enter details"
                }
                maxLength={500} 
                multiline={true}
                numberOfLines={10}
                style={{
                  contentContainerStyle: {
                    ...inputStyles.contentContainerStyle,
                    height: 145,
                  },
                  textInputStyle: {
                    textAlignVertical: 'top',
                    height: 125,
                  }
                }}
                
              />
              <Text style={styles.countDetailsLabel}>0/500</Text>

              <Text>Add Attachments</Text>
              <Text>Upload files in .jpg .png or .pdf format. Max of 5MB</Text>
              
              <View style={{marginTop: 25}}>
               <Button label={'Attach a file or photo'} onPress={() => setIsShowSelectAttachmentFilesPopup(true)} />
              </View>
              
              <Text style={styles.labelTextStyle}>Captcha</Text>
              <TouchableOpacity>

              </TouchableOpacity>
              </>
              )}
              <SelectSubjectModal 
                isVisible={openSubjectModal} 
                onClose={() => setOpenSubjectModal(false)} 
                onValueChanged={(value) => {
                  setSelectedSubject(value);
                  setOpenSubjectModal(false);
                }} 
              />
              <SelectCategoryModal 
                isVisible={openCategoryModal} 
                selectedSubjectId={selectedSubject}
                onClose={() => setOpenCategoryModal(false)} 
                onValueChanged={(value) => {
                  setSelectedCategory(value);
                  setOpenCategoryModal(false);
                }} 
              />
              </KeyboardAwareScrollView>

              <Recaptcha
                ref={recaptcha}
                siteKey={siteKey}
                baseUrl={baseUrl}
                theme="dark"
                onVerify={onVerify}
                onExpire={onExpire}
                footerComponent={
                  <View style={{marginBottom: 25}}>
                    <Button title="CANCEL" onPress={handleClosePress} />
                  </View>
                }
              />
              <ImagePicker 
              isVisible={isShowSelectAttachmentFilesPopup}
              onClose={() => {
                console.log('on close');
                setIsShowSelectAttachmentFilesPopup(false);
              }} onUpload={() => {
                console.log('onUpload');
                setIsShowSelectAttachmentFilesPopup(false);
              } } />
              </SafeAreaView>
          )}}
    </Formik>
    // <WebView
    //   incognito
    //   style={_styles.containerStyle}
    //   startInLoadingState
    //   javaScriptEnabled
    //   source={{ uri: CustomerSupportService.instance().contactBaseUrl(params) }}
    //   renderLoading={() => (
    //     <View style={innerStyles.loadingIndicator}>
    //       <ActivityIndicator color={'grey'} />
    //     </View>
    //   )}
    // />
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F6FC',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#F1F6FC',
    paddingHorizontal: 24,
  },
  labelTextStyle: {
    fontSize: 12,
    lineHeight: 21,
    marginBottom: 3,
    marginTop: 20,
  },
  suffixContainerStyle: {
    paddingHorizontal: 12,
  },
  countDetailsLabel: {
    textAlign: 'right',
    fontSize: 12,
    lineHeight: 21,
  }
});

export default CustomerSupportComponent;
