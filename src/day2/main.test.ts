import { assertEquals } from '@std/assert'
import { part1, part2 } from './main.ts'

const input =
  `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`

Deno.test('part1 example', () => {
  assertEquals(part1(input), 1227775554)
})

Deno.test('part2 example', () => {
  assertEquals(part2(input), 4174379265)
})
