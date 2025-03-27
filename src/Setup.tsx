import { useState } from "react";
import { useNavigate } from "react-router"

interface SetupProps {
  totalGameCount: number;
  previousPlayers: string[];
  setCurrentPlayers: (players: string[]) => void;
};

export const Setup: React.FC<SetupProps> = ({
  totalGameCount
  , previousPlayers
  , setCurrentPlayers
}) => {

  //
  // React Hooks, Inlcudes, State, Effect, and others...
  //


  const navTwo = useNavigate();

  const [availablePlayers, setAvailablePlayers] = useState(
    previousPlayers.map(
      x => ({
        name: x
        , checked: false
      })
    )
  );

  //
  // Other code, for example, derived state and other calcs...
  //
  const numberOfChosenPlayers = availablePlayers.filter(x => x.checked).length;
  // The below code is correct for CHESS!!!
  const mustBeTwo = numberOfChosenPlayers === 2;

  //
  // Return the JSX...
  //

  
    return (
      <>
      <h3
          className='text-2xl font-bold'
          >
          Setup ({totalGameCount} games played)
          </h3>
          <button
          className='btn btn-active btn-secondary btn-large mt-4 w-full lg:w-64'
          onClick={
            () => {
              setCurrentPlayers(
                availablePlayers
                  . filter(
                    x => x.checked
                  )
                  .map(
                    x => (
                      x.name
                    )
                  )
              );
              navTwo('/play')}
          }
          disabled={!mustBeTwo}
          >
            {
              mustBeTwo
              ? "Start Playing"
              : "Must Select 2 Players to Start Game!"
            }
          </button>
          <div className="mt-4">
            {
              availablePlayers.map(
                x => (
                  <label
                  key={x.name}
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