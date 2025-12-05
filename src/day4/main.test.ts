import { assertEquals } from '@std/assert'
import { part1, part2 } from './main.ts'

const input = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`

Deno.test('part1 example', () => {
  assertEquals(part1(input), 13)
})

Deno.test('part2 example', () => {
  assertEquals(part2(input), 43)
})
