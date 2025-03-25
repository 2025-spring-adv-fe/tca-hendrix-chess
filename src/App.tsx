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
import { GameResult, getGeneralFacts, getLeaderboard, getPreviousPlayers } from './GameResults';

const dummyGameResults: GameResult[] = [
  {
    winner: "Hermione"
    , players: [
      "Hermione"
      , "Harry"
      , "Ron"
    ]
    , start: "2025-03-01T18:20:41.576Z"
    , end: "2025-03-01T18:35:42.576Z"
  }
  , {
    winner: "Ron"
    , players: [
      "Hermione"
      , "Ron"
    ]
    , start: "2025-03-05T18:40:27.576Z"
    , end: "2025-03-05T18:45:42.576Z"
  }
];


const App = () => {



  //
  // Hooks...
  //

  const [gameResults, setGameResults] = useState(dummyGameResults);
  // const [gameResults, setGameResults] = useState<GameResult[]>([]);

  // get rid of setGameResults?? // Maybe put back???


  const [currentPlayers, setCurrentPlayers] = useState<string[]>([])


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
      className='p-4'>
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
                generalFacts={
                  getGeneralFacts(gameResults)
                }
              />
            }
          />

          <Route
            path='/setup'
            element={
              <Setup
                totalGameCount={gameResults.length} 
                previousPlayers={getPreviousPlayers(gameResults)} 
                setCurrentPlayers={setCurrentPlayers}/>
            }
          />

          <Route
            path='/Play'
            element={
              <Play
                totalGameCount={gameResults.length}
                addNewGameResult={addNewGameResult}
                currentPlayers={currentPlayers}

              />
            }
          />
        </Routes>
      </HashRouter>
    </div>

  )
}

export default App
