import { sumOf } from '@std/collections'
import { linesWithDigits } from '../common/input.ts'

export function part1(input: string) {
  return sumOf(linesWithDigits(input), (bank) => {
    return Number(bestNumber(bank, 2).join(''))
  })
}

export function part2(input: string) {
  return sumOf(linesWithDigits(input), (bank) => {
    return Number(bestNumber(bank, 12).join(''))
  })
}

function bestNumber(batteries: number[], left: number): number[] {
  if (left === 0) return []
  const bestIndex = batteries.slice(0, batteries.length - (left - 1)).findIndex((n, _, arr) => !arr.some((b) => b > n))
  return [batteries[bestIndex], ...bestNumber(batteries.slice(bestIndex + 1), left - 1)]
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day3.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
