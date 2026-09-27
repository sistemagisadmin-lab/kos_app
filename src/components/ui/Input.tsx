import React, { useState } from 'react';
import { View, TextInput, Text, TextInputProps, ViewStyle } from 'react-native';
import { cn } from './utils';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  containerClassName,
  containerStyle,
  className,
  icon,
  rightIcon,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={cn('w-full my-1.5', containerClassName)} style={containerStyle}>
      {label && (
        <Text className="text-sm font-medium text-gray-700 mb-1.5">{label}</Text>
      )}
      <View
        style={isFocused ? { borderColor: '#5194EA' } : undefined}
        className={cn(
          'flex-row items-center h-12 w-full rounded-xl border bg-white px-3.5 transition-all shadow-sm',
          isFocused ? 'border-[#5194EA]' : 'border-gray-200',
          error ? 'border-red-500' : ''
        )}
      >
        {icon && <View className="mr-2.5">{icon}</View>}
        <TextInput
          placeholderTextColor="#9CA3AF"
          onFocus={(e) => {
            setIsFocused(true);
            onFocus && onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          className={cn('flex-1 text-sm text-gray-900 font-normal p-0 h-full', className)}
          {...props}
        />
        {rightIcon && <View className="ml-2.5">{rightIcon}</View>}
      </View>
      {error && <Text className="text-xs text-red-500 mt-1 font-medium">{error}</Text>}
    </View>
  );
}
