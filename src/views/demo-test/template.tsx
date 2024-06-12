// 代码片段
import React, { memo } from "react"
import type { FC, ReactNode } from "react"

interface IProps {
  children?: ReactNode
}

const Template: FC<IProps> = () => {
  return (
    <div>
      <h1>Template</h1>
    </div>
  )
}

export default memo(Template)
