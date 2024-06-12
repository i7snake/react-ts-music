import React, { memo } from "react"
import type { FC, ReactNode } from "react"
import { NewAlbumItemWrapper } from "./style"
import { getImageSize } from "@/utils/format"

interface IProps {
  children?: ReactNode
  itemData: any
}

const NewAlbumItem: FC<IProps> = (props) => {
  const { itemData } = props

  return (
    <NewAlbumItemWrapper>
      <div className="top">
        <img src={getImageSize(itemData.blurPicUrl, 100)} alt="" />
        <a href="" className="cover sprite_cover"></a>
      </div>
      <div className="bottom">
        <a href="#" className="name">
          {itemData.name}
        </a>
        <a href="#" className="artist">
          {itemData.artist.name}
        </a>
      </div>
    </NewAlbumItemWrapper>
  )
}

export default memo(NewAlbumItem)
