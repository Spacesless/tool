/**
 * 等待一段时间
 */
export function sleep (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
