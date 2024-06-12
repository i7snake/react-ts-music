import styled from "styled-components"

export const UserLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-position: 0px 90px;
  .top {
    height: 92px;
    width: 100%;
    background-position: 0 0;
    background-size: contain;
    cursor: pointer;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 126px;
    box-sizing: border-box;
    padding: 16px 22px;
    p {
      line-height: 25px;
    }

    a {
      margin-top: 10px;
      display: inline-block;
      width: 100px;
      height: 31px;
      line-height: 31px;
      text-align: center;
      color: #fff;
      text-decoration: none;
      background-position: 0 -195px;
      text-shadow: 0 1px 0 #8a060b;

      &:hover {
        background-position: -110px -195px;
      }
    }
  }
`
