import axios from 'axios';

import { Logout } from '~/redux/actions/auth-actions';
import store from '~/redux/store';

import { ProjectUrl } from '~/env';

const api = axios.create({
    baseURL: ProjectUrl,
});

//* 2xx ->  Success
//* 4xx ->  client side error
//* 5xx ->  server side error
//** Axios reject the response if the status code belongs to 5xx and 4xx */
//! 401 Unauthorized -> you are not login
//! 403 Forbidden    ->    you are login but not have permissions, Access Token expired
//! 400 Bad Request  -> error from client side check your arguments in body
//! 404 Not Found    -> endpoint does not exist
//! 500 Internal Server Error  -> error from the server side

api.interceptors.request.use(
    async (config) => {
        let token = window.localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
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
        console.log('error response', error.response.status);
        // If the error status is 403 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
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
                return axios(originalRequest);
            } catch (error) {
                // Handle refresh token error or redirect to login
            }
        } else if (error.response.status === 401) {
            let token = window.localStorage.getItem('token');
            if (token) {
                store.dispatch(Logout());
            }
        }

        return Promise.reject(error);
    }
);

export const postApi = async (
    path,
    data = {},
    headers = { Accept: 'application/json' }
) => {
    var result = await new Promise((resolve, reject) => {
        api.post(path, data, {
            headers: headers,
        })
            .then((response) => {
                console.log(response);
                return resolve(response);
            })
            .catch((error) => {
                //! NOTE - use "error.response.data` (not "error")
                console.log('hey post api error');
                console.log(error.response?.data);
                // if (error.response.status === 401) {
                //     store.getState().auth.email &&
                //         store.dispatch(userForceSignOut());
                //     return;
                // }
                return reject(error.response?.data);
            });
    });
    return result;
};

export const getApi = async (path) => {
    var result = await new Promise((resolve, reject) => {
        api.get(path)
            .then((response) => resolve(response.data))
            .catch((error) => {
                console.log('error', error);
                // if (error.response.status === 401) {
                //     store.getState().auth.email &&
                //         store.dispatch(userForceSignOut());
                //     return;
                // }

                return reject(error.response.data);
            });
    });
    return result;
};
