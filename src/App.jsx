import { useState } from "react";
import { PlayerInfo } from "./components/PlayerInfo";
import { GameBoard } from "./components/GameBoard";
import { GameOver } from "./components/GameOver";
import { Log } from "./components/Log";
import { initBoard } from "./initBoard";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
    X: "Player 1",
    O: "Player 2",
};

function deriveGameBoard(gameTurns) {
    const gameBoard = [...initBoard.map((row) => [...row])];
    for (const turn of gameTurns) {
        const { row, col } = turn.square;
        gameBoard[row][col] = turn.player;
    }

    return gameBoard;
}

function deriveWinner(gameBoard, players) {
    let winner;
    for (const comb of WINNING_COMBINATIONS) {
        const firstSymbol = gameBoard[comb[0][0]][comb[0][1]];
        const secondSymbol = gameBoard[comb[1][0]][comb[1][1]];
        const thirdSymbol = gameBoard[comb[2][0]][comb[2][1]];

        if (
            firstSymbol &&
            firstSymbol === secondSymbol &&
            firstSymbol === thirdSymbol
        ) {
            winner = players[firstSymbol];
        }
    }
    return winner;
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [players, setPlayers] = useState(PLAYERS);

    const gameBoard = deriveGameBoard(gameTurns);

    function getCurrentPlayer(gameTurns) {
        let currentPlayer = "X";
        if (gameTurns.length > 0 && gameTurns[0].player === "X")
            currentPlayer = "O";
        return currentPlayer;
    }
    const activePlayer = getCurrentPlayer(gameTurns);

    function handleSelectSquare(rowIndex, colIndex) {
        setGameTurns((prevTurns) => {
            const currentPlayer = getCurrentPlayer(prevTurns);

            const updatedTurns = [
                {
                    square: { row: rowIndex, col: colIndex },
                    player: currentPlayer,
                },
                ...prevTurns,
            ];

            return updatedTurns;
        });
    }

    const winner = deriveWinner(gameBoard, players);

    const draw = !winner && gameTurns.length === 9;

    function handleRematch() {
        setGameTurns([]);
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayers((prevPlayers) => {
            return {
                ...prevPlayers,
                [symbol]: newName,
            };
        });
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <PlayerInfo
                        initName={PLAYERS.X}
                        symbol="X"
                        isActive={activePlayer === "X"}
                        handlePlayerName={handlePlayerNameChange}
                    />
                    <PlayerInfo
                        initName={PLAYERS.O}
                        symbol="O"
                        isActive={activePlayer === "O"}
                        handlePlayerName={handlePlayerNameChange}
                    />
                </ol>
                {(winner || draw) && (
                    <GameOver winner={winner} onRestart={handleRematch} />
                )}
                <GameBoard
                    onSelectSquare={handleSelectSquare}
                    gameBoard={gameBoard}
                />
            </div>

            <Log turns={gameTurns} />
        </main>
    );
}

export default App;
