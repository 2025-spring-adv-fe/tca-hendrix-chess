import { useNavigate } from "react-router"
import { GeneralFacts, LeaderboardEntry } from "./GameResults";

interface HomeProps {
  totalGameCount: number;
  leaderboardData: LeaderboardEntry[];
  generalFacts: GeneralFacts;
};


export const Home: React.FC<HomeProps> = ({
  totalGameCount
  , leaderboardData
  , generalFacts
}) => {

  console.log(
    generalFacts
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
                      <th></th>
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
                            <th>{x.wins}</th>
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
                <p>
                    Play a game of Five Crowns to see the leaderboard !
                </p>

              )
          }


        </div>
      </div>

    </>
  )


}