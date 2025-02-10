import './App.css'

function App() {

  return (
    <div>
      <h1
        className='text-2xl font-bold bg-base-300 p-4 text-secondary'
      >
        TCA Chess
      </h1>
      <div className="p-4">
        <button
          className='btn btn-secondary btn-soft btn-xl'
        >
          Play Chess!
        </button>
        <h2
          className='mt-3 text-xl font-semi-bold'
        >

          Leaderboard...
        </h2>




        <div 
          className="card w-full bg-base-100 card-lg shadow-sm mt-4"
        >
          <div className="card-body">
            <h2 className="card-title">Leaderboard</h2>
            <p>Leaderboard Coming Soon...</p>
            <div className="justify-end card-actions">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>


      </div>

    </div>

  )
}

export default App
