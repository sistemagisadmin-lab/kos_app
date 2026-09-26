import React, { PropsWithChildren, useState } from 'react';
import { Pressable, Text, View, ViewStyle } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
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
    <View className={cn('my-2 w-full', className)} style={style}>
      <Pressable
        onPress={() => setIsOpen((value) => !value)}
        style={({ pressed }) => [
          {
            borderWidth: 3,
            borderColor: '#000000',
            boxShadow: pressed ? '1px 1px 0px 0px #000000' : '3px 3px 0px 0px #000000',
            transform: pressed ? [{ translateX: 2 }, { translateY: 2 }] : [],
          },
        ]}
        className="flex-row items-center justify-between bg-white px-4 py-3"
      >
        <Text className="text-base font-black uppercase text-black">{title}</Text>
        <View
          style={{
            transform: [{ rotate: isOpen ? '90deg' : '0deg' }],
          }}
        >
          <ChevronRight size={20} color="#000000" strokeWidth={3} />
        </View>
      </Pressable>

      {isOpen && (
        <Animated.View
          entering={FadeIn.duration(200)}
          style={{
            borderLeftWidth: 3,
            borderRightWidth: 3,
            borderBottomWidth: 3,
            borderColor: '#000000',
            backgroundColor: '#F0F0F3',
          }}
          className={cn('p-4', contentClassName)}
        >
          {children}
        </Animated.View>
      )}
    </View>
  );
}
