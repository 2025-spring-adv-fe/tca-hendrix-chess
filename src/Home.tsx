import { useNavigate } from "react-router"
import { GeneralFacts, LeaderboardEntry } from "./GameResults";
import { useEffect, useState } from "react";
import ChessGame from './ChessGame';

export const AppTitle = "Hendrix's Chess Game";

interface HomeProps {
  totalGameCount: number;
  setTitle: (t: string) => void;
  leaderboardData: LeaderboardEntry[];
  generalFacts: GeneralFacts;
  gamesByMonthData: Array<[string, number]>
  chessMoves: string[];
  setChessMoves: (moves: string[], inCheck: boolean) => void;
  isCheck: boolean;
};


export const Home: React.FC<HomeProps> = ({
  //totalGameCount
    setTitle
  , leaderboardData
  , generalFacts
  , gamesByMonthData
  , chessMoves
  , setChessMoves
  , isCheck
}) => {


  // Start Button Logic
  const [gameStarted, setGameStarted] = useState(false);

  // Some timer logic //
  const [whiteTime, setWhiteTime] = useState(0);
  const [blackTime, setBlackTime] = useState(0);
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isWhiteTurn) {
        setWhiteTime((prev) => prev + 1);
      } else {
        setBlackTime((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isWhiteTurn]);
  ///////



  useEffect(
    () => setTitle(AppTitle)
  );




  const nav = useNavigate();
  return (
    <>
      <h3
        className='text-2xl font-bold'
      >
        Home
      </h3>

      {false && (
        <button
          className='btn btn-active btn-secondary btn-large'
          onClick={
            () => nav("/setup")
          }
        >
          Play Chess
        </button>
      )}



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





      <div className="my-6">
        <h2 className="text-xl font-bold mb-2"></h2>
        {isCheck && (

          <span className="text-red-500 text-sm font-semibold animate-pulse">
            ♟ Check! The king is in check!
          </span>
        )}
        <ChessGame
          moves={chessMoves}
          onMoveUpdate={setChessMoves}
          onTurnChange={setIsWhiteTurn}
        />

      </div>


      {/* ^ This code alerts the user if the king is in check! Animates as well! ^  */}

      {/* This code provides the stylying and logic to display the alternating moves in a table. */}

{gameStarted && (
<div className="rounded-2xl shadow-lg p-4 w-full max-w-md mt-6 bg-gray-100 text-gray-900 dark:bg-base-200 dark:text-white border border-gray-300 dark:border-gray-700">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
      Move History Companion
    </h2>

    <div className="flex gap-6 text-sm font-semibold mb-2 text-gray-800 dark:text-white">
      <span>♙ White Time: {whiteTime}s</span>
      <span>♟ Black Time: {blackTime}s</span>
    </div>

    <div className="max-h-64 overflow-y-auto rounded-md border border-gray-300 dark:border-gray-700">
      <table className="w-full text-sm text-left table-auto">
        <thead className="sticky top-0 bg-gray-200 dark:bg-base-300 text-black dark:text-white font-semibold">
          <tr>
            <th className="py-2 px-3">Turn</th>
            <th className="py-2 px-3">White</th>
            <th className="py-2 px-3">Black</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300 dark:divide-gray-600 text-black dark:text-white">
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





      {/* ^ This code provides the stylying and logic to display the alternating moves in a table. ^ */}

      {false && (
        <div className="card w-96 bg-base-100 card-md shadow-lg">
          <div className="card-body">
            <h2 className="card-title">General</h2>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}

                <tbody>

                  <tr>
                    <td>Last Played</td>
                    <th>{generalFacts.lastPlayed}</th>
                  </tr>

                  <tr>
                    <td>Total Games</td>
                    <th>{generalFacts.totalGames}</th>
                  </tr>

                  <tr>
                    <td>Shortest Game</td>
                    <th>{generalFacts.shortestGame}</th>
                  </tr>

                  <tr>
                    <td>Longest Game</td>
                    <th>{generalFacts.longestGame}</th>
                  </tr>
                  <tr>
                    <td>AVG Turns per Game</td>
                    <th>{generalFacts.avgTurnsPerGame}</th>
                  </tr>

                </tbody>
              </table>
            </div>


          </div>
        </div>
      )}


      {false && (
        <div className="card w-96 bg-base-100 card-md shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Leaderboard</h2>

            {
              leaderboardData.length > 0
                ? (
                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>WINS</th>
                          <th>LOSSES</th>
                          <th>AVERAGE</th>
                          <th>PLAYER</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          leaderboardData.map(
                            x => (
                              <tr
                                key={x.player}
                              >
                                <td>{x.wins}</td>
                                <td>{x.losses}</td>
                                <td>{x.average}</td>
                                <td>{x.player}</td>
                              </tr>
                            )
                          )
                        }
                        {/* row 1 */}

                      </tbody>
                    </table>
                  </div>
                )
                : (
                  <p
                    className="mx-3 mb-3"
                  >
                    Play a game of Chess to see the leaderboard !
                  </p>

                )
            }


          </div>
        </div>
      )}


      {false && (
        <div className="card w-96 bg-base-100 card-md shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Chess Games by Month</h2>

            {
              leaderboardData.length > 0
                ? (
                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>MONTH</th>
                          <th># OF GAMES</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          gamesByMonthData.map(
                            x => (
                              <tr
                                key={x[0]}
                              >
                                <td>{x[0]}</td>
                                <td>{x[1]}</td>
                              </tr>
                            )
                          )
                        }
                        {/* row 1 */}

                      </tbody>
                    </table>
                  </div>
                )
                : (
                  <p
                    className="mx-3 mb-3"
                  >
                    Play a game of Chess to see!
                  </p>

                )
            }


          </div>
        </div>
      )}
    </>
  )


}