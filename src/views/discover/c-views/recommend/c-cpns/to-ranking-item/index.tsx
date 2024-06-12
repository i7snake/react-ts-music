import React, { memo } from "react"
import type { FC, ReactNode } from "react"
import { ToRankingItemWrapper } from "./style"
import { getImageSize } from "@/utils/format"
import { useAppDispath } from "@/store"
import { fetchCurrentSongAction } from "@/views/player/store/player"

interface IProps {
  children?: ReactNode
  itemData: any
}

const ToRankingItem: FC<IProps> = (props) => {
  const { itemData } = props
  const { tracks = [] } = itemData

  // 榜单歌曲播放
  const dispatch = useAppDispath()
  function handlePlayClick(id: number) {
    dispatch(fetchCurrentSongAction(id))
  }

  return (
    <ToRankingItemWrapper>
      <div className="header">
        <div className="image">
          <img src={getImageSize(itemData.coverImgUrl, 80)} alt="" />
          <a href="#" className="sprite_cover"></a>
        </div>
        <div className="info">
          <a href="#" className="name">
            {itemData.name}
          </a>
          <div>
            <button className="sprite_02 btn play"></button>
            <button className="sprite_02 btn favor"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks.slice(0, 10).map((item: any, index: number) => {
          return (
            <div className="item" key={item.id}>
              <div className="index">{index + 1}</div>
              <div className="info">
                <a href="#" className="name">
                  {item.name}
                </a>
                <div className="operator">
                  <button
                    className="btn sprite_02 play"
                    onClick={() => handlePlayClick(item.id)}
                  ></button>
                  <button className="btn sprite_icon2 add"></button>
                  <button className="btn sprite_02 favor"></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="footer">
        <a href="#/discover/ranking">查看全部 &gt;</a>
      </div>
    </ToRankingItemWrapper>
  )
}

export default memo(ToRankingItem)
