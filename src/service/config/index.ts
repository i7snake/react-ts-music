// 如何区分开发环境和生产环境的配置 BASE_URL

// 1.手动切换
export const BASE_URL = "http://codercba.com:9002"
export const TIME_OUT = 10000

// 2.根据环境变量自动切换
// const env = process.env.NODE_ENV
// if (env === "development") {
//   // 开发环境配置
// } else {
//   // 生产环境配置
// }

// 3.使用.env文件
// 在src目录下,创建.env.development和.env.production文件,分别配置开发环境和生产环境的配置
// 注意：在react中需要添加REACT_APP前缀,如REACT_APP_BASE_URL
// console.log(process.env.REACT_APP_BASE_URL) // TS需手动配置REACT_APP_BASE_URL类型才有提示
