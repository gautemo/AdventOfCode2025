import { assertEquals } from '@std/assert'
import { part1 } from './main.ts'

const input = `0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2`

Deno.test('part1 example', () => {
  assertEquals(part1(input), 2)
})
