import React from "react";
import { cn } from "../../utils/cn";
import { getPageTypeConfig } from "../../constants/pageTypes.constants";
import type { Tab } from "../../types/tab.types";

interface TabIconProps {
  tab: Tab;
  isActive: boolean;
  className?: string;
}

export const TabIcon: React.FC<TabIconProps> = ({
  tab,
  isActive,
  className,
}) => {
  const config = getPageTypeConfig(tab.type);
  const IconComponent = config.icon;

  return (
    <div className="flex items-center justify-center">
      <IconComponent
        className={cn(
          "size-4",
          isActive ? config.iconColor.active : config.iconColor.inactive,
          className
        )}
      />
    </div>
  );
};

interface PageTypeIconProps {
  pageTypeId: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const PageTypeIcon: React.FC<PageTypeIconProps> = ({
  pageTypeId,
  size = "md",
  className,
}) => {
  const config = getPageTypeConfig(pageTypeId);
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: "size-4",
    md: "size-8 rounded-lg",
    lg: "size-9 rounded-md",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center flex-shrink-0",
        sizeClasses[size],
        size !== "sm" && config.backgroundColor,
        className
      )}
    >
      <IconComponent className={size === "sm" ? "size-4" : "size-4"} />
    </div>
  );
};
