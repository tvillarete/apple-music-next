import { allIcons } from "components/Icon/icons";
import React, { memo, useMemo } from "react";

const sizeToDimensions: Record<IconSize, number> = {
  xxsmall: 12,
  xsmall: 16,
  small: 20,
  medium: 24,
  large: 32,
  xlarge: 40,
  xxlarge: 48,
} as const;

export type IconSize =
  | "xxsmall"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge";

export function getIconDimensionsForSize(size: IconSize) {
  return {
    height: sizeToDimensions[size],
    width: sizeToDimensions[size],
  };
}

export type IconName = string & keyof typeof allIcons;

interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: string;
  onClick?: () => void;
  className?: string;
}

const Icon = ({
  name,
  size = "xxsmall",
  onClick,
  className,
  ...iconProps
}: IconProps) => {
  // TODO: Fix the typings to work with lazy loading.
  const DesiredIcon: any = useMemo(() => allIcons[name], [name]);

  const dimensions = useMemo(() => getIconDimensionsForSize(size), [size]);

  return (
    <div className={className} onClick={onClick} {...dimensions}>
      <React.Suspense fallback={<></>}>
        <DesiredIcon {...dimensions} {...iconProps} />
      </React.Suspense>
    </div>
  );
};

export default memo(Icon);
