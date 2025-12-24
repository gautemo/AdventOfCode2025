export function part1(input: string) {
  const shapes: string[] = []
  const regions: { width: number; height: number; presents: number[] }[] = []
  for (const section of input.split('\n\n')) {
    if (/^\d+:/.test(section)) {
      shapes.push(section.replace(/^\d+:\n/, ''))
    } else {
      for (const region of section.split('\n')) {
        const [size, presents] = region.split(':')
        const [width, height] = size.split('x').map(Number)
        regions.push({
          width,
          height,
          presents: presents.trim().split(' ').map(Number),
        })
      }
    }
  }
  let fits = 0
  for (const region of regions) {
    const figuresX = Math.floor(region.width / 3)
    const figuresY = Math.floor(region.height / 3)
    const figures = figuresX * figuresY
    const requires = region.presents.reduce((acc, p) => acc + p)
    if (figures >= requires) {
      fits++
    } else {
      const overRequires = requires - figures
      const avaragePresentSpots = region.presents
        .map((n, i) => [...shapes[i]].filter((c) => c === '#').length * n)
        .reduce((acc, v) => acc + v) / requires
      const freeSpace = ((region.width % 3) * region.height) + ((region.height % 3) * region.width) +
        (figures * (9 - avaragePresentSpots))
      if (freeSpace > (overRequires ** 2) * avaragePresentSpots) {
        fits++
      }
    }
  }
  return fits
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day12.txt')
  console.log('Answer part 1 =', part1(input))
}
