import ChessGame from './ChessGame';
import './App.css'
import {
  HashRouter
  , Routes
  , Route
} from 'react-router';
import { AppTitle, Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';
import { useEffect, useRef, useState } from 'react';
import { GameResult, getGeneralFacts, getLeaderboard, getPreviousPlayers, getGamesByMonth } from './GameResults';
import localforage from 'localforage';

import {
  saveGameToCloud
  , loadGamesFromCloud
} from './tca-cloud-api';


const App = () => {



  //
  // Hooks...
  //
  // Order Preference: Ref, State, Effect

  const emailModalRef = useRef<HTMLDialogElement | null>(null);


  const [gameResults, setGameResults] = useState<GameResult[]>([]);

  // get rid of setGameResults?? // Maybe put back???

  const [title, setTitle] = useState(AppTitle);

  const [currentPlayers, setCurrentPlayers] = useState<string[]>([])

  const [darkMode, setDarkMode] = useState(false);

  const [emailOnModal, setEmailOnModal] = useState("");

  const [emailForCloudApi, setEmailForCloudApi] = useState("");

  const [chessMoves, setChessMoves] = useState<string[]>([]);

  const [isCheck, setIsCheck] = useState(false);


  const handleMoveUpdate = (moves: string[], inCheck: boolean) => {
  setChessMoves(moves);
  setIsCheck(inCheck);
};


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

  useEffect(
    () => {

      const loadEmail = async () => {

        const savedEmail = await localforage.getItem<string>("email") ?? "";

        if (!ignore) {
          setEmailOnModal(savedEmail);

          if (savedEmail.length > 0) {
            setEmailForCloudApi(savedEmail)
          }
        }
      };
      let ignore = false;
      loadEmail();
      return () => {
        ignore = true;
      };
    }
    , []
  );

  useEffect(
    () => {

      const loadGameResults = async () => {

        const savedGameResults = await loadGamesFromCloud(
          emailForCloudApi
          , "tca-five-crowns-25s"
        );

        if (!ignore) {
          setGameResults(savedGameResults);
        }
      };

      let ignore = false;

      if (emailForCloudApi.length > 0) {
        loadGameResults();
      }

      return () => {
        ignore = true;
      };
    }
    , [emailForCloudApi]
  );



  //
  // other (not hooks)
  //
  const addNewGameResult = async (newGameResult: GameResult) => {
    if (emailForCloudApi.length > 0) {
      await saveGameToCloud(
        emailForCloudApi
        , "tca-five-crowns-25s"
        , newGameResult.end
        , newGameResult
      );
    }



    setGameResults(
      [
        ...gameResults
        , newGameResult
      ]
    );
  }

  // Return JSX
  return (


    <div
      className='p-0 overflow-x-hidden min-h-screen'
      // I would love it if it was always dark. Ha! The functionality is nice, though. 
      // I might try changing it to different colors for fun. 
      data-theme={darkMode}
    >
      <div
        className="navbar bg-base-300 shadow-lg overflow-x-hidden flex"
      >
        <h1
          className="text-xl font-bold"
        >
          {title}
        </h1>
        <div
          className="flex gap-1 ml-auto">
          {
            AppTitle === title && (

              <button
                className="btn btn-ghost"
                onClick={
                  () => emailModalRef.current?.showModal()
                }>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>


              </button>

            )
          }

          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" onClick={
              async () => {
                const savedDarkMode = await localforage.setItem("darkMode", !darkMode);
                setDarkMode(savedDarkMode);
              }
            } />
          </label>

        </div>
      </div>

      <dialog ref={emailModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">

            <input type="text"
              placeholder="Enter email address..."
              className="input"
              value={emailOnModal}
              onChange={
                (e) => setEmailOnModal(e.target.value)
              } />



          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn"
                onClick={
                  async () => {
                    const savedEmail = await localforage.setItem(
                      "email"
                      , emailOnModal
                    );

                    if (savedEmail.length > 0) {
                      setEmailForCloudApi(savedEmail);
                    }
                  }
                }
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>


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
                  gamesByMonthData={
                    getGamesByMonth(gameResults)
                  }
                  //chessMoves Route
                  chessMoves={chessMoves}
                  setChessMoves={handleMoveUpdate}
                  isCheck={isCheck}

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
                  setCurrentPlayers={setCurrentPlayers} />
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
            <Route
              path="/chess"
              element={
                <ChessGame
                  moves={chessMoves}
                  onMoveUpdate={handleMoveUpdate}
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
