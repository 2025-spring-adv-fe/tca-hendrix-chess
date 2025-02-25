import { useNavigate } from "react-router"

export const Home = () => {

  const nav = useNavigate();
    return (
      <>
      <h3
          className='text-2xl font-bold'
          >
          Home
          </h3>
          <button
          className='btn btn-active btn-secondary btn-large'
          onClick={
            () => nav("/setup")
          }
          >
            Play Chess
          </button>
      
      </>
    )
    
    
    }