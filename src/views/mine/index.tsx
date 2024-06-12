import React, { memo } from "react"
import type { FC, ReactNode } from "react"

interface IProps {
  children?: ReactNode
}

const Mine: FC<IProps> = () => {
  return (
    <div>
      <h1>Mine</h1>
    </div>
  )
}

export default memo(Mine)
