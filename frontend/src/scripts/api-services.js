import axios from 'axios';

import store from '~/reducers/store';

import { ProjectUrl } from '~/env';

const api = axios.create({
    baseURL: ProjectUrl,
});

//* 2xx ->  Success
//* 4xx ->  client side error
//* 5xx ->  server side error
//** Axios reject the response if the status code belongs to 5xx and 4xx */
//! 401 Unauthorized -> you are not login
//! 403 Forbidden    ->    you are login but not have permissions
//! 400 Bad Request  -> error from client side check your arguments in body
//! 404 Not Found    -> endpoint does not exist
//! 500 Internal Server Error  -> error from the server side

api.interceptors.request.use(
    async (config) => {
        let token = store.getState().auth_store.token;
        //console.log("Token", token);
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    },

    (error) => {
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
                console.log(error.response.data);
                // if (error.response.status === 401) {
                //     store.getState().auth.email &&
                //         store.dispatch(userForceSignOut());
                //     return;
                // }
                return reject(error.response.data);
            });
        api.get;
    });
    return result;
};

export const getApi = async (path, data = {}) => {
    var result = await new Promise((resolve, reject) => {
        api.get(path, data)
            .then((response) => resolve(response.data))
            .catch((error) => {
                // if (error.response.status === 401) {
                //     store.getState().auth.email &&
                //         store.dispatch(userForceSignOut());
                //     return;
                // }

                return reject(error.response.data);
            });
        api.get;
    });
    return result;
};
