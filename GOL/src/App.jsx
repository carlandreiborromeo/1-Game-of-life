import  { useState, useCallback, useEffect } from "react";
import "../../GOL/src/App.css";
const numRows = 25;
const numCols = 25;

const operations = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

const generateEmptyGrid = () => {
  return Array.from({ length: numRows }, () => Array(numCols).fill(0));
};

export default function GameOfLife() {
  const [grid, setGrid] = useState(generateEmptyGrid());
  const [running, setRunning] = useState(false);

  const runSimulation = useCallback(() => {
    if (!running) return;

    setGrid((g) => {
      const newGrid = g.map((row, i) =>
        row.map((cell, j) => {
          let neighbors = 0;
          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
              neighbors += g[newI][newJ];
            }
          });

          if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
            return 0;
          } else if (cell === 0 && neighbors === 3) {
            return 1;
          }
          return cell;
        })
      );
      return newGrid;
    });

    setTimeout(runSimulation, 100);
  }, [running]);

  useEffect(() => {
    if (running) runSimulation();
  }, [running, runSimulation]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <button onClick={() => setRunning((r) => !r)}>
        {running ? "Stop" : "Start"}
      </button>
      <button onClick={() => setGrid(generateEmptyGrid())}>Clear</button>
      <button
        onClick={() => {
          setGrid(() => {
            return Array.from({ length: numRows }, () =>
              Array.from({ length: numCols }, () => (Math.random() > 0.7 ? 1 : 0))
            );
          });
        }}
      >
        Random
      </button>
      <div
        className="grid gap-0.5 border border-gray-500"
        style={{ display: "grid", gridTemplateColumns: `repeat(${numCols}, 20px)` }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => {
                const newGrid = [...grid];
                newGrid[i] = [...grid[i]];
                newGrid[i][j] = grid[i][j] ? 0 : 1;
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][j] ? "black" : "white",
                border: "1px solid gray",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
