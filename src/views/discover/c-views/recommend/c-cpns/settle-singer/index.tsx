import React, { memo } from "react"
import type { FC, ReactNode } from "react"
import { SettleSingerWrapper } from "./style"
import AreaHeaderV2 from "@/components/area-header-v2"
import { shallowEqualApp, useAppSelector } from "@/store"
import { Link } from "react-router-dom"
import { getImageSize } from "@/utils/format"

interface IProps {
  children?: ReactNode
}

const SettleSinger: FC<IProps> = () => {
  const { settleSingers } = useAppSelector((state) => {
    return {
      settleSingers: state.recommend.settleSingers
    }
  }, shallowEqualApp)

  return (
    <SettleSingerWrapper>
      <AreaHeaderV2
        title="入驻歌手"
        moreText="查看全部 &gt;"
        moreLink="/discover/artist"
      />
      <div className="artists">
        {settleSingers.map((item) => {
          return (
            <Link className="item" to={"/discover/artist"} key={item.id}>
              <img
                src={getImageSize(item.img1v1Url, 80)}
                className="head"
                alt=""
              />
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="alias">{item.alias.join(" ")}</div>
              </div>
            </Link>
          )
        })}
      </div>
      <div className="apply-for">
        <a href="#">申请成为网易音乐人</a>
      </div>
    </SettleSingerWrapper>
  )
}

export default memo(SettleSinger)
