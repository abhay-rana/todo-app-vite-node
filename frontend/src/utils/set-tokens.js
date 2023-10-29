export function setToken(access_token, refresh_token) {
    window.localStorage.setItem('token', access_token);
    window.localStorage.setItem('refresh_token', refresh_token);
}

export function removeToken() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('refresh_token');
}
