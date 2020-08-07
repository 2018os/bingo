const diagonalLine = [
  [1, 7, 13, 19, 25],
  [5, 9, 13, 17, 21],
]; // 대각선
const horizontalLine = [1, 6, 11, 16, 21].map((number) => {
  return [number, number + 1, number + 2, number + 3, number + 4];
}); // 가로
const verticalLine = [1, 2, 3, 4, 5].map((number) => {
  return [number, number + 5, number + 10, number + 15, number + 20];
}); // 세로

export const eventLines = [...horizontalLine, ...verticalLine, ...diagonalLine];
