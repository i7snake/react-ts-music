import React, { memo } from "react"
import type { FC, ReactNode } from "react"
import { HeaderWrapper } from "./style"
import { Link } from "react-router-dom"

interface IProps {
  children?: ReactNode
  title?: string
  moreText?: string
  moreLink?: string
}

const AreaHeaderV2: FC<IProps> = (props) => {
  const { title = "默认标题", moreText, moreLink } = props
  return (
    <HeaderWrapper>
      <h3 className="title">{title}</h3>
      {moreText && moreLink && <Link to={moreLink}>{moreText}</Link>}
    </HeaderWrapper>
  )
}

export default memo(AreaHeaderV2)
