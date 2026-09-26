import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { cn } from './utils';

export interface BadgeProps {
  children?: React.ReactNode;
  label?: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success';
  className?: string;
  style?: ViewStyle;
}

export function Badge({
  children,
  label,
  variant = 'default',
  className,
  style,
}: BadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-100 border-transparent text-gray-900';
      case 'destructive':
        return 'bg-red-500 border-transparent text-white';
      case 'outline':
        return 'bg-transparent border border-gray-200 text-gray-900';
      case 'success':
        return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      case 'default':
      default:
        return 'bg-emerald-600 border-transparent text-white';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'secondary':
      case 'outline':
        return 'text-gray-800';
      case 'success':
        return 'text-emerald-700';
      case 'destructive':
      case 'default':
      default:
        return 'text-white';
    }
  };

  return (
    <View
      style={style}
      className={cn(
        'inline-flex flex-row items-center rounded-full border px-2.5 py-0.5 self-start',
        getVariantStyles(),
        className
      )}
    >
      <Text className={cn('text-xs font-semibold', getTextColor())}>
        {label || children}
      </Text>
    </View>
  );
}
