import styled from "styled-components"

export const NewAlbumItemWrapper = styled.div`
  .top {
    position: relative;
    width: 118px;
    height: 100px;
    overflow: hidden;
    margin: 15px 2px 0;

    img {
      width: 100px;
      height: 100px;
    }
    .cover {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-position: 0 -570px;
      text-indent: -9999px;
    }
  }

  .bottom {
    font-size: 12px;
    width: 100px;

    .name {
      display: block;
      color: #000;
      ${(props) => props.theme.mixin.textNowrap}
    }
    .artist {
      display: block;
      color: #666;
      ${(props) => props.theme.mixin.textNowrap}
    }
  }
`
