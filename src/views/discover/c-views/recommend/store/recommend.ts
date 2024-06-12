import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  getHotRecommend,
  getRecommendBanner,
  getNewAlbum,
  getTopList,
  getArtistList
} from "../service/recommend"

// 定义异步Thunk 网络请求action
export const fetchRecommendBannersAction = createAsyncThunk(
  "recommend/fetchBanners",
  async (args, { dispatch }) => {
    const res = await getRecommendBanner()
    dispatch(setBannersAction(res.banners))
  }
)
export const fetchHotRecommendAction = createAsyncThunk(
  "recommend/fetchHotRecommend",
  async (args, { dispatch }) => {
    const res = await getHotRecommend(8)
    dispatch(setHotRecommendAction(res.result))
  }
)
export const fetchNewAlbumAction = createAsyncThunk(
  "recommend/fetchNewAlbum",
  async (args, { dispatch }) => {
    const res = await getNewAlbum()
    dispatch(setNewAlbumAction(res.albums))
  }
)
const rankingIds = [19723756, 3779629, 2884035]
export const fetchTopListAction = createAsyncThunk(
  "recommend/fetchTopList",
  (args, { dispatch }) => {
    // 获取榜单数据
    // 1.每个请求单独处理
    // for (const id of rankingIds) {
    //   getTopList(id).then((res) => {
    //     switch (id) {
    //       case 19723756:
    //         console.log("飙升榜的数据", res)
    //         break
    //       case 3779629:
    //         console.log("新歌榜的数据", res)
    //         break
    //       case 2884035:
    //         console.log("原创榜的数据", res)
    //         break
    //     }
    //   })
    // }
    // 2. 将三个结果都拿到, 统一放到一个数组中管理
    // 确保获取到所有的结果、确保获取的结果有正确顺序。使用Promise.all 并发请求

    const promises: Promise<any>[] = []
    for (const id of rankingIds) {
      promises.push(getTopList(id))
    }
    Promise.all(promises).then((res) => {
      const playlists = res
        .filter((item) => item.playlist)
        .map((item) => item.playlist)
      dispatch(setRankingsAction(playlists))
    })
  }
)
export const fetchSettleSingersAction = createAsyncThunk(
  "recommend/fetchSettleSingers",
  async (args, { dispatch }) => {
    const res = await getArtistList(5)
    dispatch(setSettleSingersAction(res.artists))
  }
)

interface RecommendState {
  banners: any[]
  hotRecommends: any[]
  newAlbums: any[]

  rankings: any[]
  settleSingers: any[]
}

const initialState: RecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: [],
  rankings: [],
  settleSingers: []
}
const recommendSlice = createSlice({
  name: "recommend",
  initialState,
  reducers: {
    setBannersAction: (state, action) => {
      state.banners = action.payload
    },
    setHotRecommendAction: (state, action) => {
      state.hotRecommends = action.payload
    },
    setNewAlbumAction: (state, action) => {
      state.newAlbums = action.payload
    },
    setRankingsAction: (state, action) => {
      state.rankings = action.payload
    },
    setSettleSingersAction: (state, action) => {
      state.settleSingers = action.payload
    }
  }
})

export const {
  setBannersAction,
  setHotRecommendAction,
  setNewAlbumAction,
  setRankingsAction,
  setSettleSingersAction
} = recommendSlice.actions
export default recommendSlice.reducer
