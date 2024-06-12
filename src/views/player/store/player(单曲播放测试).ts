import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getSongDetail, getSongLyric } from "../service/player"
import { parseLyric, ILyric } from "@/utils/parse-lyric"

export const fetchCurrentSongAction = createAsyncThunk(
  "player/fetchCurrentSong",
  (id: number, { dispatch }) => {
    // 1.获取歌曲信息
    getSongDetail(id).then((res) => {
      // 1.获取song
      if (!res.songs.length) return
      // 2.将song放到currentSong中
      dispatch(setCurrentSongAction(res.songs[0]))
    })

    // 2.获取歌词数据
    getSongLyric(id).then((res) => {
      // 1.获取歌词的字符串
      const lyricString = res.lrc.lyric
      // 2.对歌词进行解析(一个个对象)
      const lyrics = parseLyric(lyricString)
      // 3.将歌词放到state中
      dispatch(setLyricsAction(lyrics))
    })
  }
)

interface PlayerState {
  currentSong: any
  lyrics: ILyric[]
  lyricIndex: number
}

const initialState: PlayerState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1
}

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentSongAction: (state, action) => {
      state.currentSong = action.payload
    },
    setLyricsAction: (state, action) => {
      state.lyrics = action.payload
    },
    setLyricIndexAction: (state, action) => {
      state.lyricIndex = action.payload
    }
  }
})

export const { setCurrentSongAction, setLyricsAction, setLyricIndexAction } =
  playerSlice.actions
export default playerSlice.reducer
