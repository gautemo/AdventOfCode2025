export function part1(input: string) {
  let dial = 50
  let sum = 0
  for (const { dir, dist } of getRotations(input)) {
    for (let i = 0; i < Number(dist); i++) {
      dial = rotate(dial, dir)
    }
    if (dial === 0) {
      sum++
    }
  }
  return sum
}

export function part2(input: string) {
  let dial = 50
  let sum = 0
  for (const { dir, dist } of getRotations(input)) {
    for (let i = 0; i < Number(dist); i++) {
      dial = rotate(dial, dir)
      if (dial === 0) {
        sum++
      }
    }
  }
  return sum
}

function getRotations(input: string) {
  return input.split('\n').map((line) => {
    return line.match(/(?<dir>R|L)(?<dist>\d+)/)!.groups as { dir: 'L' | 'R'; dist: string }
  })
}

function rotate(number: number, dir: 'L' | 'R', min = 0, max = 99) {
  const next = number + (dir === 'L' ? -1 : 1)
  if (next < min) return max
  if (next > max) return min
  return next
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day1.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
