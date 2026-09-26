import React from "react";
import { View, Text, ViewStyle } from "react-native";
import { cn } from "./utils";

export interface BadgeProps {
  children?: React.ReactNode;
  label?: string;
  variant?: "yellow" | "lime" | "pink" | "cyan" | "orange" | "dark" | "outline";
  className?: string;
  style?: ViewStyle;
}

export function Badge({ children, label, variant = "yellow", className, style }: BadgeProps) {
  const getVariantBg = () => {
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
      case "yellow":
      default:
        return "bg-[#FFDE59]";
    }
  };

  const getTextColor = () => {
    if (variant === "dark") return "text-white";
    return "text-black";
  };

  return (
    <View
      style={[
        {
          borderWidth: 2,
          borderColor: "#000000",
          boxShadow: "2px 2px 0px 0px #000000",
        },
        style,
      ]}
      className={cn("px-2.5 py-1 flex-row items-center self-start", getVariantBg(), className)}
    >
      <Text className={cn("text-xs font-black uppercase tracking-wider", getTextColor())}>
        {label || children}
      </Text>
    </View>
  );
}
