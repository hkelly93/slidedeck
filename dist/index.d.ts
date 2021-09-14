/// <reference types="react" />
declare const _default: {
    SlideDeck: ({ title, theme, slides, showNavigation }: {
        title: string;
        theme: any;
        slides: (({ title, subtext, children, animate }: {
            title?: string | undefined;
            subtext?: string | import("react").Component<{}, {}, any> | undefined;
            children: string | import("react").Component<{}, {}, any>;
            animate?: boolean | undefined;
        }) => JSX.Element)[];
        showNavigation: boolean;
    }) => JSX.Element;
    TitleSlide: ({ title, subtitle, children, secondary, tertiary, backgroundImage, backgroundSize }: {
        title: string | import("react").Component<{}, {}, any>;
        subtitle?: string | import("react").Component<{}, {}, any> | undefined;
        children?: any;
        secondary?: boolean | undefined;
        tertiary?: boolean | undefined;
        backgroundImage?: string | undefined;
        backgroundSize?: "FitToSlide" | undefined;
    }) => JSX.Element;
    Slide: ({ title, subtext, children, animate }: {
        title?: string | undefined;
        subtext?: string | import("react").Component<{}, {}, any> | undefined;
        children: string | import("react").Component<{}, {}, any>;
        animate?: boolean | undefined;
    }) => JSX.Element;
};
export default _default;
