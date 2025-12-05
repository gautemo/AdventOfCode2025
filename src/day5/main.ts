import { minOf, sumOf } from '@std/collections'

export function part1(input: string) {
  const [rangesInput, ingredientsInput] = input.split('\n\n')
  const ranges = rangesInput.split('\n').map((line) => line.split('-').map(Number))
  const ingredients = ingredientsInput.split('\n').map(Number)
  return ingredients.filter((ingredient) => ranges.some((range) => range[0] <= ingredient && ingredient <= range[1]))
    .length
}

export function part2(input: string) {
  const ranges = input
    .split('\n\n')[0]
    .split('\n')
    .map((line) => line.split('-').map(Number))
  for (let i = ranges.length - 1; i >= 0; i--) {
    const others = [...ranges.slice(0, i), ...ranges.slice(i + 1)]
    if (others.some((o) => isSubsetOf(ranges[i], o))) {
      ranges.splice(i, 1)
    }
  }
  for (const range of ranges) {
    range[1] = minOf(ranges, (r) => (r[0] > range[0] && r[0] <= range[1] ? r[0] - 1 : range[1]))!
  }
  return sumOf(ranges, ([from, to]) => to + 1 - from)
}

function isSubsetOf(a: number[], b: number[]) {
  return a[0] >= b[0] && a[1] <= b[1]
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day5.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
