export function part1(input: string) {
  return invalidIdsSum(input, /^(\d+)\1$/)
}

export function part2(input: string) {
  return invalidIdsSum(input, /^(\d+)\1+$/)
}

function invalidIdsSum(input: string, isInvalid: RegExp) {
  let sum = 0
  const ranges = input.split(',')
  for (const range of ranges) {
    const [from, to] = range.split('-').map(Number)
    for (let i = from; i <= to; i++) {
      if (isInvalid.test(i.toString())) {
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
