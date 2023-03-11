import React, { useCallback, useMemo, useState } from "react";
const sqarray = [...Array(9)];
const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const handlePlayClick = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // set the audio time to 0 to ensure it plays from the beginning
      audioRef.current.play();
    }
  }, []);
  const calculateWinner = useCallback((squares: Array<string | Number>) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }, []);
  const winner = useMemo(
    () => calculateWinner(squares),
    [calculateWinner, squares]
  );
  let status = useMemo(() => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (!squares.includes(null)) {
      return "Draw";
    } else {
      return `Next player: ${xIsNext ? "X" : "O"}`;
    }
  }, [squares, winner, xIsNext]);

  const handleClick = useCallback(
    (i: number) => {
      const squaresCopy = [...squares];
      if (winner || squaresCopy[i]) return;
      squaresCopy[i] = xIsNext ? "X" : "O";
      handlePlayClick();
      setSquares(squaresCopy);
      setXIsNext(!xIsNext);
    },
    [handlePlayClick, squares, winner, xIsNext]
  );

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const renderSquare = (i: number) => (
    <button
      className="bg-[#0d3b66] h-24 w-24 border-8 border-[#a0bedb] rounded-2xl  flex items-center justify-center text-6xl font-bold cursor-pointer hover:bg-[#0d2f50] transition-colors duration-300 ease-in-out text-[#fff]"
      onClick={() => handleClick(i)}
    >
      {squares[i]}
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0d2f50]">
      <audio ref={audioRef}>
        <source src="/sounds/sound.mp3" type="audio/mp3" />
      </audio>
      <h1 className="text-4xl font-bold text-white mb-6">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-10 bg-[#0d3b66] p-6 rounded-xl shadow-lg border-8 border-[#a0bedb]">
        {sqarray.map((_, i) => {
          return renderSquare(i);
        })}
      </div>
      <p className="text-2xl font-bold text-white mt-6">{status}</p>
      {winner || !squares.includes(null) ? (
        <button
          className="text-xl font-mono bg-white mt-6 p-4 rounded-xl cursor-pointer"
          onClick={handleReset}
        >
          Restart Game !{" "}
        </button>
      ) : null}
    </div>
  );
};

export default App;
