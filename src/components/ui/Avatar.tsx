import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import { cn } from './utils';

export interface AvatarProps {
  sourceUrl?: string;
  source?: ImageSourcePropType;
  fallbackText?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({
  sourceUrl,
  source,
  fallbackText = 'U',
  size = 'md',
  className,
}: AvatarProps) {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8';
      case 'lg':
        return 'w-14 h-14';
      case 'xl':
        return 'w-20 h-20';
      case 'md':
      default:
        return 'w-10 h-10';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'text-xs';
      case 'lg':
        return 'text-lg';
      case 'xl':
        return 'text-2xl';
      case 'md':
      default:
        return 'text-sm';
    }
  };

  const imageSrc = source || (sourceUrl ? { uri: sourceUrl } : undefined);

  return (
    <View
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100 items-center justify-center',
        getSizeStyles(),
        className
      )}
    >
      {imageSrc ? (
        <Image source={imageSrc} className="w-full h-full" resizeMode="cover" />
      ) : (
        <Text className={cn('font-semibold text-gray-700 uppercase', getTextSize())}>
          {fallbackText.substring(0, 2)}
        </Text>
      )}
    </View>
  );
}
