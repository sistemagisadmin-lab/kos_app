import React from "react";
import { View, Text, ViewStyle } from "react-native";
import { cn } from "./utils";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  style?: ViewStyle;
}

export function Card({ children, className, accentColor, style }: CardProps) {
  return (
    <View
      style={[
        {
          borderWidth: 3,
          borderColor: "#000000",
          boxShadow: "5px 5px 0px 0px #000000",
          backgroundColor: accentColor || "#FFFFFF",
        },
        style,
      ]}
      className={cn("p-4 my-2 rounded-none", className)}
    >
      {children}
    </View>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <View className={cn("mb-3 border-b-2 border-black pb-2", className)}>{children}</View>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <Text className={cn("text-xl font-black text-black tracking-tight", className)}>{children}</Text>;
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <Text className={cn("text-xs font-bold text-gray-800 mt-1 uppercase", className)}>{children}</Text>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <View className={cn("py-2", className)}>{children}</View>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <View className={cn("mt-3 pt-2 border-t-2 border-black flex-row items-center justify-between", className)}>{children}</View>;
}
