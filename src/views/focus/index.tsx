import React, { memo } from "react"
import type { FC, ReactNode } from "react"

interface IProps {
  children?: ReactNode
}

const Focus: FC<IProps> = () => {
  return (
    <div>
      <h1>Focus</h1>
    </div>
  )
}

export default memo(Focus)
