export type Point = { x: number; y: number }

export function isNeighbour(a: Point, b: Point, includeDiagonal = true) {
  const distance = distanceBetween(a, b)
  if (distance === 1) return true
  if (includeDiagonal && distance === 2 && a.x !== b.x && a.y !== b.y) {
    return true
  }
  return false
}

export function distanceBetween(a: Point, b: Point) {
  const diffX = Math.abs(a.x - b.x)
  const diffY = Math.abs(a.y - b.y)
  return diffX + diffY
}
