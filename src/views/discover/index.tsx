import React, { memo, Suspense, useEffect, useState } from "react"
import type { FC, ReactNode } from "react"
import { Outlet } from "react-router-dom"
import NavBar from "./c-cpns/nav-bar"
import { DiscoverWrapper } from "./style"

interface IProps {
  children?: ReactNode
}

const Discover: FC<IProps> = () => {
  // 记录当前滚动距离
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
    }
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <DiscoverWrapper>
      <div className="header">
        <NavBar />
      </div>
      {/* 二级路由占位 */}
      <Suspense fallback="">
        <Outlet />
      </Suspense>

      {scrollY > 80 && (
        <div className="sprite" onClick={() => window.scrollTo(0, 0)}></div>
      )}
    </DiscoverWrapper>
  )
}

export default memo(Discover)
