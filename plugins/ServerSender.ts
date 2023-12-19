// import Vue from 'vue';
// // import Axios from 'axios';
// import qs from 'qs';

// const axios = Axios.create({
//   // baseURL: 'http://localhost:8080', // バックエンドB のURL:port を指定する
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   responseType: 'json',
//   validateStatus: function(status) {
//     return true;
//   },
//   paramsSerializer(params) {
//     return qs.stringify(params, { arrayFormat: 'repeat' });
//   },
// });

// // Cookieを有効化。
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = '/api';

// var logoutFlg = false;

export default defineNuxtPlugin(() => {
  const baseurl = "/api"
  const controller = new AbortController()
  const signal = controller.signal

  return {
    provide: {
      doGet: async (url: string, isStandAlone: boolean = false) => {
        let statusCode = 0
        let data: any
        await $fetch(`${baseurl}${url}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal: signal,
          onRequestError({ request, options, error }) {
            showError(createError({ statusCode: 500 }))
          },
          onResponse({ request, response, options }) {
            // Process the response data
            statusCode = response.status
            data = response._data
          },
        })
        return data
      },
      doPost: async (url: string, params: object = {}) => {
        let statusCode = 0
        let data: any
        await $fetch(`${baseurl}${url}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: params,
          signal: signal,
          // credentials: "include",
          onRequestError({ request, options, error }) {
            showError(createError({ statusCode: 500 }))
          },
          onResponse({ request, response, options }) {
            statusCode = response.status
            data = response._data
          },
        })
        return data
      },
      doPut: async (url: string, params: object = {}, isStandAlone: boolean = false) => {
        let statusCode = 0
        let data: any
        await $fetch(`${baseurl}${url}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: params,
          signal: signal,
          onRequestError({ request, options, error }) {
            showError(createError({ statusCode: 500 }))
          },
          onResponse({ request, response, options }) {
            statusCode = response.status
            data = response._data
          },
        })
        return data
      },
      doDelete: async (url: string, isStandAlone: boolean = false) => {
        let statusCode = 0
        let data: any
        await $fetch(`${baseurl}${url}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          signal: signal,
          onRequestError({ request, options, error }) {
            showError(createError({ statusCode: 500 }))
          },
          onResponse({ request, response, options }) {
            statusCode = response.status
            data = response._data
          },
        })
        return data
      },
      abortFetch: () => {
        controller.abort()
      },
    },
  }
})
