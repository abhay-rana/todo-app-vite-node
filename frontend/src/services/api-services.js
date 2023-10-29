import axios from 'axios';

import { Logout } from '~/redux/actions/auth-actions';
import store from '~/redux/store';

import { ProjectUrl } from '~/env';

const handleLogout = () => {
    const token = window.localStorage.getItem('token');
    if (token) {
        store.dispatch(Logout());
        // Clear any other relevant data upon logout
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
    }
};

const handleApiError = (error) => {
    if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
    ) {
        handleLogout();
        return Promise.reject(error.response.data);
    }
    console.log('error', error.response.data);
    // Handle other errors as needed
    return Promise.reject(error.response.data);
};

const api = axios.create({
    baseURL: ProjectUrl,
});

api.interceptors.request.use(
    async (config) => {
        const token = window.localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log('error', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async function (error) {
        const originalRequest = error.config;

        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refresh_token = localStorage.getItem('refresh_token');
                const response = await axios.get(`${ProjectUrl}/refresh`, {
                    headers: { Authorization: `Bearer ${refresh_token}` },
                });

                const { token } = response.data;
                localStorage.setItem('token', token);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return api(originalRequest);
            } catch (error) {
                handleLogout();
            }
        } else if (
            error.response.status === 401 ||
            error.response.status === 403
        ) {
            handleLogout();
        }

        return Promise.reject(error);
    }
);

export const postApi = async (
    path,
    data = {},
    headers = { Accept: 'application/json' }
) => {
    try {
        const response = await api.post(path, data, { headers });
        return response;
    } catch (error) {
        return handleApiError(error);
    }
};

export const getApi = async (path) => {
    try {
        const response = await api.get(path);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};
