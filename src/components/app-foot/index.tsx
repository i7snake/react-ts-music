import React, { memo } from "react"
import type { FC, ReactNode } from "react"

interface IProps {
  children?: ReactNode
}

const AppFoot: FC<IProps> = () => {
  return (
    <div>
      <h1>AppFoot</h1>
    </div>
  )
}

export default memo(AppFoot)
