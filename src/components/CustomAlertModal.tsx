import React, { useEffect, useRef } from 'react';
import { View, Text, Modal, Pressable, Animated } from 'react-native';
import { CheckCircle2, AlertCircle, Info, ShieldAlert, Check } from 'lucide-react-native';

export type AlertType = 'success' | 'warning' | 'info' | 'danger' | 'error';

export interface CustomAlertModalProps {
  visible: boolean;
  type?: AlertType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onClose: () => void;
}

export default function CustomAlertModal({
  visible,
  type = 'info',
  title,
  message,
  confirmText = 'Oke, Mengerti',
  cancelText,
  onConfirm,
  onClose,
}: CustomAlertModalProps) {
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      scaleAnim.setValue(0.85);
      opacityAnim.setValue(0);
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          damping: 20,
          stiffness: 260,
          mass: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  const getTheme = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: '#5194EA',
          icon: <CheckCircle2 size={30} color="#FFFFFF" strokeWidth={2.4} />,
          btnBg: '#5194EA',
          btnActive: '#3B82F6',
        };
      case 'warning':
        return {
          bgColor: '#F59E0B',
          icon: <AlertCircle size={30} color="#FFFFFF" strokeWidth={2.4} />,
          btnBg: '#F59E0B',
          btnActive: '#D97706',
        };
      case 'danger':
      case 'error':
        return {
          bgColor: '#EF4444',
          icon: <ShieldAlert size={30} color="#FFFFFF" strokeWidth={2.4} />,
          btnBg: '#EF4444',
          btnActive: '#DC2626',
        };
      case 'info':
      default:
        return {
          bgColor: '#5194EA',
          icon: <Info size={30} color="#FFFFFF" strokeWidth={2.4} />,
          btnBg: '#5194EA',
          btnActive: '#3B82F6',
        };
    }
  };

  const theme = getTheme();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/60 items-center justify-center p-6">
        <Pressable
          className="absolute inset-0"
          onPress={onClose}
        />

        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }}
          className="w-full max-w-sm bg-white rounded-3xl p-6 items-center shadow-2xl border border-gray-100"
        >
          {/* Top Solid Icon Badge */}
          <View
            style={{ backgroundColor: theme.bgColor }}
            className="w-16 h-16 rounded-3xl items-center justify-center mb-4 shadow-md"
          >
            {theme.icon}
          </View>

          {/* Title */}
          <Text className="text-lg font-black text-gray-900 text-center mb-1.5 tracking-tight">
            {title}
          </Text>

          {/* Message */}
          <Text className="text-xs font-medium text-gray-600 text-center leading-relaxed mb-6">
            {message}
          </Text>

          {/* Action Buttons */}
          <View className="w-full flex-row gap-2.5">
            {cancelText ? (
              <>
                <Pressable
                  onPress={onClose}
                  className="flex-1 h-12 rounded-2xl bg-gray-100 items-center justify-center active:bg-gray-200"
                >
                  <Text className="text-xs font-bold text-gray-700">
                    {cancelText}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    if (onConfirm) onConfirm();
                    else onClose();
                  }}
                  style={{ backgroundColor: theme.btnBg }}
                  className="flex-1 h-12 rounded-2xl items-center justify-center shadow-xs"
                >
                  <Text className="text-xs font-bold text-white">
                    {confirmText}
                  </Text>
                </Pressable>
              </>
            ) : (
              <Pressable
                onPress={() => {
                  if (onConfirm) onConfirm();
                  else onClose();
                }}
                style={{ backgroundColor: theme.btnBg }}
                className="w-full h-12 rounded-2xl items-center justify-center shadow-xs"
              >
                <Text className="text-sm font-bold text-white">
                  {confirmText}
                </Text>
              </Pressable>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
