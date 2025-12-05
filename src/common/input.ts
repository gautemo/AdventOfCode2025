import type { Point } from './point.ts'

export function linesWithDigits(input: string) {
  return input.split('\n').map((line) => line.split('').map(Number))
}

export function mapOfPoints(input: string, char: string): Point[] {
  const points: Point[] = []
  const lines = input.split('\n')
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === char) {
        points.push({ x, y })
      }
    }
  }
  return points
}
