import React, { memo } from "react"
import type { FC, ReactNode } from "react"

interface IProps {
  children?: ReactNode
}

const Album: FC<IProps> = () => {
  return (
    <div>
      <h1>Album</h1>
    </div>
  )
}

export default memo(Album)
