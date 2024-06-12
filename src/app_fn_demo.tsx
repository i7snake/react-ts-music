import React, { Suspense } from "react"
import { Link, useRoutes } from "react-router-dom"
import { useAppSelector, useAppDispath, shallowEqualApp } from "./store"
import { changeMessageAction } from "./store/modules/demo"

import router from "./router"

// state的类型定义一：
// import store from "./store"
// type GetStateFnType = typeof store.getState
// type IRootState = ReturnType<GetStateFnType> // 拿到返回值类型

function App() {
  // 测试demo Store
  // const { count, message } = useSelector(
  //   (state: IRootState) => ({
  //     count: state.demo.count,
  //     message: state.demo.message
  //   }),
  //   shallowEqual
  // )

  // state的类型定义二：
  // 正式demo Store 使用自定义 useAppSelector（定义好类型的 useSelector）
  const { count, message } = useAppSelector(
    (state) => ({
      count: state.demo.count,
      message: state.demo.message
    }),
    shallowEqualApp
  )

  const dipatch = useAppDispath()
  function hannelClickChange() {
    dipatch(changeMessageAction("hello world"))
  }

  return (
    <div className="App">
      <div className="nav">
        <Link to="/discover">发现音乐</Link>
        <Link to="/mine">我的音乐</Link>
        <Link to="/focus">关注</Link>
        <Link to="/download">下载客户端</Link>
      </div>
      <h2>当前计数: {count}</h2>
      <h2>当前消息: {message}</h2>
      <button onClick={hannelClickChange}>修改message</button>
      <Suspense fallback="loading...">
        <div className="main">{useRoutes(router)}</div>
      </Suspense>
    </div>
  )
}

export default App
