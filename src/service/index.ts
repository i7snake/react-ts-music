import HKRequest from "./request/index"
import { BASE_URL, TIME_OUT } from "./config"

// 创建实例
const hkRequest = new HKRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      return config
    }
  }
})

export default hkRequest
