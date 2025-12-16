import { allPairs } from '../common/utils.ts'

export function part1(input: string, nrOfConnections = 1000) {
  const points = input.split('\n')
  const circuits = allPairs(points)
    .toSorted((a, b) => distanceBetween(a[0], a[1]) - distanceBetween(b[0], b[1]))
    .slice(0, nrOfConnections)
    .map((pair) => new Set(pair))
  mergeCircuits(circuits)
  return circuits
    .toSorted((a, b) => b.size - a.size)
    .slice(0, 3)
    .map((c) => c.size)
    .reduce((acc, current) => acc * current)
}

export function part2(input: string) {
  const points = input.split('\n')
  const pairs = allPairs(points).toSorted((a, b) => distanceBetween(a[0], a[1]) - distanceBetween(b[0], b[1]))
  const circuits: Set<string>[] = []
  for (const pair of pairs) {
    circuits.push(new Set([pair[0], pair[1]]))
    mergeCircuits(circuits)
    if (circuits.length === 1 && points.every((p) => circuits[0].has(p))) {
      const [aX] = pair[0].split(',').map(Number)
      const [bX] = pair[1].split(',').map(Number)
      return aX * bX
    }
  }
  return -1
}

function mergeCircuits(circuits: Set<string>[]) {
  loop: while (true) {
    for (let i = 0; i < circuits.length; i++) {
      for (let j = i + 1; j < circuits.length; j++) {
        if (!circuits[i].isDisjointFrom(circuits[j])) {
          circuits[i] = circuits[i].union(circuits[j])
          circuits.splice(j, 1)
          continue loop
        }
      }
    }
    return
  }
}

function distanceBetween(a: string, b: string) {
  const [aX, aY, aZ] = a.split(',').map(Number)
  const [bX, bY, bZ] = b.split(',').map(Number)
  return Math.sqrt((aX - bX) ** 2 + (aY - bY) ** 2 + (aZ - bZ) ** 2)
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day8.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
