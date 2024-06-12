import React, { memo, useRef, useState } from "react"
import type { FC, ReactNode, ElementRef } from "react"
import classNames from "classnames"
import { Carousel } from "antd"

import { BannerWrapper } from "./style"
import { shallowEqualApp, useAppSelector } from "@/store"

interface IProps {
  children?: ReactNode
}

const Banner: FC<IProps> = () => {
  const [current, setCurrent] = useState(0)
  const carouselRef = useRef<ElementRef<typeof Carousel>>(null)

  const { banners = [] } = useAppSelector((state) => {
    return {
      banners: state.recommend.banners
    }
  }, shallowEqualApp)

  function handleCurrentChange(current: number) {
    setCurrent(current)
  }
  function handlePrevClick() {
    carouselRef.current?.prev()
  }
  function handleNextClick() {
    carouselRef.current?.next()
  }

  // 获取背景模糊图片
  let backgroundImage = ""
  if (current >= 0 && banners.length > 0) {
    backgroundImage = banners[current].imageUrl + "?imageView&blur=40x20"
  }

  return (
    <BannerWrapper
      style={{
        background: `url('${backgroundImage}') center center / 6000px`
      }}
    >
      <div className="banner wrap-v2">
        <div className="banner-left">
          <Carousel
            autoplay
            ref={carouselRef}
            effect="fade"
            dots={false}
            afterChange={handleCurrentChange}
          >
            {banners.map((item, index) => {
              return (
                <div className="item" key={index}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              )
            })}
          </Carousel>
          <ul className="dots">
            {banners.map((item, index) => {
              return (
                <li key={item.imageUrl}>
                  <span
                    className={classNames("item", {
                      active: index === current
                    })}
                  ></span>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="banner-right">
          <a
            href="https://music.163.com/#/download"
            target="_blank"
            rel="noreferrer"
          ></a>
        </div>
        <div className="contorl-btn">
          <button className="btn left" onClick={handlePrevClick}></button>
          <button className="btn right" onClick={handleNextClick}></button>
        </div>
      </div>
    </BannerWrapper>
  )
}

export default memo(Banner)
