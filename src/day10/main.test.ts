import { assertEquals } from '@std/assert'
import { part1, part2 } from './main.ts'

const input = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`

Deno.test('part1 example', () => {
  assertEquals(part1(input), 7)
})

Deno.test('part2 example', async () => {
  assertEquals(await part2(input), 33)
})
