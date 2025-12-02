import { chunk } from '@std/collections/chunk'

export function part1(input: string) {
  return invalidIdsSum(input, (id) => {
    return id.slice(0, id.length / 2) === id.slice(id.length / 2)
  })
}

export function part2(input: string) {
  return invalidIdsSum(input, (id) => {
    for (let chunkSize = 1; chunkSize <= id.length / 2; chunkSize++) {
      const chunks = chunk(id, chunkSize).map((c) => c.join(''))
      if (chunks.every((c) => c === chunks[0])) {
        return true
      }
    }
    return false
  })
}

function invalidIdsSum(input: string, isInalid: (id: string) => boolean) {
  const ranges = input.split(',')
  let sum = 0
  for (const range of ranges) {
    const [from, to] = range.split('-')
    for (let i = Number(from); i <= Number(to); i++) {
      if (isInalid(i.toString())) {
        sum += i
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
