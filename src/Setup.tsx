import { useNavigate } from "react-router"

export const Setup = () => {


  const navTwo = useNavigate();
    return (
      <>
      <h3
          className='text-2xl font-bold'
          >
          Setup
          </h3>
          <button
          className='btn btn-active btn-secondary btn-large'
          onClick={
            () => navTwo('/play')
          }
          >
            Start Playing
          </button>
      
      </>
    )
    
    
    }