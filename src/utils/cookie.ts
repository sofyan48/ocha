const getCookie = (key: string): string | null => {
    const allCookies = document.cookie;
    const cookiePairs = allCookies.split('; ');
    const cookie = cookiePairs.find(cookie => cookie.startsWith(`${key}=`));
    return cookie ? cookie.split('=')[1] : null;
}

const setCookie = (key:string, value: any) => {
    document.cookie = `${key}=${value};`;
}

export default {
    getCookie,
    setCookie
}