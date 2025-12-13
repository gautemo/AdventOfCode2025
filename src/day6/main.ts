import { sumOf } from '@std/collections'

export function part1(input: string) {
  const problems = getVerticalProblems(input)
  return sumOf(problems, (problem) => answerToProblem(problem))
}

export function part2(input: string) {
  const problems = getVerticalProblems(input).map((problem) => {
    return {
      symbol: problem.symbol,
      numbers: toColumnNumbers(problem.numbers),
    }
  })
  return sumOf(problems, (problem) => answerToProblem(problem))
}

function getVerticalProblems(input: string) {
  const rows = input.split('\n')
  const fullColumnSpaces = [-1]
  for (let i = 0; i < rows[0].length; i++) {
    if (rows.every((r) => r[i] === ' ')) {
      fullColumnSpaces.push(i)
    }
  }
  return rows
    .at(-1)!
    .match(/\*|\+/g)!
    .map((symbol, i) => {
      return {
        symbol,
        numbers: rows.slice(0, -1).map((row) => {
          return row.slice(fullColumnSpaces[i] + 1, fullColumnSpaces[i + 1])
        }),
      }
    })
}

function toColumnNumbers(numbers: string[]) {
  const columns: string[] = []
  for (let i = numbers[0].length - 1; i >= 0; i--) {
    let number = ''
    for (const n of numbers) {
      number += n[i]
    }
    columns.push(number)
  }
  return columns
}

function answerToProblem(problem: { symbol: string; numbers: string[] }) {
  return problem.numbers.map(Number).reduce((acc, current) => {
    if (problem.symbol === '+') {
      return acc + current
    }
    return acc * current
  })
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day6.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
