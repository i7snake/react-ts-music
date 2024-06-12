import React, { memo } from "react"
import type { FC, ReactNode } from "react"
import { HotRecommendWrapper } from "./style"
import AreaHeaderV1 from "@/components/area-header-v1"
import { shallowEqualApp, useAppSelector } from "@/store"
import SongsMenuItem from "@/components/songs-menu-item"

interface IProps {
  children?: ReactNode
}

const HotRecommend: FC<IProps> = () => {
  const { hotRecommends } = useAppSelector((state) => {
    return {
      hotRecommends: state.recommend.hotRecommends
    }
  }, shallowEqualApp)

  return (
    <HotRecommendWrapper>
      <AreaHeaderV1
        title="热门推荐"
        keywords={["华语", "流行", "摇滚", "民谣", "电子"]}
        moreLink="/discover/songs"
      />
      <div className="list">
        {hotRecommends.map((item) => {
          return <SongsMenuItem key={item.id} itemData={item} />
        })}
      </div>
    </HotRecommendWrapper>
  )
}

export default memo(HotRecommend)
