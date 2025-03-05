import './App.css'
import {
  HashRouter
  , Routes
  , Route
} from 'react-router';
import { Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';
import { useState } from 'react';
import { GameResult, getLeaderboard } from './GameResults';

const dummyGameResults: GameResult[] = [
  {
      winner: "Hermione"
      , players: [
          "Hermione"
          , "Harry"
          , "Ron"
      ]
      
  }
  , {
      winner: "Ron"
      , players: [
          "Hermione"
          , "Ron"
      ]
  }
  , {
      winner: "Larry"
      , players: [
          "Larry"
          , "Curly"
          , "Moe"
      ]
  }
];


const App = () => {



  //
  // Hooks...
  //

  const [gameResults, setGameResults] = useState(dummyGameResults);
  // const [gameResults, setGameResults] = useState<GameResult[]>([]);

  // get rid of setGameResults?? // Maybe put back???


  //
  // other (not hooks)
  //
  const addNewGameResult = (newGameResult: GameResult) => setGameResults(
    [
      ...gameResults
      , newGameResult
    ]
  );


  return (
    
    <div
    className='p-0'>
      <div className="navbar bg-base-300 shadow-lg">
        <h1 className="text-xl font-bold">
          Hendrix's Chess
        </h1>
      </div>
      <div className='p-4'>
      <HashRouter>
          <Routes>
            <Route 
              path='/'
              element={
                <Home
                totalGameCount={gameResults.length}
                leaderboardData={
                  getLeaderboard(gameResults)
                }
                />
                }
            />

            <Route 
              path='/setup'
              element={
                <Setup
                totalGameCount={gameResults.length}/>
                }
            />

            <Route 
              path='/Play'
              element={
                <Play
                totalGameCount={gameResults.length}
                addNewGameResult={addNewGameResult}
                
                />
                }
            />
          </Routes>
        </HashRouter>

      </div>
    </div>

  )
}

export default App
