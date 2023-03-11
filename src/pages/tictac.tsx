import React, { useState } from 'react';
const App = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else if (!squares.includes(null)) {
        status = "Draw";
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
    const handleClick = (i: string | number) => {
        const squaresCopy = [...squares];
        if (winner || squaresCopy[i]) return;
        squaresCopy[i] = xIsNext ? 'X' : 'O';
        setSquares(squaresCopy);
        setXIsNext(!xIsNext);
    };
    const handleReset = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    };

    const renderSquare = (i: number) => (
        <button
            className="bg-white h-20 w-20 border border-gray-400  flex items-center justify-center text-6xl font-bold cursor-pointer hover:bg-gray-100 transition-colors duration-300 ease-in-out"
            onClick={() => handleClick(i)}
        >
            {squares[i]}
        </button>
    );

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-400 to-blue-500">
            <h1 className="text-4xl font-bold text-white mb-6">Tic Tac Toe</h1>
            <div className="grid grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-lg">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <p className="text-2xl font-bold text-white mt-6">{status}</p>
            {winner || !squares.includes(null) ? (
                <button className='text-xl font-mono bg-white mt-6 p-4 rounded-xl cursor-pointer' onClick={handleReset} >Restart Game ! </button>
            ) : null}

        </div>
    );
};

const calculateWinner = (squares: any[]) => {
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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

export default App;
