import { assertEquals } from '@std/assert'
import { part1, part2 } from './main.ts'

const input = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`

Deno.test('part1 example', () => {
  assertEquals(part1(input), 3)
})

Deno.test('part2 example', () => {
  assertEquals(part2(input), 14)
})
