import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Pressable, SafeAreaView,Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';

import { RootStackParamList } from '../../navigation/props';
import { ROUTES } from '../../constants/routes';
import { buildScreenHeader } from '../../hooks/useScreenHeader';
import { applicationSchema } from '../../validation/applicationSchema';
import { ApplicationFormValues } from '../../models/Application';
import { useTheme } from '../../context/ThemeContext';

import FormField from '../../components/Forms/FormField';
import Modal from '../../components/Modal/Modal';
import { createStyles } from './ApplicationForm.styles';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.APPLICATION_FORM>;

const initialValues: ApplicationFormValues = {
  name: '',
  email: '',
  contactNumber: '',
  reason: '',
};

export default function ApplyScreen({ navigation, route }: Props) {
  const { job } = route.params;
  const { colors, mode, toggleMode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const [successVisible, setSuccessVisible] = useState(false);
  const [pendingLeaveVisible, setPendingLeaveVisible] = useState(false);
  const [pendingResetCallback, setPendingResetCallback] = useState<(() => void) | null>(null);
  const hasInputRef = useRef(false);
  const resetFormRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      if (!hasInputRef.current) return;
      // Prevent default and ask confirmation.
      e.preventDefault();
      setPendingResetCallback(() => () => {
        if (resetFormRef.current) resetFormRef.current();
        navigation.dispatch(e.data.action);
      });
      setPendingLeaveVisible(true);
    });
    return unsubscribe;
  }, [navigation]);

  useLayoutEffect(() => {
    const headerOptions = buildScreenHeader({
      title: 'Apply for Job',
      colors,
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color={colors.text} />
        </Pressable>
      ),
      headerRight: () => (
        <Pressable onPress={toggleMode} style={styles.themeButton}>
          <Icon name={mode === 'light' ? 'moon' : 'sun'} size={24} color={colors.text} />
        </Pressable>
      ),
    });
    navigation.setOptions(headerOptions);
  }, [navigation, colors, toggleMode, mode, styles]);

  const showSuccess = (resetForm: () => void) => {
    setPendingResetCallback(() => resetForm);
    setSuccessVisible(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Applying for:</Text>
          <Text style={styles.subtitle}>
            {job.title} - {job.company}
          </Text>

          <View style={styles.formContainer}>
            <Formik
              initialValues={initialValues}
              validationSchema={applicationSchema}
              validateOnChange
              validateOnBlur
              onSubmit={(_values, { resetForm }) => {
                showSuccess(resetForm);
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, isSubmitting, resetForm, setFieldTouched }) => {
                const hasInput = Object.values(values).some((v) => v.trim() !== '');
                hasInputRef.current = hasInput;
                resetFormRef.current = resetForm;
                const handleLiveChange =
                  (field: keyof ApplicationFormValues) =>
                  (text: string) => {
                    handleChange(field)(text);
                    if (!touched[field]) setFieldTouched(field, true, false);
                  };

                return (
                  <>
                    {/* Detect if user tries to leave with unsaved inputs by tapping back button in header */}
                    <Pressable
                      onPress={() => {
                        if (hasInputRef.current) {
                          setPendingResetCallback(() => () => {
                            resetForm();
                            navigation.goBack();
                          });
                          setPendingLeaveVisible(true);
                        } else {
                          resetForm();
                          navigation.goBack();
                        }
                      }}
                      style={{ marginBottom: 12 }}
                    >
                    </Pressable>

                    <FormField
                      value={values.name}
                      onChangeText={handleLiveChange('name')}
                      onBlur={handleBlur('name')}
                      placeholder="Full Name"
                      error={errors.name}
                      touched={touched.name}
                    />

                    <FormField
                      value={values.email}
                      onChangeText={handleLiveChange('email')}
                      onBlur={handleBlur('email')}
                      placeholder="Email"
                      error={errors.email}
                      touched={touched.email}
                    />

                    <FormField
                      value={values.contactNumber}
                      onChangeText={handleLiveChange('contactNumber')}
                      onBlur={handleBlur('contactNumber')}
                      placeholder="Contact Number (09xxxxxxxxx or +639xxxxxxxxx)"
                      error={errors.contactNumber}
                      touched={touched.contactNumber}
                    />

                    <FormField
                      value={values.reason}
                      onChangeText={handleLiveChange('reason')}
                      onBlur={handleBlur('reason')}
                      placeholder="Why should we hire you?"
                      error={errors.reason}
                      touched={touched.reason}
                      multiline
                    />

                    <Pressable
                      onPress={() => handleSubmit()}
                      disabled={!isValid || isSubmitting}
                      style={[styles.submitButton, (!isValid || isSubmitting) && styles.submitButtonDisabled]}
                    >
                      <Text style={styles.submitButtonText}>Confirm Application</Text>
                    </Pressable>

                    <Modal
                      visible={successVisible}
                      title="Application Submitted"
                      message={`You applied for: ${job.title} at ${job.company}`}
                      confirmText="Okay"
                      onConfirm={() => {
                        setSuccessVisible(false);
                        if (pendingResetCallback) {
                          pendingResetCallback();
                          setPendingResetCallback(null);
                        }
                        navigation.navigate(ROUTES.JOB_FINDER);
                      }}
                      onCancel={() => setSuccessVisible(false)}
                    />

                    <Modal
                      visible={pendingLeaveVisible}
                      title="Discard Application?"
                      message="You have unsaved inputs. Discard and go back?"
                      confirmText="Discard"
                      cancelText="Continue Editing"
                      showCancel
                      confirmVariant="danger"
                      onConfirm={() => {
                        setPendingLeaveVisible(false);
                        if (pendingResetCallback) pendingResetCallback();
                        setPendingResetCallback(null);
                      }}
                      onCancel={() => setPendingLeaveVisible(false)}
                    />
                  </>
                );
              }}
            </Formik>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
