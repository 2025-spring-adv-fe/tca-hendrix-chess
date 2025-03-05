import { useNavigate } from "react-router"
import { useEffect } from "react";

interface SetupProps {
  setTitle: (t: string) => void;
};

export const Setup: React.FC<SetupProps> = ({
  setTitle
}) => {

   useEffect(
    () => setTitle("Setup")
    , []
   );
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