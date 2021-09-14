import React, { useEffect, createContext, useState } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';
import useEventListener from '@use-it/event-listener';
import classnames from 'classnames';

/**
 * Sets the document title to the `title` prop passed in.
 */
var useSetTitle = (function (title) {
    useEffect(function () {
        document.title = title;
    }, [title]);
});

var buildPath = function (index) {
    return "/" + (index === 0 ? "" : index);
};
var buildRoutes = function (components) {
    return components.map(function (component, index) {
        var path = buildPath(index);
        // @ts-ignore
        return React.createElement(Route, { key: path, path: path, component: function () { return component; }, exact: true });
    });
};
var configureRouter = function (history, components) { return (React.createElement(Router, { history: history },
    React.createElement(Switch, null, buildRoutes(components)))); };

/**
 * Sets the hash based on the slide number.
 */
var useSetHistory = (function (history, slide) {
    useEffect(function () {
        history.push(buildPath(slide));
    }, [history, slide]);
});

// Keycode mappings.
var SPACE = 32;
var ENTER = 13;
var ARROW_LEFT = 37;
var ARROW_RIGHT = 39;
var ARROW_UP = 38;
var ARROW_DOWN = 40;
var goForwardsKeys = [SPACE, ENTER, ARROW_RIGHT, ARROW_DOWN];
var goBackwardsKeys = [ARROW_LEFT, ARROW_UP];
var useKeyDown = (function (forwards, backwards) {
    useEventListener("keydown", function (event) {
        var keyCode = event.keyCode;
        if (goForwardsKeys.includes(keyCode))
            forwards();
        if (goBackwardsKeys.includes(keyCode))
            backwards();
    });
});

var useClick = (function (forwards) {
    useEventListener("onclick", function (event) {
        console.log("click");
        forwards();
    });
});

var ThemeContext = createContext({});
var ThemeProvider = ThemeContext.Provider;
var ThemeConsumer = ThemeContext.Consumer;

var ProgressBar = (function (_a) {
    var progress = _a.progress;
    var safeProgress = progress > 100 ? 100 : progress;
    return (React.createElement(ThemeConsumer, null, function (theme) { return (React.createElement("div", { style: { width: safeProgress + "%" }, className: theme['progress-bar'] })); }));
});

var Navigation = (function (_a) {
    var forwards = _a.forwards, backwards = _a.backwards;
    return (React.createElement(ThemeConsumer, null, function (theme) { return (React.createElement("div", { className: theme.navigation },
        React.createElement("button", { onClick: backwards, className: theme['left-arrow'] }, '<'),
        React.createElement("button", { onClick: forwards, className: theme['right-arrow'] }, '>'))); }));
});

var calculateProgress = function (activeSlide, totalSlides) { return ((activeSlide + 1) / totalSlides.length) * 100; };

var history = createBrowserHistory();
var SlideDeck = function (_a) {
    var title = _a.title, theme = _a.theme, slides = _a.slides, showNavigation = _a.showNavigation;
    var currentSlide = history.location.pathname.replace("/", "") || 0;
    var _b = useState(Number(currentSlide)), slide = _b[0], setSlide = _b[1];
    var forwards = function () {
        var nextSlide = slide + 1;
        if (nextSlide < slides.length)
            setSlide(nextSlide);
    };
    var backwards = function () {
        var previousSlide = slide - 1;
        if (previousSlide > -1)
            setSlide(previousSlide);
    };
    useSetTitle(title);
    useSetHistory(history, slide);
    useKeyDown(forwards, backwards);
    useClick(forwards);
    var progress = calculateProgress(slide, slides);
    return (React.createElement("div", { className: theme["slide-deck"] },
        React.createElement(ThemeProvider, { value: theme },
            showNavigation && (React.createElement(Navigation, { forwards: forwards, backwards: backwards })),
            configureRouter(history, slides),
            React.createElement(ProgressBar, { progress: progress }))));
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var TitleSlide = (function (_a) {
    var title = _a.title, subtitle = _a.subtitle, children = _a.children, secondary = _a.secondary, tertiary = _a.tertiary, backgroundImage = _a.backgroundImage, backgroundSize = _a.backgroundSize;
    return (React.createElement(ThemeConsumer, null, function (theme) {
        var className = theme["title-slide"];
        if (secondary)
            className = theme["title-slide-secondary"];
        if (tertiary)
            className = theme["title-slide-tertiary"];
        var style = {};
        if (backgroundImage) {
            style = __assign(__assign({}, style), { backgroundImage: "url(" + backgroundImage + ")" });
        }
        if (backgroundSize === "FitToSlide") {
            style = __assign(__assign({}, style), { backgroundSize: "cover" });
        }
        return (React.createElement("div", { className: className, style: style },
            children,
            React.createElement("h1", null, title),
            subtitle && React.createElement("h2", null, subtitle)));
    }));
});

var Slide = (function (_a) {
    var title = _a.title, subtext = _a.subtext, children = _a.children, _b = _a.animate, animate = _b === void 0 ? true : _b;
    return (React.createElement(ThemeConsumer, null, function (theme) {
        var _a;
        return (React.createElement("div", { className: classnames(theme.slide, (_a = {}, _a[theme.animate] = animate, _a)) },
            title && React.createElement("h1", { "data-testid": "title" }, title),
            subtext && (React.createElement("div", { className: theme.subtext, "data-testid": "subtext" }, subtext)),
            children));
    }));
});

var index = { SlideDeck: SlideDeck, TitleSlide: TitleSlide, Slide: Slide };

export default index;
