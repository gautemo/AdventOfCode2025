import { mapOfPoints } from '../common/input.ts'
import { isNeighbour, type Point } from '../common/point.ts'

export function part1(input: string) {
  const rolls = mapOfPoints(input, '@')
  return rollsToBeRemoved(rolls).length
}

export function part2(input: string) {
  let rolls = mapOfPoints(input, '@')
  const startRollsSize = rolls.length
  while (true) {
    const removed = rollsToBeRemoved(rolls)
    if (removed.length === 0) {
      return startRollsSize - rolls.length
    }
    rolls = rolls.filter((r) => !removed.some((r2) => r.x === r2.x && r.y === r2.y))
  }
}

function rollsToBeRemoved(rolls: Point[]) {
  return rolls.filter((roll) => rolls.filter((roll2) => isNeighbour(roll, roll2)).length < 4)
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day4.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
