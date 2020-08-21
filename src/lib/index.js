export const SIZE = 4;

const OPERAND = Array.from(Array(SIZE), (_, i) => i + 1);
const initialCells = Array.from(Array(SIZE * SIZE), (_, i) => i + 1);

const HORIZONTAL = OPERAND.map((number, index) =>
  initialCells.slice(index * SIZE, number * SIZE)
); // 가로

const VERTICAL = OPERAND.map((_, index) =>
  initialCells.filter((num) => num % SIZE === index)
); // 세로

const LEFT_DIAGONAL = OPERAND.map((_, index) => (SIZE + 1) * index + 1);

const RIGHT_DIAGONAL = OPERAND.map((_, index) => (SIZE - 1) * index + SIZE);

export const EVENTLINES = [
  ...HORIZONTAL,
  ...VERTICAL,
  LEFT_DIAGONAL,
  RIGHT_DIAGONAL,
];
