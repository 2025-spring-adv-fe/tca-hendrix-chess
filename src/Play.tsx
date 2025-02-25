import { useState } from "react";
import { useNavigate } from "react-router"

export const Play = () => {

  const navThree = useNavigate();
  const [turnNumber, setTurnNumber] = useState(6);

    return (
      <>
      <h3
          className='text-2xl font-bold'
          >
            Play
            
      </h3>
            <h4>
            Turn #{turnNumber}
            <button
              className="btn btn-xs btn-outline btn-light ml-4"
              onClick={
                () => {
                  setTurnNumber(turnNumber + 1);
                    console.log(turnNumber);
                  
                }
              }
              >
                +
              </button>
              </h4>
          <button
          className='btn btn-active btn-secondary btn-large mt-4'
          onClick={
            () => navThree(-2)
          }
          >
            Done
          </button>
      
      </>
    )
    
    
    }