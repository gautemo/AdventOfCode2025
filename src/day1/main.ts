// deno-lint-ignore no-unused-vars
export function part1(input: string) {
  return 0
}

// deno-lint-ignore no-unused-vars
export function part2(input: string) {
  return 0
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day1.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
