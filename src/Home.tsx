import { useNavigate } from "react-router"
import { LeaderboardEntry } from "./GameResults";

interface HomeProps {
  totalGameCount: number;
  leaderboardData: LeaderboardEntry[];
};


export const Home: React.FC<HomeProps> = ({
  totalGameCount
  , leaderboardData
}) => {

  console.log(leaderboardData);

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
          <p>Leaderboard goes here!</p>
        </div>
      </div>

    </>
  )


}