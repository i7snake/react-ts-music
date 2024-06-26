import React, { memo } from "react"
import type { FC, ReactNode } from "react"
import { NavLink } from "react-router-dom"

import { NavBarWrapper } from "./style"
import { discoverMenu } from "@/assets/data/local_data"

interface IProps {
  children?: ReactNode
}

const NavBar: FC<IProps> = () => {
  return (
    <NavBarWrapper>
      <div className=" wrap-v1">
        <div className="nav">
          {discoverMenu.map((item) => {
            return (
              <div className="item" key={item.link}>
                <NavLink to={item.link}>{item.title}</NavLink>
              </div>
            )
          })}
        </div>
      </div>
    </NavBarWrapper>
  )
}

export default memo(NavBar)
