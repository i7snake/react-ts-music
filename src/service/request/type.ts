import type { AxiosResponse, AxiosRequestConfig } from "axios"

// 针对AxiosRequestConfig 配置进行扩展
interface HKInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (confing: AxiosRequestConfig) => AxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (confing: T) => T
  responseFailureFn?: (err: any) => any
}

export interface HKRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HKInterceptors<T>
}
