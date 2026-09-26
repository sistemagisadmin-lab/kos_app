import React from "react";
import { View, Text, Image } from "react-native";
import { cn } from "./utils";

export interface AvatarProps {
  sourceUrl?: string;
  fallbackText?: string;
  size?: "sm" | "md" | "lg";
  bgColor?: string;
  className?: string;
}

export function Avatar({ sourceUrl, fallbackText = "U", size = "md", bgColor = "#FFDE59", className }: AvatarProps) {
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "w-8 h-8";
      case "lg":
        return "w-16 h-16";
      case "md":
      default:
        return "w-12 h-12";
    }
  };

  const getTextSize = () => {
    switch (size) {
      case "sm":
        return "text-xs";
      case "lg":
        return "text-2xl";
      case "md":
      default:
        return "text-lg";
    }
  };

  return (
    <View
      style={{
        borderWidth: 3,
        borderColor: "#000000",
        boxShadow: "2px 2px 0px 0px #000000",
        backgroundColor: bgColor,
      }}
      className={cn("items-center justify-center overflow-hidden", getSizeStyles(), className)}
    >
      {sourceUrl ? (
        <Image source={{ uri: sourceUrl }} className="w-full h-full" resizeMode="cover" />
      ) : (
        <Text className={cn("font-black text-black uppercase", getTextSize())}>
          {fallbackText.substring(0, 2)}
        </Text>
      )}
    </View>
  );
}
