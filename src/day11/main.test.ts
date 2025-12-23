import { assertEquals } from '@std/assert'
import { part1, part2 } from './main.ts'

Deno.test('part1 example', () => {
  const input = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`
  assertEquals(part1(input), 5)
})

Deno.test('part2 example', () => {
  const input = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`
  assertEquals(part2(input), 2)
})
