import axios from "axios"
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios"
import type { HKRequestConfig } from "./type"

// 拦截器: 蒙版Loading/token/修改配置

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */

// 封装
class HKRequest {
  instance: AxiosInstance

  // request实例 => axios的实例
  constructor(config: HKRequestConfig) {
    this.instance = axios.create(config)

    // 三种拦截器

    // 1.每个instance 实例都添加拦截器 全局拦截
    this.instance.interceptors.request.use(
      (config) => {
        //loading/token
        // console.log("全局请求成功的拦截")
        return config
      },
      (err) => {
        // console.log("全局请求失败的拦截")
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log("全局响应成功拦截")
        return res.data
      },
      (err) => {
        // console.log("全局响应失败的拦截")
        return err
      }
    )

    // 2.针对某个特定实例请求精细的拦截 既有全局拦截 也有特定拦截
    if (config.interceptors) {
      this.instance.interceptors.request.use(
        config.interceptors.requestSuccessFn as (
          //使用类型断言明确告诉 TypeScript 参数的类型。
          value: InternalAxiosRequestConfig<any>
        ) =>
          | InternalAxiosRequestConfig<any>
          | Promise<InternalAxiosRequestConfig<any>>,
        config.interceptors.requestFailureFn
      )
      this.instance.interceptors.response.use(
        config.interceptors.responseSuccessFn,
        config.interceptors.responseFailureFn
      )
    }
  }

  // 封装网络请求的方法
  request<T = any>(config: HKRequestConfig<T>) {
    // 3.单次请求拦截 ->成功拦截
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 3.单次响应拦截 ->成功拦截
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: HKRequestConfig<T>) {
    return this.request({ ...config, method: "GET" })
  }

  post<T = any>(config: HKRequestConfig<T>) {
    return this.request({ ...config, method: "POST" })
  }

  delete<T = any>(config: HKRequestConfig<T>) {
    return this.request({ ...config, method: "DELETE" })
  }

  patch<T = any>(config: HKRequestConfig<T>) {
    return this.request({ ...config, method: "PATCH" })
  }
}

export default HKRequest
