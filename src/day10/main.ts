import { sumOf } from '@std/collections'
import { Arith, init } from '@macil/z3-solver'

const { Context } = await init()
const { Int, Optimize } = Context('main')

export function part1(input: string) {
  const machines = getMachines(input)
  return sumOf(machines, configure)
}

export async function part2(input: string) {
  const machines = getMachines(input)
  let sum = 0
  for (const machine of machines) {
    sum += await configureJoltage(machine)
  }
  return sum
}

function configure(machine: Machine): number {
  const seen = new Set<string>()
  const queue = [{ state: Array(machine.lights.length).fill(false), presses: 0 }]
  while (queue.length > 0) {
    const { state, presses } = queue.shift()!
    if (state.join() === machine.lights.join()) return presses
    machine.buttons.forEach((b) => {
      const newState = stateAfterButton(state, b)
      if (!seen.has(newState.join())) {
        seen.add(newState.join())
        queue.push({ state: newState, presses: presses + 1 })
      }
    })
  }

  throw new Error('did not solve it')
}

function stateAfterButton(state: boolean[], button: number[]) {
  const newState = [...state]
  for (const indicator of button) {
    newState[indicator] = !newState[indicator]
  }
  return newState
}

async function configureJoltage(machine: Machine): Promise<number> {
  const optimizer = new Optimize()

  const buttons = machine.buttons.map((counters, i) => {
    const arith = Int.const(i.toString())
    optimizer.add(arith.ge(0))
    return {
      counters,
      arith,
    }
  })

  machine.joltage.forEach((j, i) => {
    let expression: Arith = Int.val(0)
    for (const button of buttons) {
      if (button.counters.includes(i)) {
        expression = expression.add(button.arith)
      }
    }
    optimizer.add(expression.eq(Int.val(j)))
  })

  const sum = buttons.reduce((acc: Arith, current) => acc.add(current.arith), Int.val(0))
  optimizer.minimize(sum)

  if ((await optimizer.check()) === 'sat') {
    const model = optimizer.model()
    return parseInt(model.eval(sum).toString())
  }
  throw new Error('unable to solve machine')
}

type Machine = {
  lights: boolean[]
  buttons: number[][]
  joltage: number[]
}

function getMachines(input: string): Machine[] {
  return input.split('\n').map((line) => {
    const lights = line
      .match(/\[(?<lights>(\.|#)+)]/)!
      .groups!.lights.split('')
      .map((c) => c === '#')
    const buttons = [...line.matchAll(/\((?<inside>\d(?:,\d)*)\)/g)].map((b) =>
      b.groups!.inside!.split(',').map(Number)
    )
    const joltage = line
      .match(/{(?<joltage>\d+(?:,\d+)*)}/)!
      .groups!.joltage.split(',')
      .map(Number)
    return { lights, buttons, joltage }
  })
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day10.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', await part2(input))
  Deno.exit()
}
