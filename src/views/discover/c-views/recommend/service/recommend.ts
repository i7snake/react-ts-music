import hkRequest from "@/service/index"
// 获取推荐轮播图
export const getRecommendBanner = () => {
  return hkRequest.get({
    url: "/banner"
  })
}

// 获取推荐歌单
export const getHotRecommend = (limit = 30) => {
  return hkRequest.get({
    url: "/personalized",
    params: {
      limit
    }
  })
}

// 获取推荐新碟上架
export const getNewAlbum = () => {
  return hkRequest.get({
    url: "/album/newest"
  })
}

// 获取推荐榜单
export const getTopList = (id: number) => {
  return hkRequest.get({
    url: "/playlist/detail",
    params: {
      id
    }
  })
}

// 获取入住歌手 热门主播等数据
export function getArtistList(limit = 30) {
  return hkRequest.get({
    url: "/artist/list",
    params: {
      limit
    }
  })
}
