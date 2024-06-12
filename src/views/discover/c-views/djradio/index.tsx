import React, { memo } from "react"
import type { FC, ReactNode } from "react"

interface IProps {
  children?: ReactNode
}

const Djradio: FC<IProps> = () => {
  return (
    <div>
      <h1>Djradio</h1>
    </div>
  )
}

export default memo(Djradio)
