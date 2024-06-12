import React, { memo } from "react"
import type { FC, ReactNode } from "react"
import { NavLink } from "react-router-dom"
import { SearchOutlined } from "@ant-design/icons"
import { Input } from "antd"

import { AppHeaderWrapper, AppHeaderLeft, AppHeaderRight } from "./style"
import navTitle from "@/assets/data/header_titles.json"

interface IProps {
  children?: ReactNode
}

const AppHeader: FC<IProps> = () => {
  // 显示标题
  function showTitle(title: any) {
    if (title.type === "path") {
      return (
        <NavLink
          className={({ isActive }) => (isActive ? "active" : undefined)}
          to={title.link}
        >
          {title.title}
          <i className="icon sprite_01"></i>
        </NavLink>
      )
    } else {
      return (
        <a href={title.link} rel="noreferrer" target="_blank">
          {title.title}
        </a>
      )
    }
  }

  return (
    <AppHeaderWrapper>
      <div className="content wrap-v1">
        <AppHeaderLeft>
          <a className="logo sprite_01" href="/">
            网易云音乐
          </a>
          <div className="title-list">
            {navTitle.map((item, index) => {
              return (
                <div className="item" key={index}>
                  {showTitle(item)}
                </div>
              )
            })}
          </div>
        </AppHeaderLeft>
        <AppHeaderRight>
          <Input
            className="search"
            placeholder="音乐/视频/电台/用户"
            prefix={<SearchOutlined />}
          />
          <div className="center">创作者中心</div>
          <div className="login">登录</div>
        </AppHeaderRight>
      </div>
      <div className="divider"></div>
    </AppHeaderWrapper>
  )
}

export default memo(AppHeader)
