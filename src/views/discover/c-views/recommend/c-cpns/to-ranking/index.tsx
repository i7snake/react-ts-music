import React, { memo } from "react"
import type { FC, ReactNode } from "react"
import { ToRankingWrapper } from "./style"
import AreaHeaderV1 from "@/components/area-header-v1"
import { shallowEqualApp, useAppSelector } from "@/store"
import ToRankingItem from "../to-ranking-item"

interface IProps {
  children?: ReactNode
}

const TopRanking: FC<IProps> = () => {
  const { rankings } = useAppSelector((state) => {
    return {
      rankings: state.recommend.rankings
    }
  }, shallowEqualApp)

  return (
    <ToRankingWrapper>
      <AreaHeaderV1 title="榜单" moreLink="/discover/ranking" />
      <div className="content">
        {rankings.map((item) => {
          return <ToRankingItem key={item.id} itemData={item} />
        })}
      </div>
    </ToRankingWrapper>
  )
}

export default memo(TopRanking)
