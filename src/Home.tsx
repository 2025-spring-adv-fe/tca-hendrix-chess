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
      
      </>
    )
    
    
    }