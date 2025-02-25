import { useNavigate } from "react-router"

interface HomeProps {
    totalGameCount: number;
};


export const Home: React.FC<HomeProps> = ({
  totalGameCount
}) => {

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