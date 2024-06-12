import React, { memo, useEffect } from "react"
import type { FC, ReactNode } from "react"

import { useAppDispath } from "@/store/index"
import {
  fetchHotRecommendAction,
  fetchNewAlbumAction,
  fetchRecommendBannersAction,
  fetchTopListAction,
  fetchSettleSingersAction
} from "./store/recommend"
import Banners from "./c-cpns/banners"
import { RecommendWrapper } from "./style"
import HotRecommend from "./c-cpns/hot-recommend"
import NewAlbum from "./c-cpns/new-album"
import ToRanking from "./c-cpns/to-ranking"
import UserLogin from "./c-cpns/user-login"
import SettleSinger from "./c-cpns/settle-singer"
import HotAnchor from "./c-cpns/hot-anchor"

interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  const dispatch = useAppDispath()
  useEffect(() => {
    dispatch(fetchRecommendBannersAction())
    dispatch(fetchHotRecommendAction())
    dispatch(fetchNewAlbumAction())
    dispatch(fetchTopListAction())
    dispatch(fetchSettleSingersAction())
  }, [dispatch])

  return (
    <RecommendWrapper>
      <Banners />
      <div className="content wrap-v2">
        <div className="left">
          <HotRecommend />
          <NewAlbum />
          <ToRanking />
        </div>
        <div className="right">
          <UserLogin />
          <SettleSinger />
          <HotAnchor />
        </div>
      </div>
    </RecommendWrapper>
  )
}

export default memo(Recommend)
