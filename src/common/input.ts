export function linesWithDigits(input: string) {
  return input.split('\n').map((line) => line.split('').map(Number))
}
