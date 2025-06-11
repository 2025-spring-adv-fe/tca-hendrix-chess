import { GeneralFacts, LeaderboardEntry } from "./GameResults";
import { useEffect, useState } from "react";
import ChessGame from "./ChessGame";

export const AppTitle = "Hendrix's Chess Game";

interface HomeProps {
  totalGameCount: number;
  setTitle: (t: string) => void;
  leaderboardData: LeaderboardEntry[];
  generalFacts: GeneralFacts;
  gamesByMonthData: Array<[string, number]>;
  chessMoves: string[];
  setChessMoves: (moves: string[], inCheck: boolean) => void;
  isCheck: boolean;
}

export const Home: React.FC<HomeProps> = ({
  setTitle,
  chessMoves,
  setChessMoves,
  isCheck,
}) => {

  // 1️⃣ Start/End game control
  const [gameStarted, setGameStarted] = useState(false);

  // 2️⃣ Per-player timers
  const [whiteTime, setWhiteTime] = useState(0);
  const [blackTime, setBlackTime] = useState(0);
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);

  // Only run timers when gameStarted is true
  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      if (isWhiteTurn) setWhiteTime((t) => t + 1);
      else setBlackTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isWhiteTurn, gameStarted]);

  // Set page title
  useEffect(() => {
    setTitle(AppTitle);
  }, [setTitle]);

  return (
    <>
      <h3 className="text-2xl font-bold mb-4">Home</h3>

      {/* Start button */}
      {!gameStarted && (
        <button
          onClick={() => {
            setGameStarted(true);
            setChessMoves([], false);
            setWhiteTime(0);
            setBlackTime(0);
            setIsWhiteTurn(true);
          }}
          className="btn btn-primary mb-4"
        >
          Start Game
        </button>
      )}

      {/* End/Reset button */}
      {gameStarted && (
        <button
          onClick={() => {
            setGameStarted(false);
            setChessMoves([], false);
            setWhiteTime(0);
            setBlackTime(0);
            setIsWhiteTurn(true);
          }}
          className="btn btn-outline btn-error mb-4"
        >
          End Game / Reset
        </button>
      )}

      {/* 3️⃣ Chessboard + header + check alert */}
      <div
        className={`my-6 transition-opacity ${
          gameStarted ? "opacity-100 pointer-events-auto" : "opacity-50 pointer-events-none"
        }`}
      >
        <h2 className="text-xl font-bold mb-2">Hendrix's Chess Game</h2>
        {isCheck && (
          <span className="text-red-500 text-sm font-semibold animate-pulse block mb-2">
            ♟ Check! The king is in check!
          </span>
        )}
        <ChessGame
          moves={chessMoves}
          onMoveUpdate={setChessMoves}
          onTurnChange={setIsWhiteTurn}
        />
      </div>

      {/* Move History Companion */}
      {gameStarted && (
        <div className="rounded-2xl shadow-lg p-4 w-full max-w-md mt-6 bg-gray-100 text-gray-900 dark:bg-base-200 dark:text-white border border-gray-300 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3">Move History Companion</h2>

          <div className="flex gap-6 text-sm font-semibold mb-2 text-gray-900 dark:text-gray-200">
            <span>♙ White Time: {whiteTime}s</span>
            <span>♟ Black Time: {blackTime}s</span>
          </div>

          <div className="max-h-64 overflow-y-auto rounded-md border border-gray-300 dark:border-gray-700">
            <table className="w-full text-sm text-left table-auto">
              <thead className="sticky top-0 bg-gray-200 dark:bg-base-300 text-gray-900 dark:text-gray-100 font-semibold">
                <tr>
                  <th className="py-2 px-3">Turn</th>
                  <th className="py-2 px-3">White</th>
                  <th className="py-2 px-3">Black</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 dark:divide-gray-600 text-gray-900 dark:text-gray-100">
                {Array.from({ length: Math.ceil(chessMoves.length / 2) }).map((_, i) => (
                  <tr key={i} className="hover:bg-gray-100 dark:hover:bg-base-100 transition">
                    <td className="py-2 px-3">{i + 1}</td>
                    <td className="py-2 px-3">{chessMoves[i * 2] || ""}</td>
                    <td className="py-2 px-3">{chessMoves[i * 2 + 1] || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
