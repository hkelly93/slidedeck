import React from "react";
declare type BackgroundSizes = "FitToSlide";
declare type Props = {
    title: React.Component | string;
    subtitle?: React.Component | string;
    children?: any;
    secondary?: boolean;
    tertiary?: boolean;
    backgroundImage?: string;
    backgroundSize?: BackgroundSizes;
};
declare const _default: ({ title, subtitle, children, secondary, tertiary, backgroundImage, backgroundSize }: Props) => JSX.Element;
export default _default;
