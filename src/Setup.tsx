import { useNavigate } from "react-router"

interface SetupProps {
};

export const Setup: React.FC<SetupProps> = () => {


  const navTwo = useNavigate();
    return (
      <>
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