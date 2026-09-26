import React from 'react';
import { Pressable, Text, ActivityIndicator, ViewStyle } from 'react-native';
import { cn } from './utils';

export interface ButtonProps {
  children?: React.ReactNode;
  title?: string;
  onPress?: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'emerald';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  textClassName?: string;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export function Button({
  children,
  title,
  onPress,
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  className,
  textClassName,
  icon,
  style,
}: ButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'emerald':
        return 'bg-[#58c763] active:bg-[#48b352] text-white shadow-sm';
      case 'destructive':
        return 'bg-red-600 active:bg-red-700 text-white shadow-sm';
      case 'outline':
        return 'border border-gray-200 bg-white active:bg-gray-50 text-gray-900 shadow-sm';
      case 'secondary':
        return 'bg-gray-100 active:bg-gray-200 text-gray-900';
      case 'ghost':
        return 'bg-transparent active:bg-gray-100 text-gray-900';
      case 'link':
        return 'bg-transparent underline-offset-4 text-[#58c763]';
      case 'default':
      default:
        return 'bg-[#58c763] active:bg-[#48b352] text-white shadow-sm';
    }
  };

  const getTextVariantStyles = () => {
    switch (variant) {
      case 'outline':
      case 'secondary':
      case 'ghost':
        return 'text-gray-900 font-semibold';
      case 'link':
        return 'text-[#58c763] underline font-semibold';
      case 'destructive':
      case 'emerald':
      case 'default':
      default:
        return 'text-white font-semibold';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'h-9 px-3 rounded-lg';
      case 'lg':
        return 'h-12 px-6 rounded-xl';
      case 'icon':
        return 'h-10 w-10 rounded-lg p-0 items-center justify-center';
      case 'default':
      default:
        return 'h-11 px-4 rounded-xl';
    }
  };

  const getTextSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-xs';
      case 'lg':
        return 'text-base';
      case 'default':
      default:
        return 'text-sm';
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          opacity: disabled ? 0.5 : pressed ? 0.92 : 1,
          transform: pressed && !disabled ? [{ scale: 0.98 }] : [{ scale: 1 }],
        },
        style,
      ]}
      className={cn(
        'flex-row items-center justify-center transition-all',
        getVariantStyles(),
        getSizeStyles(),
        className
      )}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'secondary' || variant === 'ghost' ? '#111827' : '#FFFFFF'}
        />
      ) : (
        <>
          {icon && <React.Fragment>{icon}</React.Fragment>}
          {title ? (
            <Text
              className={cn(
                getTextVariantStyles(),
                getTextSizeStyles(),
                icon ? 'ml-2' : '',
                textClassName
              )}
            >
              {title}
            </Text>
          ) : (
            children
          )}
        </>
      )}
    </Pressable>
  );
}
