import { useNavigate } from "react-router"

interface SetupProps {
  setTitle: (t: string) => void;
};

export const Setup: React.FC<SetupProps> = ({
  setTitle
}) => {

  setTitle("Setup");
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