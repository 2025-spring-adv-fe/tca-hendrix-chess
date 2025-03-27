import { useState } from "react";
import { useNavigate } from "react-router"
import { GameResult } from "./GameResults";

interface PlayProps {
  totalGameCount: number;
  addNewGameResult: (r: GameResult) => void;
  currentPlayers: string[]
  
};

export const Play: React.FC<PlayProps> = ({
  totalGameCount
  , addNewGameResult
  , currentPlayers

}) => {

  const navThree = useNavigate();
  
  const [turnNumber, setTurnNumber] = useState(6);
  
  const [startTimestamp] = useState(
    new Date().toISOString()
  );

    return (
      <>
      <h3
          className='text-2xl font-bold'
          >
            Play ({totalGameCount} games played)
            
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
              <div 
              className="grid grid-cols-2 gap-2 mt-4"
              
              >
                {
                  currentPlayers.map(
                    x => (

                      <button
                      key={x} 
                      className='btn btn-active btn-secondary btn-large mt-4'
                      onClick={
                        () => {
                          addNewGameResult({
                            winner: x
                            , players: currentPlayers
                            , start: startTimestamp
                            , end: new Date().toISOString()
                          });
                         
                          navThree(-2)
                      }
                    }
                      > 
                        {x} Won
                      </button>
                  

                    )
                  )
                }

              </div>
         
      </>
    )
    
    
    }