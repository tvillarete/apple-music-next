import type { ComponentType } from "react";

type SvgProps = {
  width?: number;
  height?: number;
  viewBox?: string;
  preserveAspectRatio?: string;
  color?: string;
};

export interface IconProps extends SvgProps {}
export type IconType = ComponentType<IconProps>;
