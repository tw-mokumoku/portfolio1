function getCookiesJSON() {
    let cookies = [];
    document.cookie.split('; ').map((value) => value.split('=')).map(([key, value]) => cookies[key] = value);
    return cookies;
}
export function setCookie(key, value, max_age, path) {
    document.cookie = `${key}=${value};max-age=${max_age};path=${path}`;
}
export function getCookie(key) {
    return getCookiesJSON()[key];
}

export function hasCookie(key) {
    return key in getCookiesJSON();
}