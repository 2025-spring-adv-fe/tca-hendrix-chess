import { useState } from "react";
import { useNavigate } from "react-router"
import { GameResult } from "./GameResults";

interface PlayProps {
  totalGameCount: number;
  addNewGameResult: (r: GameResult) => void;
  
};

export const Play: React.FC<PlayProps> = ({
  totalGameCount,
  addNewGameResult

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
          <button
          className='btn btn-active btn-secondary btn-large mt-4'
          onClick={
            () => {
              addNewGameResult({
                winner: "Barbie"
                , players: [
                    "Barbie"
                    , "Ken"
                ]
                , start: startTimestamp
                , end: new Date().toISOString()
              });
             
              navThree(-2)
          }
        }
          >
            Done
          </button>
      
      </>
    )
    
    
    }