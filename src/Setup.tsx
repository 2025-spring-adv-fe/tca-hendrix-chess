import { useState } from "react";
import { useNavigate } from "react-router"

interface SetupProps {
  totalGameCount: number;
  previousPlayers: string[];
};

export const Setup: React.FC<SetupProps> = ({
  totalGameCount
  , previousPlayers
}) => {

  const [availablePlayers, setAvailablePlayers] = useState(
    previousPlayers.map(
      x => ({
        name: x
        , checked: false
      })
    )
  );


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
          <div className="mt-4">
            {
              availablePlayers.map(
                x => (
                  <label
                  className="block mt-2"
                  >
                    <input type="checkbox"
                    className="checkbox mr-2"
                    checked={x.checked}
                    onChange={
                      () => setAvailablePlayers(
                        availablePlayers.map(
                          y => ({
                            name: y.name
                            , checked: y.name === x.name
                                ? !y.checked 
                                : y.checked
                          })
                        )
                      )
                    }
                    />
                    {x.name}
                  </label>
                )
              )
            }
          </div>
      
      </>
    )
    
    
    }