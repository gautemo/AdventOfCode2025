import { assertEquals } from '@std/assert'
import { part1, part2 } from './main.ts'

const input = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`

Deno.test('part1 example', () => {
  assertEquals(part1(input), 50)
})

Deno.test('part2 example', () => {
  assertEquals(part2(input, 1), 24)
})
