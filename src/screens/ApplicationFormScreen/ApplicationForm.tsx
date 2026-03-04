import React, { useState, useRef, useEffect } from 'react';
import { Pressable, SafeAreaView, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';

import { RootStackParamList } from '../../navigation/props';
import { ROUTES } from '../../constants/routes';
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
  const { job, fromSaved } = route.params;
  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const [successVisible, setSuccessVisible] = useState(false);
  const [pendingLeaveVisible, setPendingLeaveVisible] = useState(false);
  const [pendingResetCallback, setPendingResetCallback] = useState<(() => void) | null>(null);
  const hasInputRef = useRef(false);
  const resetFormRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      if (!hasInputRef.current) return;
      // Prevent default and ask confirmation
      e.preventDefault();
      setPendingResetCallback(() => () => {
        if (resetFormRef.current) resetFormRef.current();
        navigation.dispatch(e.data.action);
      });
      setPendingLeaveVisible(true);
    });
    return unsubscribe;
  }, [navigation]);

  const showSuccess = (resetForm: () => void) => {
    setPendingResetCallback(() => resetForm);
    setSuccessVisible(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
        <Text style={styles.title}>
          Applying for:
        </Text>
        <Text style={styles.subtitle}>
          {job.title} • {job.company}
        </Text>

        <View style={styles.formContainer}>
          <Formik
            initialValues={initialValues}
            validationSchema={applicationSchema}
            onSubmit={(values, { resetForm }) => {
                showSuccess(resetForm);
              }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, isSubmitting, resetForm }) => (
              <>
                {/* keep refs up-to-date for beforeRemove handling */}
                {(() => {
                  const hasInput = Object.values(values).some((v) => (v as string).trim() !== '');
                  hasInputRef.current = hasInput;
                  resetFormRef.current = resetForm;
                })()}

                <Pressable onPress={() => {
                  // cancel/back: if any input present, confirm
                  const hasInput = hasInputRef.current;
                  if (hasInput) {
                    setPendingResetCallback(() => () => { resetForm(); navigation.goBack(); });
                    setPendingLeaveVisible(true);
                  } else {
                    resetForm();
                    navigation.goBack();
                  }
                }} style={{ marginBottom: 12 }}>
                  <Text style={{ color: colors.primary }}>Cancel</Text>
                </Pressable>

                <FormField
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  placeholder="Full Name"
                  error={errors.name}
                  touched={touched.name}
                />

                <FormField
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="Email"
                  error={errors.email}
                  touched={touched.email}
                />

                <FormField
                  value={values.contactNumber}
                  onChangeText={handleChange('contactNumber')}
                  onBlur={handleBlur('contactNumber')}
                  placeholder="Contact Number (09xxxxxxxxx or +639xxxxxxxxx)"
                  error={errors.contactNumber}
                  touched={touched.contactNumber}
                />

                <FormField
                  value={values.reason}
                  onChangeText={handleChange('reason')}
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
                  <Text style={styles.submitButtonText}>
                    Confirm Application
                  </Text>
                </Pressable>

                {/* Success modal */}
                <Modal
                  visible={successVisible}
                  title="Application Submitted ✅"
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

                {/* Confirm leave modal */}
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
            )}
          </Formik>
        </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
