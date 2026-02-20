import React from 'react';
import { Modal as RNModal, Pressable, Text, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { createStyles } from './Modal.styles';

type Props = {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'danger';
  showCancel?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function Modal({
  visible,
  title,
  message,
  confirmText = 'OK',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  showCancel = false,
  onConfirm,
  onCancel,
}: Props) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.actionsRow}>
            {showCancel ? (
              <Pressable style={[styles.button, styles.secondaryButton]} onPress={onCancel}>
                <Text style={styles.secondaryButtonText}>{cancelText}</Text>
              </Pressable>
            ) : null}
            <Pressable
              style={[
                styles.button,
                confirmVariant === 'danger' ? styles.dangerButton : styles.primaryButton,
              ]}
              onPress={onConfirm}
            >
              <Text style={styles.primaryButtonText}>{confirmText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </RNModal>
  );
}
