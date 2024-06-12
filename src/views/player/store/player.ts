import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getSongDetail, getSongLyric } from "../service/player"
import { parseLyric, ILyric } from "@/utils/parse-lyric"
import type { IRootState } from "@/store"

export const fetchCurrentSongAction = createAsyncThunk<
  void,
  number,
  { state: IRootState }
>("player/fetchCurrentSong", (id, { dispatch, getState }) => {
  // 0.准备播放歌曲时 是否存在歌曲列表中
  const playSongList = getState().player.playSongList // 获取播放列表
  const playSongIndex = playSongList.findIndex((item) => item.id === id)

  if (playSongIndex === -1) {
    // 不存在歌曲列表中
    // =========获取歌曲信息==============
    getSongDetail(id).then((res) => {
      // 1.获取song
      if (!res.songs.length) return
      const song = res.songs[0]
      // 2.将song放到currentSong中
      const newPlaySongList = [...playSongList]
      newPlaySongList.push(song)
      dispatch(setCurrentSongAction(song))
      dispatch(setPlaySongListAction(newPlaySongList))
      dispatch(setPlaySongIndexAction(newPlaySongList.length - 1))
    })
  } else {
    // 存在歌曲列表中
    const song = playSongList[playSongIndex]
    dispatch(setCurrentSongAction(song))
    dispatch(setPlaySongIndexAction(playSongIndex))
  }

  // ==========获取歌词数据===========
  getSongLyric(id).then((res) => {
    // 1.获取歌词的字符串
    const lyricString = res.lrc.lyric
    // 2.对歌词进行解析(一个个对象)
    const lyrics = parseLyric(lyricString)
    // 3.将歌词放到state中
    dispatch(setLyricsAction(lyrics))
  })
})
export const setMusicAction = createAsyncThunk<
  void,
  boolean,
  { state: IRootState }
>("player/setMusic", (isNext, { dispatch, getState }) => {
  // 1.获取state中的数据
  const { playSongList, playSongIndex, playMode } = getState().player

  // 2.根据不同的模式计算不同的下一首歌曲的索引
  let nextSongIndex = playSongIndex
  if (playMode === 1) {
    // 随机播放
    nextSongIndex = Math.floor(Math.random() * playSongList.length)
  } else if (playMode === 0) {
    // 顺序播放
    nextSongIndex = isNext ? playSongIndex + 1 : playSongIndex - 1
    if (nextSongIndex > playSongList.length - 1) nextSongIndex = 0
    if (nextSongIndex < 0) nextSongIndex = playSongList.length - 1
  }
  // 3.获取当前的歌曲
  const currentSong = playSongList[nextSongIndex]
  dispatch(setCurrentSongAction(currentSong))
  dispatch(setPlaySongIndexAction(nextSongIndex))

  // 4.获取新歌词
  getSongLyric(currentSong.id).then((res) => {
    // 1.获取歌词的字符串
    const lyricString = res.lrc.lyric
    // 2.对歌词进行解析(一个个对象)
    const lyrics = parseLyric(lyricString)
    // 3.将歌词放到state中
    dispatch(setLyricsAction(lyrics))
  })
})

interface PlayerState {
  currentSong: any
  lyrics: ILyric[]
  lyricIndex: number
  playSongList: any[]
  playSongIndex: number
  playMode: number
}
const initialState: PlayerState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1,
  playSongList: [
    {
      name: "雨天雨天 (live)",
      id: 2161155720,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 5538,
          name: "汪苏泷",
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: "",
      fee: 8,
      v: 4,
      crbt: null,
      cf: "",
      al: {
        id: 197761740,
        name: "歌手2024 第4期",
        picUrl:
          "https://p2.music.126.net/Vq0Ra6yW7efVtZcltG7czw==/109951169635263812.jpg",
        tns: [],
        pic_str: "109951169635263812",
        pic: 109951169635263800
      },
      dt: 303658,
      h: {
        br: 320000,
        fid: 0,
        size: 12148845,
        vd: -19583,
        sr: 48000
      },
      m: {
        br: 192000,
        fid: 0,
        size: 7289325,
        vd: -16980,
        sr: 48000
      },
      l: {
        br: 128000,
        fid: 0,
        size: 4859565,
        vd: -15309,
        sr: 48000
      },
      sq: {
        br: 846319,
        fid: 0,
        size: 32124033,
        vd: -20308,
        sr: 48000
      },
      hr: {
        br: 1616198,
        fid: 0,
        size: 61346592,
        vd: -19599,
        sr: 48000
      },
      a: null,
      cd: "01",
      no: 3,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 17716748288,
      originCoverType: 2,
      originSongSimpleData: {
        songId: 287083,
        name: "雨天",
        artists: [
          {
            id: 9272,
            name: "孙燕姿"
          }
        ],
        albumMeta: {
          id: 28521,
          name: "My Story,Your Song 经典全记录"
        }
      },
      tagPicList: null,
      resourceState: true,
      version: 4,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      mv: 0,
      mst: 9,
      cp: 7001,
      rtype: 0,
      rurl: null,
      publishTime: 0
    },
    {
      name: "起风了",
      id: 1330348068,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 12085562,
          name: "买辣椒也用券",
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: "",
      fee: 8,
      v: 42,
      crbt: null,
      cf: "",
      al: {
        id: 74715426,
        name: "起风了",
        picUrl:
          "https://p1.music.126.net/diGAyEmpymX8G7JcnElncQ==/109951163699673355.jpg",
        tns: [],
        pic_str: "109951163699673355",
        pic: 109951163699673360
      },
      dt: 325868,
      h: {
        br: 320000,
        fid: 0,
        size: 13037236,
        vd: -77525,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 7822359,
        vd: -74987,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 5214920,
        vd: -73504,
        sr: 44100
      },
      sq: {
        br: 985873,
        fid: 0,
        size: 40158105,
        vd: -77524,
        sr: 44100
      },
      hr: {
        br: 2832349,
        fid: 0,
        size: 115371553,
        vd: -77475,
        sr: 88200
      },
      a: null,
      cd: "1",
      no: 1,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 536879104,
      originCoverType: 1,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 42,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      mv: 10782615,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 1415923,
      publishTime: 0
    }
  ],
  playSongIndex: -1, // 当前播放歌曲的索引
  playMode: 0 // 0:顺序播放 1:随机播放 2:单曲循环
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
    },
    setPlaySongListAction: (state, action) => {
      state.playSongList = action.payload
    },
    setPlaySongIndexAction: (state, action) => {
      state.playSongIndex = action.payload
    },
    setPlayModeAction: (state, action) => {
      state.playMode = action.payload
    }
  }
})

export const {
  setCurrentSongAction,
  setLyricsAction,
  setLyricIndexAction,
  setPlaySongListAction,
  setPlaySongIndexAction,
  setPlayModeAction
} = playerSlice.actions
export default playerSlice.reducer
