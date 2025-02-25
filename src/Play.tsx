import { useNavigate } from "react-router"

export const Play = () => {

  const navThree = useNavigate();

    return (
      <>
      <h3
          className='text-2xl font-bold'
          >
          Play
          </h3>
          <button
          className='btn btn-active btn-secondary btn-large mt-4'
          onClick={
            () => navThree(-2)
          }
          >
            Done
          </button>
      
      </>
    )
    
    
    }