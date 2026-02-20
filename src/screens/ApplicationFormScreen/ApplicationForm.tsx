import React from 'react';
import { Alert, Pressable, SafeAreaView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';

import { RootStackParamList } from '../../navigation/props';
import { ROUTES } from '../../constants/routes';
import { applicationSchema } from '../../validation/applicationSchema';
import { ApplicationFormValues } from '../../models/Application';
import { useTheme } from '../../context/ThemeContext';

import FormField from '../../components/Forms/FormField';
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

  const showSuccess = (resetForm: () => void) => {
    Alert.alert(
      'Application Submitted ✅',
      `You applied for: ${job.title} at ${job.company}`,
      [
        {
          text: 'Okay',
          onPress: () => {
            resetForm();
            if (fromSaved) {
              // Requirement: if opened from saved jobs, OK redirects to Job Finder
              navigation.navigate(ROUTES.JOB_FINDER);
            } else {
              navigation.goBack();
            }
          },
        },
      ]
    );
  };

  return (
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
              // show feedback + clear form.
              showSuccess(() => resetForm());
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, isSubmitting }) => (
              <>
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
              </>
            )}
          </Formik>
        </View>
      </View>
    </SafeAreaView>
  );
}
