/// <reference types="react" />
import Slide from "../slide/Slide";
declare type Props = {
    title: string;
    theme: any;
    slides: Array<typeof Slide>;
    showNavigation: boolean;
};
export declare const SlideDeck: ({ title, theme, slides, showNavigation }: Props) => JSX.Element;
export {};
