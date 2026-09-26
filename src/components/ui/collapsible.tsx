import React, { PropsWithChildren, useState } from 'react';
import { Pressable, Text, View, ViewStyle } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { cn } from './utils';

export interface CollapsibleProps extends PropsWithChildren {
  title: string;
  className?: string;
  contentClassName?: string;
  style?: ViewStyle;
  defaultOpen?: boolean;
}

export function Collapsible({
  children,
  title,
  className,
  contentClassName,
  style,
  defaultOpen = false,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <View className={cn('w-full border-b border-gray-200 py-3', className)} style={style}>
      <Pressable
        onPress={() => setIsOpen((value) => !value)}
        className="flex-row items-center justify-between py-1"
      >
        <Text className="text-sm font-medium text-gray-900">{title}</Text>
        <View style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}>
          <ChevronDown size={16} color="#6B7280" />
        </View>
      </Pressable>

      {isOpen && (
        <Animated.View
          entering={FadeIn.duration(150)}
          exiting={FadeOut.duration(100)}
          className={cn('pt-2 pb-1 text-sm text-gray-600', contentClassName)}
        >
          {children}
        </Animated.View>
      )}
    </View>
  );
}
