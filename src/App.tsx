import './App.css'
import {
  HashRouter
  , Routes
  , Route
} from 'react-router';
import { AppTitle, Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';
import { useEffect, useState } from 'react';
import { GameResult, getGeneralFacts, getLeaderboard, getPreviousPlayers } from './GameResults';
import localforage from 'localforage';

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
    , turnCount: 7
  }
  , {
    winner: "Ron"
    , players: [
      "Hermione"
      , "Ron"
    ]
    , start: "2025-03-05T18:40:27.576Z"
    , end: "2025-03-05T18:45:42.576Z"
    , turnCount: 3
  }
];


const App = () => {



  //
  // Hooks...
  //

  const [gameResults, setGameResults] = useState(dummyGameResults);
  // const [gameResults, setGameResults] = useState<GameResult[]>([]);

  // get rid of setGameResults?? // Maybe put back???

  const [title, setTitle] = useState(AppTitle);

  const [currentPlayers, setCurrentPlayers] = useState<string[]>([])

  const [darkMode, setDarkMode] = useState(false);

  useEffect(
    () => {

      const loadDarkMode = async () => {
        const savedDarkMode = await localforage.getItem<boolean>("darkMode") ?? false;
        if (!ignore) {
        setDarkMode(savedDarkMode)
        }
      };
      let ignore = false;
      loadDarkMode();
      return () => {
        ignore = true;
      };
    }
      , []
  );
  
  
  
  //
  // other (not hooks)
  //
  const addNewGameResult = (newGameResult: GameResult) => setGameResults(
    [
      ...gameResults
      , newGameResult
    ]
  );

  // Return JSX
  return (
    <div
    className='p-0 overflow-x-hidden min-h-screen'
    // I would love it if it was always dark. Ha! The functionality is nice, though. 
    // I might try changing it to different colors for fun. 
    data-theme={darkMode ? "dark" : "light"}
  >
    <div 
      className="navbar bg-base-300 shadow-lg overflow-x-hidden flex"
    >
      <h1 
        className="text-xl font-bold"
      >
        { title }
      </h1>

      <label className="swap swap-rotate ml-auto">
  {/* this hidden checkbox controls the state */}
  <input type="checkbox" onClick={
    async () => {
      const savedDarkMode = await localforage.setItem("darkMode", !darkMode);
      setDarkMode(savedDarkMode);
    }
  } />

  {/* sun icon */}
  <svg
    className="swap-on h-8 w-8 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
  </svg>

  {/* moon icon */}
  <svg
    className="swap-off h-8 w-8 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
  </svg>
</label>


    </div>
    <div 
      className="p-4"
    >
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
                setTitle={setTitle}
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
                setTitle={setTitle}
                previousPlayers={getPreviousPlayers(gameResults)} 
                setCurrentPlayers={setCurrentPlayers}/>
            }
          />

          <Route
            path='/Play'
            element={
              <Play
                totalGameCount={gameResults.length}
                setTitle={setTitle}
                addNewGameResult={addNewGameResult}
                currentPlayers={currentPlayers}

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
