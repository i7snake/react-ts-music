export function formCount(count: number) {
  if (count >= 100000) {
    return Math.floor(count / 10000) + "万"
  } else {
    return count
  }
}

export function getImageSize(
  imgUrl: string,
  width: number,
  height: number = width
) {
  return imgUrl + `?param=${width}x${height}`
}

export function formatTime(time: number) {
  const timeSecond = time / 1000
  // 获取分钟和秒钟
  const minute = Math.floor(timeSecond / 60)
  const second = Math.floor(timeSecond) % 60

  // 3.格式化时间
  const formatMinute = String(minute).padStart(2, "0")
  const formatSecond = String(second).padStart(2, "0")

  return `${formatMinute}:${formatSecond}`
}
