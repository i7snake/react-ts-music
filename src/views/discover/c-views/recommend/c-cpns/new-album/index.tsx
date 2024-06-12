import AreaHeaderV1 from "@/components/area-header-v1"
import React, { memo, useRef } from "react"
import type { FC, ReactNode, ElementRef } from "react"
import { Carousel } from "antd"

import { NewAlbumWrapper } from "./style"
import { shallowEqualApp, useAppSelector } from "@/store"
import NewAlbumItem from "@/components/new-album-item"

interface IProps {
  children?: ReactNode
}

const NewAlbum: FC<IProps> = () => {
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)

  const { newAlbum } = useAppSelector((state) => {
    return {
      newAlbum: state.recommend.newAlbums
    }
  }, shallowEqualApp)

  function handlePrevClick() {
    bannerRef.current?.prev()
  }
  function handleNextClick() {
    bannerRef.current?.next()
  }
  return (
    <NewAlbumWrapper>
      <AreaHeaderV1 title="新碟上架" moreLink="/discover/album" />
      <div className="content">
        <button
          className="sprite_02 arrow arrow-left"
          onClick={handlePrevClick}
        ></button>
        <div className="banner">
          <Carousel ref={bannerRef} dots={false} speed={1500}>
            {[0, 1].map((item) => {
              return (
                <div key={item}>
                  <div className="album-list">
                    {newAlbum.slice(item * 5, (item + 1) * 5).map((album) => {
                      return <NewAlbumItem key={album.id} itemData={album} />
                    })}
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="sprite_02 arrow arrow-right"
          onClick={handleNextClick}
        ></button>
      </div>
    </NewAlbumWrapper>
  )
}

export default memo(NewAlbum)
