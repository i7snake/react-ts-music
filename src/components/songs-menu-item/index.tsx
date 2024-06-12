import React, { memo } from "react"
import type { FC, ReactNode } from "react"
import { SongsMenuItemWrapper } from "./style"
import { getImageSize, formCount } from "@/utils/format"

interface IProps {
  children?: ReactNode
  itemData: any
}

const SongsMenuItem: FC<IProps> = (props) => {
  const { itemData } = props

  return (
    <SongsMenuItemWrapper>
      <div className="top">
        <img src={getImageSize(itemData.picUrl, 140)} alt="" />
        <div className="cover sprite_cover">
          <div className="info sprite_cover">
            <span>
              <i className="sprite_icon headset"></i>
              <span className="count">{formCount(itemData.playCount)}</span>
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <a href="#" className="bottom">
        {itemData.name}
      </a>
    </SongsMenuItemWrapper>
  )
}

export default memo(SongsMenuItem)
