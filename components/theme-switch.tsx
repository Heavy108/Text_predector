"use client";

import { FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, Switch } from "@nextui-org/react";  // Import Switch
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const onChange = (isChecked: boolean) => {
    setTheme(isChecked ? "light" : "dark");
  };

  return (
    <Switch
      isSelected={theme === "light" || isSSR}  // Use the current theme state to decide initial state
      size="lg"
      color="primary"  // You can change the color of the switch here
      onChange={(e) => onChange(e.target.checked)}  // Handle switch toggle
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunFilledIcon className={className} />
        ) : (
          <MoonFilledIcon className={className} />
        )
      }
      className={clsx(
        "transition-opacity hover:opacity-80 cursor-pointer",
        className,
        classNames?.base
      )}
    >
      Theme
    </Switch>
  );
};
