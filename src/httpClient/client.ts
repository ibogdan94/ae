import Axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import queryString from 'query-string';
import {API_ENDPOINT} from '../contants';
import {refresh} from '../services/API';
import * as SecurityStorage from '../storage/security';
import {removeAccessToken} from '../storage/security';

interface ClientInterface extends AxiosInstance {
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
}

const client: ClientInterface = Axios.create({
  baseURL: API_ENDPOINT,
  paramsSerializer: (params) =>
    queryString.stringify(params, {arrayFormat: 'index'}),
  headers: {
    isPublic: false,
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  (request: AxiosRequestConfig): AxiosRequestConfig => {
    if (request.headers) {
      if (request.headers.isPublic) {
        delete request.headers.Authorization;
      }
      delete request.headers.isPublic;
    }

    return request;
  },
);

client.interceptors.response.use(undefined, (error: AxiosError): any => {
  if (Axios.isCancel(error)) {
    throw error;
  }

  if (error?.response?.status !== 401) {
    throw error;
  }

  if (error.response) {
    console.error(error.response.data.message || error);
  } else {
    console.error('Axios error with empty response');
  }

  return new Promise(async (res, rej) => {
    removeToken();
    await removeAccessToken();
    rej('Token expired');
  });

  // return refresh().then(({token}) => {
  //   setToken(token);
  //   SecurityStorage.saveAccessToken(token);
  //   const config = error.config;
  //   config.headers.Authorization = `Bearer ${token}`;
  //
  //   return new Promise((resolve, reject) => {
  //     Axios.request(config)
  //       .then((response) => {
  //         resolve(response);
  //       })
  //       .catch((e) => {
  //         reject(e);
  //       });
  //   });
  // });
});

export function setToken(token: string): void {
  Object.assign(client.defaults.headers, {
    Authorization: `Bearer ${token}`,
  });
}

export function removeToken(): void {
  delete client.defaults.headers.Authorization;
}

export function getToken(): string | null {
  return client.defaults.headers.Authorization;
}

export default client;
