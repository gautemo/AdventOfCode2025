import { assertEquals } from '@std/assert'
import { part1, part2 } from './main.ts'

const input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `

Deno.test('part1 example', () => {
  assertEquals(part1(input), 4277556)
})

Deno.test('part2 example', () => {
  assertEquals(part2(input), 3263827)
})
