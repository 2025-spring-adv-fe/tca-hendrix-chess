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
import { GameResult } from './GameResults';

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

const [totalGameCount, setTotalGamesCount] = useState(6);

  
  
  console.log(
    "App Component Func Called ! ! !"
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
              totalGameCount={totalGameCount}
              />
              }
          />

          <Route 
            path='/setup'
            element={
              <Setup
              totalGameCount={totalGameCount}/>
              }
          />

          <Route 
            path='/Play'
            element={
              <Play
              totalGameCount={totalGameCount}
              setTotalGameCount={setTotalGamesCount}/>
              }
          />
        </Routes>
      </HashRouter>
    </div>

  )
}

export default App
