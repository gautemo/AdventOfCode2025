export function allPairs<T>(points: T[]) {
  const pairs: T[][] = []
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      pairs.push([points[i], points[j]])
    }
  }
  return pairs
}
