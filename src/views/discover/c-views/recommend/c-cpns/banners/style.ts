import styled from "styled-components"

export const BannerWrapper = styled.div`
  .banner {
    height: 285px;
    display: flex;
    position: relative;

    .banner-left {
      position: relative;
      width: 730px;
      overflow: hidden;

      .item {
        height: 285px;
        .image {
          width: 100%;
          height: 100%;
        }
      }
      .dots {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        display: flex;
        justify-content: center;

        > li {
          margin: 0 2px;

          .item {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url(${require("@/assets/img/banner_sprite.png")}) 3px -343px;
            cursor: pointer;

            &:hover,
            &.active {
              background-position: -16px -343px;
            }
          }
        }
      }
    }
    .banner-right {
      a {
        display: block;
        width: 254px;
        height: 285px;
        background: url(${require("@/assets/img/download.png")});
      }
    }
    .contorl-btn {
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 63px;

      .btn {
        position: absolute;
        width: 37px;
        height: 63px;
        background-image: url(${require("@/assets/img/banner_sprite.png")});
        background-color: transparent;
        cursor: pointer;

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }

      .left {
        left: -68px;
        background-position: 0 -360px;
      }
      .right {
        right: -68px;
        background-position: 0 -508px;
      }
    }
  }
`
