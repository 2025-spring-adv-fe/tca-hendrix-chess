import './App.css'

const App = (
  props: any
) => {

  
  
  console.log(
    "App Component Fun Called ! ! !"
    , typeof(props)
    , props
  );

  return (
    <div>
      <h1
      className='text-2xl font-bold'
      >
        TCA Hendrix Chess
      </h1>
      <p>
        { props.timestamp } - { props.magicNumber }
      </p>
      <button
      className='btn btn-secondary btn-active btn-x1'
      >
        Play Chess!
      </button>
    </div>

  )
}

export default App
