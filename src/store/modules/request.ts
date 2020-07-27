import { observable, computed, action } from "mobx";
import { AxiosRequestConfig, AxiosResponse } from "axios";

import { StoreModule } from "@/utils/mobx-store-module";
import { axiosInstance, withProxy } from "@/utils/http";

class Request extends StoreModule {
  @observable requestCount = 0;

  @computed
  get isFetching() {
    return this.requestCount > 0;
  }

  @action
  add = () => {
    this.requestCount++;
  };

  @action
  _onRequest = (config: AxiosRequestConfig) => {
    this.requestCount++;

    let { url = "", headers = {} } = config;
    const token = window.localStorage.getItem("token");
    token && (headers.Authorization = token);
    url = withProxy(url);

    return { ...config, url, headers };
  };

  @action
  _onResponse = (response: AxiosResponse) => {
    this.requestCount--;

    return response.data;
  };

  @action
  _onResponseError = (err: any) => {
    this.requestCount--;

    return Promise.reject(err);
  };
}

// 在这里使用拦截器关联store
const requestStore = new Request();
axiosInstance.interceptors.request.use(requestStore._onRequest);
axiosInstance.interceptors.response.use(requestStore._onResponse, requestStore._onResponseError);

export default requestStore;
