import { getCookie, hasCookie, setCookie } from "./CookieController";

const prefersColorSchemeKey = "prefers_color_scheme";

/**
 * [true] prefers-color-scheme: light
 * [false] prefers-color-scheme: dark
 * @param {boolean} theme
 */
export function switchPrefersColorScheme() {
    setCookie(prefersColorSchemeKey, getOpposite(getPrefersColorScheme()), 2419200, "/");
}

export function getPrefersColorScheme() {
    if (hasCookie(prefersColorSchemeKey)) return getCookie(prefersColorSchemeKey);
    return getGooglePrefersColorScheme();
}

function getGooglePrefersColorScheme() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? "light" : "dark";
}

function getOpposite(theme) {
    return theme === "light" ? "dark" : "light";
}