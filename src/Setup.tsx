import { useNavigate } from "react-router"

interface SetupProps {
  totalGameCount: number;
};

export const Setup: React.FC<SetupProps> = ({
  totalGameCount
}) => {


  const navTwo = useNavigate();
    return (
      <>
      <h3
          className='text-2xl font-bold'
          >
          Setup ({totalGameCount} games played)
          </h3>
          <button
          className='btn btn-active btn-secondary btn-large'
          onClick={
            () => navTwo('/play')
          }
          >
            Start Playing
          </button>
      
      </>
    )
    
    
    }