import React, { useState } from "react";
import { View, TextInput, Text, TextInputProps, ViewStyle } from "react-native";
import { cn } from "./utils";

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
    <View className={cn("my-2 w-full", containerClassName)} style={containerStyle}>
      {label && (
        <Text className="text-xs font-black text-black uppercase tracking-wider mb-1">
          {label}
        </Text>
      )}
      <View
        style={{
          borderWidth: 3,
          borderColor: "#000000",
          boxShadow: isFocused ? "4px 4px 0px 0px #A6FA37" : "3px 3px 0px 0px #000000",
          backgroundColor: "#FFFFFF",
        }}
        className="flex-row items-center px-3 py-2.5 w-full"
      >
        {icon && <View className="mr-2">{icon}</View>}
        <TextInput
          placeholderTextColor="#737373"
          onFocus={(e) => {
            setIsFocused(true);
            onFocus && onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          className={cn("flex-1 text-base font-bold text-black p-0", className)}
          {...props}
        />
        {rightIcon && <View className="ml-2">{rightIcon}</View>}
      </View>
      {error && (
        <Text className="text-xs font-black text-red-600 uppercase mt-1">
          ⚠️ {error}
        </Text>
      )}
    </View>
  );
}
