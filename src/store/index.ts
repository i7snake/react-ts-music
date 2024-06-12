import { configureStore } from "@reduxjs/toolkit"
import {
  TypedUseSelectorHook,
  useSelector,
  useDispatch,
  shallowEqual
} from "react-redux"
import demoReducer from "./modules/demo"
import recommendReducer from "@/views/discover/c-views/recommend/store/recommend"
import playerReducer from "@/views/player/store/player"

const store = configureStore({
  reducer: {
    demo: demoReducer, // 测试demo模块
    recommend: recommendReducer, // 推荐模块
    player: playerReducer // 播放器模块
  }
})

// const stateType = store.getState()
// type AppState = typeof stateType

type GetStateFnType = typeof store.getState // 拿到getState函数的类型
export type IRootState = ReturnType<GetStateFnType> // 拿到返回值类型
type AppDispatch = typeof store.dispatch // 拿到dispatch函数的类型

// useAppSelector的hook
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispath: () => AppDispatch = useDispatch
export const shallowEqualApp = shallowEqual

export default store
