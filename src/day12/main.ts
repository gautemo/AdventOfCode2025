const EXTRA_FITS = 2

export function part1(input: string) {
  const regions = getRegions(input)
  let fits = 0
  for (const region of regions) {
    if (Math.floor(region.width / 3) * Math.floor(region.height / 3) + EXTRA_FITS >= region.presents) {
      fits++
    }
  }
  return fits
}

function getRegions(input: string) {
  return input.split('\n\n').at(-1)!.split('\n').map((r) => {
    const [size, presents] = r.split(':')
    const [width, height] = size.split('x').map(Number)
    return {
      width,
      height,
      presents: presents.trim().split(' ').reduce((acc, n) => acc + Number(n), 0),
    }
  })
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day12.txt')
  console.log('Answer part 1 =', part1(input))
}
