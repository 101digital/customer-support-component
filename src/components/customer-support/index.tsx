import React, { useRef, useCallback, useContext, useState, forwardRef } from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, Keyboard, TextInput, Platform } from 'react-native';
import { CustomerSupportComponentProps } from './types';
import { Formik, FormikProps } from 'formik';
import { CustomerSupportData, CustomerSupportSchema } from './model';
import { Button, CheckBox, CountryPicker, ImageDocumentPicker, InputField, InputPhoneNumber, ThemeContext } from 'react-native-theme-component';
import Recaptcha, { RecaptchaHandles } from "react-native-recaptcha-that-works";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SelectCategoryModal from './components/select-category-modal';
import { ArrowDownIcon, AttachIcon, RemoveIcon } from 'react-native-theme-component/src/assets';
import SelectSubjectModal from 'customer-support-component/src/components/customer-support/components/select-subject-modal';
import { categorySelections, subjectSelections } from 'customer-support-component/src/const';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { CustomerSupportService } from '../../service/customer-support-service';
import { i18n } from '@/translations/translation-config';

const siteKey = '6LfvtkcfAAAAAHQniYzxVOByhcMqx7lN1P5yx9fj';
const baseUrl = 'https://contact.uniondigitalbank.io';


const CustomerServices = CustomerSupportService.instance();

