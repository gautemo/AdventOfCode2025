import { chunk } from '@std/collections/chunk'

export function part1(input: string) {
  return invalidIdsSum(input)
}

export function part2(input: string) {
  return invalidIdsSum(input, true)
}

function invalidIdsSum(input: string, multipleRepeats = false) {
  const ranges = input.split(',')
  let sum = 0
  for (const range of ranges) {
    const [from, to] = range.split('-')
    for (let i = Number(from); i <= Number(to); i++) {
      if (multipleRepeats) {
        for (let j = 1; j <= i.toString().length / 2; j++) {
          const chunks = chunk(i.toString(), j).map((c) => c.join(''))
          if (chunks.every((c) => c === chunks[0])) {
            sum += i
            break
          }
        }
      } else {
        if (i.toString().slice(0, i.toString().length / 2) === i.toString().slice(i.toString().length / 2)) {
          sum += i
        }
      }
    }
  }
  return sum
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day2.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
