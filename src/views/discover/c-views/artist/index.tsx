import React, { memo } from "react"
import type { FC, ReactNode } from "react"

interface IProps {
  children?: ReactNode
}

const Artist: FC<IProps> = () => {
  return (
    <div>
      <h1>Artist</h1>
    </div>
  )
}

export default memo(Artist)
