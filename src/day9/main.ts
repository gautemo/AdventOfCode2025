import { maxOf, minOf, slidingWindows } from '@std/collections'
import type { Point } from '../common/point.ts'
import { allPairs } from '../common/utils.ts'

export function part1(input: string) {
  const points: Point[] = input.split('\n').map((row) => {
    const [x, y] = row.split(',').map(Number)
    return { x, y }
  })
  const pairs = allPairs(points)
  return maxOf(pairs, (pair) => {
    const xLength = Math.abs(pair[0].x - pair[1].x) + 1
    const yLength = Math.abs(pair[0].y - pair[1].y) + 1
    return xLength * yLength
  })
}

export function part2(input: string, compress = 500) {
  const points: CompressedPoint[] = input.split('\n').map((row) => {
    const [x, y] = row.split(',').map(Number)
    return { x: Math.round(x / compress), y: Math.round(y / compress), realX: x, realY: y }
  })
  const otherTiles = outsidePoints(points)
  const pairs = allPairs(points)
  let max = 0
  for (const pair of pairs) {
    const xLength = Math.abs(pair[0].realX - pair[1].realX) + 1
    const yLength = Math.abs(pair[0].realY - pair[1].realY) + 1
    const area = xLength * yLength
    if (area > max && !otherTiles.some((p) => isPointInArea(p, pair))) {
      max = area
    }
  }
  return max
}

function outsidePoints(points: Point[]) {
  const lines = slidingWindows([...points, points[0]], 2)
  const maxX = maxOf(points, (p) => p.x)! + 1
  const maxY = maxOf(points, (p) => p.y)! + 1
  const minX = minOf(points, (p) => p.x)! - 1
  const minY = minOf(points, (p) => p.y)! - 1
  const queue: Point[] = [{ x: minX, y: minY }]
  const visited: Point[] = []
  while (queue.length > 0) {
    const v = queue.pop()!
    visited.push(v)
    const neighbours = [
      { x: v.x - 1, y: v.y },
      { x: v.x + 1, y: v.y },
      { x: v.x, y: v.y - 1 },
      { x: v.x, y: v.y + 1 },
    ]
      .filter((p) => !queue.some((p2) => p.x === p2.x && p.y === p2.y))
      .filter((p) => !visited.some((p2) => p.x === p2.x && p.y === p2.y))
      .filter((p) => p.x >= minX && p.x <= maxX && p.y >= minY && p.y <= maxY)
      .filter((p) => !isOnSomeLine(p, lines))
    queue.push(...neighbours)
  }
  return visited
}

function isOnSomeLine(point: Point, lines: Point[][]) {
  return lines.some((l) => isPointInArea(point, l))
}

function isPointInArea(point: Point, pair: Point[]) {
  const minX = Math.min(pair[0].x, pair[1].x)
  const maxX = Math.max(pair[0].x, pair[1].x)
  const minY = Math.min(pair[0].y, pair[1].y)
  const maxY = Math.max(pair[0].y, pair[1].y)

  return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day9.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}

type CompressedPoint = {
  x: number
  y: number
  realX: number
  realY: number
}
