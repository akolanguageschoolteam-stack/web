const LANG_COOKIE_NAME = "lang_code";
// Read by middleware.ts to know which locale should be hidden from the URL.
const DEFAULT_LANG_COOKIE_NAME = "default_lang_code";
const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

const setCookie = (name: string, value: string) => {
    if (typeof document === "undefined" || !value) return;
    const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${LANG_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
};

export const setLangCookie = (langCode: string) => setCookie(LANG_COOKIE_NAME, langCode);

export const setDefaultLangCookie = (langCode: string) => setCookie(DEFAULT_LANG_COOKIE_NAME, langCode);
