// src/types/react-scroll.d.ts
declare module "react-scroll" {
  import * as React from "react";

  export interface LinkProps {
    activeClass?: string;
    to: string;
    spy?: boolean;
    smooth?: boolean;
    offset?: number;
    duration?: number;
    isDynamic?: boolean;
    onSetActive?: (to: string) => void;
    onSetInactive?: () => void;
    ignoreCancelEvents?: boolean;
    hashSpy?: boolean;
    children?: React.ReactNode;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    delay?: number;
    containerId?: string;
    onClick?: () => void;
  }

  export const Link: React.FC<LinkProps>;
  export const animateScroll: {
    scrollToTop(options?: object): void;
    scrollToBottom(options?: object): void;
    scrollTo(position: number, options?: object): void;
    scrollMore(distance: number, options?: object): void;
  };
}
