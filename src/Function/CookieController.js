function getCookiesJSON() {
    let cookies = [];
    document.cookie.split('; ').map((value) => value.split('=')).map(([key, value]) => cookies[key] = value);
    return cookies;
}
export function setCookie(key, value, max_age) {
    document.cookie = `${key}=${value};max-age=${max_age};path=/`;
}
export function getCookie(key) {
    return getCookiesJSON()[key];
}
export function hasCookie(key) {
    return key in getCookiesJSON();
}
export function deleteCookie(key) {
    document.cookie = `${key}=; max-age=0;path=/`;
}