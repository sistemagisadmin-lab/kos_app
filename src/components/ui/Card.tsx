import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { cn } from './utils';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

export function Card({ children, className, style }: CardProps) {
  return (
    <View
      style={style}
      className={cn(
        'rounded-2xl border border-gray-100 bg-white shadow-sm p-6',
        className
      )}
    >
      {children}
    </View>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <View className={cn('flex flex-col space-y-1.5 mb-4', className)}>{children}</View>;
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Text className={cn('text-xl font-bold tracking-tight text-gray-900', className)}>
      {children}
    </Text>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <Text className={cn('text-sm text-gray-500 mt-1', className)}>{children}</Text>;
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <View className={cn('py-1', className)}>{children}</View>;
}

export function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View className={cn('flex flex-row items-center justify-between pt-4 mt-4 border-t border-gray-100', className)}>
      {children}
    </View>
  );
}