const CustomerSupportComponent = forwardRef(({props}: CustomerSupportComponentProps, ref) => {
  const {onRequestSuccess, userInfo} = props;
  const [isLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);
  const { deviceCountryCode, colors } = useContext(ThemeContext);
  const recaptcha = useRef<RecaptchaHandles>(null);
  const formikRef = useRef<FormikProps<CustomerSupportData>>(null);
  const [dialCode, setDialCode] = useState(deviceCountryCode);
  const [openSubjectModal, setOpenSubjectModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [isVerifiedCaptcha, setIsVerifiedCaptcha] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [isShowSelectAttachmentFilesPopup, setIsShowSelectAttachmentFilesPopup] = useState(false);
  const [files, setFiles] = React.useState<any[]>([]);
  const [isShowCountryPicker, setIsShowCountryPicker] = useState(false);

  const onVerify = (token: string) => {
    console.log('success!', token);
    if(token && token.length > 0) {
      setIsVerifiedCaptcha(true);
    }
  };

  const onExpire = () => {
      console.warn('expired!');
  }

  const handleClosePress = useCallback(() => {
    recaptcha.current?.close();
  }, []);

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

  const renderRowFile = (f: DocumentPickerResponse) => {

    return <View key={f.name} style={{flexDirection: 'row', marginTop: 18, alignItems: 'center', justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'row'}}>
        <AttachIcon width={20} height={20} />
        <Text>{f.name}</Text>
      </View>
      <TouchableOpacity onPress={() => setFiles(files.filter(file => file.name !== f.name))}>
        <RemoveIcon width={20} height={20}/>
      </TouchableOpacity>
    </View>
  }
  
  return (
    <>
    
    <Formik
      innerRef={formikRef}
      enableReinitialize={true}
      initialValues={
        {
          fullName: userInfo.name,
          email: '',
          userPhone: userInfo.phone,
          details: '',
          mainConcern: '',
          subConcern: ''
        }
      }
      validationSchema={CustomerSupportSchema}
      onSubmit={async (values) => {
        Keyboard.dismiss();
        setIsLoadingRequest(true);
        const data = new FormData();
        data.append('email', values.email);
        data.append('name', values.fullName);
        data.append('phone', values.userPhone);
        data.append('message', values.details);
        data.append('type', `${subjectSelections.find(s => s.value === selectedSubject)?.title}, ${categorySelections.find(s => s.subjectId === selectedSubject)?.options.find((opt) => opt.value === selectedCategory)?.title}}`);
        data.append('attachment', files);
        try {
          const response = await CustomerServices.submitRequest(data);
          console.log('formik -> response', response);
          if(response.data) {
            onRequestSuccess && onRequestSuccess();
          }
        } catch(error) {
          console.log('error', error);
        } finally {
          setIsLoadingRequest(false);
        }
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
                {i18n.t('customer_support.fullName')}
              </Text>
              <InputField
                name="fullName"
                placeholder={
                  i18n.t("customer_support.lbl_enter_full_name")
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
                  i18n.t("customer_support.lbl_enter_email")
                }
                maxLength={100}
                style={inputStyles}
              />
                <Text style={styles.labelTextStyle}>{
                  i18n.t("customer_support.lbl_mobile_number")}</Text>
                <InputPhoneNumber
                  dialCode={dialCode}
                  onPressDialCode={() => setIsShowCountryPicker(true)}
                  name="userPhone"
                  returnKeyType="done"
                  placeholder={
                    i18n.t("customer_support.lbl_mobile_number")}
                  autoCapitalize="none"
                  style={phoneNumberInputStyles}
                  withDialCode={true}
                />

              <Text style={styles.labelTextStyle}>
                {'Main concern'}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>  {
                  setOpenSubjectModal(true);
                  formikRef.current?.setFieldTouched('mainConcern', true, true);
                }}
              >
                <InputField
                  name="mainConcern"
                  value={subjectSelections.find(s => s.value === selectedSubject)?.title}
                  placeholder={
                    i18n.t("customer_support.lbl_select_subject")
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
                   {i18n.t("customer_support.lbl_concern")}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => { 
                    setOpenCategoryModal(true);
                    formikRef.current?.setFieldTouched('subConcern', true, true);
                  }}
                >
                  <InputField
                    name="subConcern"
                    placeholder={
                    
                   i18n.t("customer_support.lbl_select_category")
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
              </>
              )}
              <Text style={styles.labelTextStyle}>{i18n.t("customer_support.lbl_how_to_help")}</Text>
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
              <Text style={styles.countDetailsLabel}>{`${(formikRef.current && formikRef.current.values) ? formikRef.current.values['details'].length: 0} /500`}</Text>

              <Text style={styles.subTitle}>{i18n.t("customer_support.lbl_add_attachments")}</Text>
              <Text style={{marginTop: 10}}>{i18n.t("customer_support.lbl_attachment_limit")}</Text>
              
              <View style={{marginTop: 25}}>
               <Button label={i18n.t("customer_support.lbl_add_attachments_or_photo")} bgColor={'white'} style={{
                primaryLabelStyle: {
                  color: colors.primaryButtonColor,
                },
                primaryContainerStyle: {
                  borderColor: colors.primaryButtonColor,
                  borderWidth: 1
                }
               }} onPress={() => setIsShowSelectAttachmentFilesPopup(true)} />
              </View>

              {files.map((f) => renderRowFile(f))}
              <Text style={styles.labelTextStyle}>{i18n.t("customer_support.lbl_captcha")}</Text>
              <View style={{marginTop: 8}}>
              <TouchableOpacity>
                <CheckBox title={i18n.t("customer_support.lbl_not_robot")} style={{selectedBoxStyle: {backgroundColor: colors.primaryButtonColor}, unSelectedBoxStyle: {borderColor: colors.primaryButtonColor, borderWidth: 2}}} isSelected={isVerifiedCaptcha} onChanged={() => {
                  if(!isVerifiedCaptcha && recaptcha.current) {
                    recaptcha.current.open();
                  }
                }} />
              </TouchableOpacity>
              </View>
              <View  style={{marginTop: 70, marginBottom: 20}}>
              <Button isLoading={isLoadingRequest} disabled={!isValid || !isVerifiedCaptcha} disableColor={colors.secondaryButtonColor} label={i18n.t("customer_support.lbl_submit")} onPress={submitForm}/>

              </View>
             
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
                    <Button label="CANCEL" onPress={handleClosePress} />
                  </View>
                }
              />
              <ImageDocumentPicker 
              style={{
                buttonContainerStyle: {
                  paddingHorizontal: 15,
                  paddingVertical: 15
                }
              }}
              isVisible={isShowSelectAttachmentFilesPopup}
              onClose={() => {
                setIsShowSelectAttachmentFilesPopup(false);
              }} onUploadFile={(file) => {
                setFiles([...files, file])
                setIsShowSelectAttachmentFilesPopup(false);
              } }
              onUploadImage={(img) => {
                const sourceUrlSplit = img.sourceURL?.split('/');
                if(sourceUrlSplit) {
                  setFiles([...files, {
                    ...img,
                    name: sourceUrlSplit[sourceUrlSplit.length - 1],
                  }]);
                }
              }}
              />
              </SafeAreaView>
          )}}
    </Formik>
    <SelectSubjectModal 
                isVisible={openSubjectModal} 
                onClose={() => 
                  setOpenSubjectModal(false)
                } 
                onValueChanged={(value) => {
                  setSelectedSubject(value);
                  formikRef.current?.setFieldValue('mainConcern', value);
                  setOpenSubjectModal(false);
                }} 
              />
              <SelectCategoryModal 
                isVisible={openCategoryModal} 
                selectedSubjectId={selectedSubject}
                onClose={() => setOpenCategoryModal(false)} 
                onValueChanged={(value) => {
                  formikRef.current?.setFieldValue('subConcern', value);
                  setSelectedCategory(value);
                  setOpenCategoryModal(false);
                }} 
              />
    <CountryPicker
      isVisible={isShowCountryPicker}
      onClose={() => {
        setIsShowCountryPicker(false);
      }}
      onSelectedCountry={(code) => {
        setIsShowCountryPicker(false);
        setDialCode(code)
      }}
    />
    </>
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
    fontSize: 14,
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
  },
  subTitle: {
    fontWeight: 'bold',
    color: '#333'
  }
});

export default CustomerSupportComponent;
