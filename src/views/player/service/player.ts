import hkRequest from "@/service"

export const getSongDetail = (ids: number) => {
  return hkRequest.get({
    url: "/song/detail",
    params: {
      ids
    }
  })
}

export function getSongLyric(id: number) {
  return hkRequest.get({
    url: "/lyric",
    params: {
      id
    }
  })
}
