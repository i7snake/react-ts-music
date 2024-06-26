import React, { memo } from "react"
import type { FC, ReactNode } from "react"
import { PlayerWrapper } from "./style"

interface IProps {
  children?: ReactNode
}

const Player: FC<IProps> = () => {
  return (
    <PlayerWrapper>
      <h1>Player</h1>
    </PlayerWrapper>
  )
}

export default memo(Player)
