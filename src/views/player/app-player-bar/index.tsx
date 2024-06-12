import React, { memo, useEffect, useRef, useState } from "react"
import type { FC, ReactNode } from "react"
import { Slider, message } from "antd"
import { Link } from "react-router-dom"

import {
  AppPlayerBarWrapper,
  BarControlWrapper,
  BarPlayerInfoWrapper,
  BarOperatorWrapper
} from "./style"
import { shallowEqualApp, useAppDispath, useAppSelector } from "@/store"
import { formatTime, getImageSize } from "@/utils/format"
import { getSongPlayUrl } from "@/utils/handle-player"
import {
  setLyricIndexAction,
  setMusicAction,
  setPlayModeAction
} from "../store/player"

interface IProps {
  children?: ReactNode
}

const AppPlayerBar: FC<IProps> = () => {
  // 1.组件内部状态
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // 2.redux数据
  const { currentSong, lyrics, lyricIndex, playMode } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      lyrics: state.player.lyrics,
      lyricIndex: state.player.lyricIndex,
      playMode: state.player.playMode
    }),
    shallowEqualApp
  )

  const dipatch = useAppDispath()

  // 3.副作用播放音乐
  useEffect(() => {
    // 1.播放音乐
    if (currentSong.id && audioRef.current) {
      audioRef.current.src = getSongPlayUrl(currentSong.id)
      audioRef.current
        ?.play()
        .then(() => {
          setIsPlaying(true)
          console.log("歌曲播放成功")
        })
        .catch((err) => {
          console.log("歌曲播放失败:", err)
        })
      // 2.获取音乐的总时长
      setDuration(currentSong.dt)
    }
  }, [currentSong])

  // 4.音乐播放进度
  function handleTimeUpdate() {
    // 1.获取当前播放时间
    const currentTime = audioRef.current!.currentTime * 1000
    // 2.设置进度条的进度
    if (!isSliding) {
      const progress = (currentTime / duration) * 100
      setProgress(progress)
      setCurrentTime(currentTime)
    }

    // 3.根据当前时间设置歌词
    let index = lyrics.length - 1 // 默认最后一句歌词
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i]
      if (lyric.time > currentTime) {
        index = i - 1
        break
      }
    }

    // 4. 优化：当歌词索引变化时，只更新当前歌词
    if (lyricIndex === index || index == -1) return
    dipatch(setLyricIndexAction(index))
    // console.log(lyrics[index]?.text)

    // 5.简单展示歌词
    message.open({
      content: lyrics[index].text,
      key: "lyric",
      duration: 0,
      style: {
        marginTop: "85vh"
      }
    })
  }
  function handleTimeEnded() {
    if (playMode === 2) {
      audioRef.current!.currentTime = 0
      audioRef.current?.play()
    } else {
      handleChangeMusic(true)
    }
  }

  // 5.事件处理
  function handlePlayBtnClick() {
    // 1.控制播放器的播放/暂停
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false))
    // 2.改变isPlaying的状态
    setIsPlaying(!isPlaying)
  }
  function handleChangeMusic(isNext = true) {
    // 1.获取当前歌曲的索引
    dipatch(setMusicAction(isNext))
  }
  function handleChangePlayMode() {
    let mode = playMode + 1
    if (mode > 2) mode = 0
    dipatch(setPlayModeAction(mode))
  }
  function handleSliderChanging(value: number) {
    // 0.目前是处于拖拽状态
    setIsSliding(true)
    // 1.设置progress
    setProgress(value)

    // 2.获取value对应位置的时间
    const currentTime = (value / 100) * duration
    setCurrentTime(currentTime)
  }
  function handleSliderChanged(value: number) {
    // 1.获取点击位置的时间
    const currentTime = (value / 100) * duration
    // 2.设置当前播放的时间
    audioRef.current!.currentTime = currentTime / 1000
    // 3.currentTime/progress
    setCurrentTime(currentTime)
    setProgress(value)
    setIsSliding(false)
  }

  return (
    <AppPlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControlWrapper $isPlaying={isPlaying}>
          <button
            className="btn sprite_playbar prev"
            onClick={() => handleChangeMusic(false)}
          ></button>
          <button
            onClick={handlePlayBtnClick}
            className="btn sprite_playbar play"
          ></button>
          <button
            className="btn sprite_playbar next"
            onClick={() => handleChangeMusic(true)}
          ></button>
        </BarControlWrapper>
        <BarPlayerInfoWrapper>
          <Link to="/player">
            <img
              className="image"
              src={getImageSize(currentSong?.al?.picUrl, 50)}
              alt=""
            />
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.name}</span>
              <span className="singer-name">{currentSong?.ar?.[0]?.name}</span>
            </div>
            <div className="progress">
              <Slider
                step={0.5}
                value={progress}
                tooltip={{ formatter: null }}
                onChange={handleSliderChanging}
                onChangeComplete={handleSliderChanged}
              />
              <div className="time">
                <span className="current">{formatTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="duration">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarPlayerInfoWrapper>
        <BarOperatorWrapper $playMode={playMode}>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <button
              className="btn sprite_playbar loop"
              onClick={handleChangePlayMode}
            ></button>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperatorWrapper>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTimeEnded}
      />
    </AppPlayerBarWrapper>
  )
}

export default memo(AppPlayerBar)
