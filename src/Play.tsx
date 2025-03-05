import { useState } from "react";
import { useNavigate } from "react-router"
import { GameResult } from "./GameResults";

interface PlayProps {
  addNewGameResult: (r: GameResult) => void;
  setTitle: (t: string) => void;
  
};

export const Play: React.FC<PlayProps> = ({
  addNewGameResult
  , setTitle

}) => {

  setTitle("Play!");
  const navThree = useNavigate();
  const [turnNumber, setTurnNumber] = useState(6);

    return (
      <>
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