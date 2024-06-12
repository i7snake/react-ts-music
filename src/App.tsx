import React, { Suspense, useEffect } from "react"
import { useRoutes } from "react-router-dom"
import router from "./router"

import AppHeader from "./components/app-header"
import AppFoot from "./components/app-foot"
import AppPlayerBar from "./views/player/app-player-bar"
import { useAppDispath } from "./store"
import { fetchCurrentSongAction } from "./views/player/store/player"

function App() {
  // 获取当前进入页面的初始歌曲信息
  const dispatch = useAppDispath()
  useEffect(() => {
    dispatch(fetchCurrentSongAction(2158973221))
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <Suspense fallback="loading...">
        <div className="main">{useRoutes(router)}</div>
      </Suspense>
      <AppFoot />

      {/*底部播放栏 */}
      <AppPlayerBar />
    </div>
  )
}

export default App
