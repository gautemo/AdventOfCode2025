import { sumOf } from '@std/collections'

export function part1(input: string) {
  const devices = getDevices(input)
  return paths('you', devices, 'out')
}

const cache = new Map<string, number>()
function paths(on: string, devices: Device[], goal: string): number {
  const cacheKey = `${on}-${goal}`
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!
  }
  if (on === goal) return 1
  const device = devices.find((d) => d.name === on)
  const sum = sumOf(device?.outputs ?? [], (p) => paths(p, devices, goal))
  cache.set(cacheKey, sum)
  return sum
}

export function part2(input: string) {
  cache.clear()
  const devices = getDevices(input)
  const dacToFft = paths('dac', devices, 'fft')
  if (dacToFft > 0) {
    const svrToDac = paths('svr', devices, 'dac')
    const fftToOut = paths('fft', devices, 'out')
    return dacToFft * svrToDac * fftToOut
  }
  const svrToDac = paths('svr', devices, 'fft')
  const fftToDac = paths('fft', devices, 'dac')
  const dacToOut = paths('dac', devices, 'out')
  return svrToDac * fftToDac * dacToOut
}

type Device = {
  name: string
  outputs: string[]
}

function getDevices(input: string): Device[] {
  return input.split('\n').map((row) => {
    const [name, outputInput] = row.split(':')
    return {
      name,
      outputs: outputInput.trim().split(' '),
    }
  })
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day11.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
