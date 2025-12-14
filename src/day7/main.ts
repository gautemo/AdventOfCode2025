import { sumOf } from '@std/collections'

export function part1(input: string) {
  return runBeams(input).splits
}

export function part2(input: string) {
  return runBeams(input).timelines
}

function runBeams(input: string) {
  const grid = toGrid(input.replace('S', '|'))
  let splits = 0
  for (let y = 0; y < grid.length - 1; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x].symbol === '|') {
        const below = grid[y + 1][x].symbol
        if (below === '^') {
          splits++
          grid[y + 1][x - 1].symbol = '|'
          grid[y + 1][x - 1].timelines += grid[y][x].timelines
          grid[y + 1][x + 1].symbol = '|'
          grid[y + 1][x + 1].timelines += grid[y][x].timelines
        } else {
          grid[y + 1][x].symbol = '|'
          grid[y + 1][x].timelines += grid[y][x].timelines
        }
      }
    }
  }
  return {
    splits,
    timelines: sumOf(grid.at(-1)!, ({ timelines }) => timelines),
  }
}

function toGrid(input: string) {
  const grid: { symbol: string; timelines: number }[][] = []
  const rows = input.split('\n')
  for (let y = 0; y < rows.length; y++) {
    const row: { symbol: string; timelines: number }[] = []
    for (let x = 0; x < rows[y].length; x++) {
      row.push({ symbol: rows[y][x], timelines: rows[y][x] === '|' ? 1 : 0 })
    }
    grid.push(row)
  }
  return grid
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day7.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
