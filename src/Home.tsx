import { useNavigate } from "react-router"
import { GeneralFacts, LeaderboardEntry } from "./GameResults";
import { useEffect } from "react";

export const AppTitle = "Hendrix's Chess Game";

interface HomeProps {
  totalGameCount: number;
  setTitle: (t: string) => void;
  leaderboardData: LeaderboardEntry[];
  generalFacts: GeneralFacts;
  gamesByMonthData: Array<[string, number]>
};


export const Home: React.FC<HomeProps> = ({
  totalGameCount
  , setTitle
  , leaderboardData
  , generalFacts
  , gamesByMonthData
}) => {

  useEffect(
    () => setTitle(AppTitle)
  );


 

  const nav = useNavigate();
  return (
    <>
      <h3
        className='text-2xl font-bold'
      >
        Home ({totalGameCount}0 games played)
      </h3>
      <button
        className='btn btn-active btn-secondary btn-large'
        onClick={
          () => nav("/setup")
        }
      >
        Play Chess
      </button>

        
      <div className="card w-96 bg-base-100 card-md shadow-lg w-full">
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

    </>
  )


}