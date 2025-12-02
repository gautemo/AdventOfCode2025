import { assertEquals } from '@std/assert'
import { part1, part2 } from './main.ts'

const input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`

Deno.test('part1 example', () => {
  assertEquals(part1(input), 3)
})

Deno.test('part2 example', () => {
  assertEquals(part2(input), 6)
})
