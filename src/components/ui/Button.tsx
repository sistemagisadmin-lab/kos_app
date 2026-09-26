import React from "react";
import { Pressable, Text, ActivityIndicator, ViewStyle } from "react-native";
import { cn } from "./utils";

export interface ButtonProps {
  children?: React.ReactNode;
  title?: string;
  onPress?: () => void;
  variant?: "default" | "lime" | "pink" | "cyan" | "orange" | "dark" | "outline";
  size?: "sm" | "md" | "lg";
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
  variant = "default",
  size = "md",
  disabled = false,
  loading = false,
  className,
  textClassName,
  icon,
  style,
}: ButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "lime":
        return "bg-[#A6FA37]";
      case "pink":
        return "bg-[#FF66C4]";
      case "cyan":
        return "bg-[#00F0FF]";
      case "orange":
        return "bg-[#FF914D]";
      case "dark":
        return "bg-black";
      case "outline":
        return "bg-white";
      case "default":
      default:
        return "bg-[#FFDE59]";
    }
  };

  const getTextVariantStyles = () => {
    if (variant === "dark") return "text-white";
    return "text-black font-extrabold";
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1.5 min-h-[36px]";
      case "lg":
        return "px-6 py-4 min-h-[56px]";
      case "md":
      default:
        return "px-4 py-3 min-h-[46px]";
    }
  };

  const getTextSizeStyles = () => {
    switch (size) {
      case "sm":
        return "text-xs font-black uppercase tracking-wider";
      case "lg":
        return "text-lg font-black uppercase tracking-wider";
      case "md":
      default:
        return "text-base font-black uppercase tracking-wider";
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          borderWidth: 3,
          borderColor: "#000000",
          boxShadow: pressed ? "1px 1px 0px 0px #000000" : "4px 4px 0px 0px #000000",
          transform: pressed ? [{ translateX: 3 }, { translateY: 3 }] : [],
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      className={cn(
        "flex-row items-center justify-center rounded-none border-black",
        getVariantStyles(),
        getSizeStyles(),
        className
      )}
    >
      {loading ? (
        <ActivityIndicator color={variant === "dark" ? "#FFFFFF" : "#000000"} />
      ) : (
        <>
          {icon && <React.Fragment>{icon}</React.Fragment>}
          {title ? (
            <Text className={cn(getTextVariantStyles(), getTextSizeStyles(), icon ? "ml-2" : "", textClassName)}>
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
