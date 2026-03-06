import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Pressable, SafeAreaView, Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useHeaderHeight } from '@react-navigation/elements';
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
  const headerHeight = useHeaderHeight();
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
        <Pressable hitSlop={12} onPress={() => navigation.goBack()}>
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
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}
        >
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
            contentInsetAdjustmentBehavior="automatic"
          >
            <View style={styles.container}>
              <View style={styles.heroCard}>
                <View style={styles.heroRow}>
                  <View style={styles.heroIconBadge}>
                    <Icon name="briefcase" size={22} color={colors.primary} />
                  </View>
                  <View style={styles.heroTextBlock}>
                    <Text style={styles.heroEyebrow}>Applying For</Text>
                    <Text style={styles.heroTitle}>{job.title}</Text>
                    <Text style={styles.heroSubtitle}>{job.company}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.instruction}>
                Complete the form below and review your details before submitting.
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

                        <Text style={styles.inputLabel}>Full Name</Text>
                        <FormField
                          value={values.name}
                          onChangeText={handleLiveChange('name')}
                          onBlur={handleBlur('name')}
                          placeholder="Full Name"
                          error={errors.name}
                          touched={touched.name}
                        />

                        <Text style={styles.inputLabel}>Email Address</Text>
                        <FormField
                          value={values.email}
                          onChangeText={handleLiveChange('email')}
                          onBlur={handleBlur('email')}
                          placeholder="Email"
                          error={errors.email}
                          touched={touched.email}
                        />

                        <Text style={styles.inputLabel}>Contact Number</Text>
                        <FormField
                          value={values.contactNumber}
                          onChangeText={handleLiveChange('contactNumber')}
                          onBlur={handleBlur('contactNumber')}
                          placeholder="Contact Number (09xxxxxxxxx or +639xxxxxxxxx)"
                          error={errors.contactNumber}
                          touched={touched.contactNumber}
                        />

                        <Text style={styles.inputLabel}>Why Should We Hire You?</Text>
                        <FormField
                          value={values.reason}
                          onChangeText={handleLiveChange('reason')}
                          onBlur={handleBlur('reason')}
                          placeholder="Type Here..."
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
                          confirmText="OK"
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
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
