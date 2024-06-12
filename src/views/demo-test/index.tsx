import React, { memo } from "react" // TSX 必须引入React
import type { ReactNode } from "react"

interface DemoProps {
  children?: ReactNode // 子组件类型（插槽内容）
}

// TS 中 组件需要定义的类型
// -->FC 表示函数组件类型;
// -->DemoProps表示组件的 props 类型
const Demo: React.FC<DemoProps> = () => {
  return (
    <div>
      <h1>Demo</h1>
    </div>
  )
}

export default memo(Demo)
