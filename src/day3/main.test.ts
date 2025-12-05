import { assertEquals } from '@std/assert'
import { part1, part2 } from './main.ts'

const input = `987654321111111
811111111111119
234234234234278
818181911112111`

Deno.test('part1 example', () => {
  assertEquals(part1(input), 357)
})

Deno.test('part2 example', () => {
  assertEquals(part2(input), 3121910778619)
})
