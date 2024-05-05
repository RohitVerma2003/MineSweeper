import { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const row = 10;
  const col = 10;

  const [board, setBoard] = useState([]);
  const [over, setOver] = useState(false);
  const [resetEmoji, setResetEmoji] = useState("😊");

  useEffect(() => {
    resetBoard();
  }, []);

  const resetBoard = () => {
    let newBoard = new Array(row).fill(0);
    newBoard = newBoard.map(() => new Array(col).fill(""));

    for (let i = 0; i < 25; i++) {
      const num = Math.floor(Math.random() * 99);
      const boardRow = parseInt(num / 10);
      const boardCol = parseInt(num % 10);

      if (newBoard[boardRow][boardCol] !== "💣")
        newBoard[boardRow][boardCol] = "💣";
      else i--;
    }
    setBoard(newBoard);
    setOver(false);
  };

  var updateBoard = function (click) {
    const clickRow = click[0];
    const clickCol = click[1];

    if (board[clickRow][clickCol] === "💣") {
      let newBoard = [...board];
      newBoard[clickRow][clickCol] = "💥";
      setBoard(newBoard);
      setOver(true);
      return;
    }

    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];

    let mapping = new Array(board.length).fill(0);
    mapping = mapping.map(() => new Array(board[0].length).fill(false));
    let q = [click];
    mapping[clickRow][clickCol] = true;

    while (q.length) {
      const front = q.shift();
      let mineCount = 0;
      let temp = [];

      directions.forEach((ele) => {
        let newRow = ele[0] + front[0];
        let newCol = ele[1] + front[1];

        if (
          newRow >= 0 &&
          newRow < board.length &&
          newCol >= 0 &&
          newCol < board[0].length
        ) {
          const newCell = board[newRow][newCol];

          if (newCell === "💣") mineCount++;
          else if (newCell === "") temp.push([newRow, newCol]);
        }
      });

      if (mineCount > 0) {
        board[front[0]][front[1]] = mineCount.toString();
      } else {
        board[front[0]][front[1]] = "💎";

        temp.forEach((ele) => {
          if (!mapping[ele[0]][ele[1]]) {
            q.push(ele);
            mapping[ele[0]][ele[1]] = true;
          }
        });
      }
    }

    setBoard([...board]);
  };

  return (
    <>
      <div
        onMouseDown={() => setResetEmoji("😲")}
        onMouseUp={() => setResetEmoji("😊")}
        className="App grid"
        style={{ "--rows": row, "--cols": col }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => (
            <button
              key={`${i}-${j}`}
              className={`box`}
              onClick={() => updateBoard([i, j])}
              disabled={over && cell !== "💣" ? true : false}
            >
              {over || cell === "💎" || (cell !== "" && cell !== "💣")
                ? cell
                : ""}
            </button>
          ))
        )}
      </div>
      <div className="btn">
        <button onClick={resetBoard}>{over ? "💀" : resetEmoji}</button>
      </div>
    </>
  );
}
