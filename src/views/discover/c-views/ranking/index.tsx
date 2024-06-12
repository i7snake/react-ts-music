import React, { memo } from "react"
import type { FC, ReactNode } from "react"
import { RankingWrapper } from "./style"

interface IProps {
  children?: ReactNode
}

const Ranking: FC<IProps> = () => {
  return (
    <RankingWrapper>
      <h1>Ranking</h1>
    </RankingWrapper>
  )
}

export default memo(Ranking)
