import React, { useEffect, useState } from 'react'
import './App.css';
import Box from './components/Box';
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import Turn from './components/Turn';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Player from './components/Player';



function App() {
  const [ lifeCount, setLifeCount ] = useState(5)
  const [boxes, setBoxes] = useState([])
  const [winner, setWinner] = useState(false)
  const [playerOneLife, setPlayerOneLife] = useState(lifeCount)
  const [playerTwoLife, setPlayerTwoLife] = useState(lifeCount)
  const [numberOfWins, setNumberOfWins] = useState(5)
  const [showSettingWindows, setshowSettingWindows] = useState(false)
  const [gameStart, setGameStart] = useState(false)
  const [ turn, setTurn ] = useState(false)
  const [ currentPlayer, setCurrentPlayer ] = useState()

  //  Note on state: set a initial value to avoid undefined errors and catch error using ternary
  const [randomColor, setRandomColor] = useState({
    color: '',
  })

  // generate random Color
  const generateColor = () => {
    var R = Math.floor(Math.random() * 255)
    var G = Math.floor(Math.random() * 255)
    var B = Math.floor(Math.random() * 255)
    var color = `rgb(${R}, ${G}, ${B})`
    return color;
  }


  function startGame() {
    for (var i = 0; i < 6; i++) {
      const individualBoxProps = {
        color: generateColor(),
      }
      setBoxes(prevState => {
        return [...prevState, individualBoxProps]
      })
    }
  }


 
useEffect(() => {
    setRandomColor(color => {
      return {
        color: boxes.length === 0 ? 'rgb(255,255,255)' : boxes[Math.floor(Math.random() * boxes.length)].color
      }
    })
  }, [boxes])




  // handleclick
  const handleClick = (color) => {
    if (color === randomColor.color) {
      setWinner(true)
      document.getElementById('random-color').style.color = randomColor.color
      toast.success('You got it!', {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
       
    } else {
       toast(`Incorrect!`)
       if( currentPlayer === 'Player One'){
           setPlayerOneLife( playerOneLife - 1 )
           setCurrentPlayer('Player Two')
       }else if( currentPlayer === 'Player Two'){
          setPlayerTwoLife( playerTwoLife - 1)
          setCurrentPlayer('Player One')
       }
   
       
    }
  }


  function showSetting() {
    setshowSettingWindows(!showSettingWindows)
  }



  function startTurn() {
    startGame()
    setGameStart(true)
    toast("Player One's Turn!");
    setCurrentPlayer('Player One')
  }

 console.log(currentPlayer)

  const boxElements = boxes.map((box, i) => {
    return <Box
      key={i}
      data={box}
      handleClick={handleClick}
      winner={winner}
      randomColor={randomColor.color}
    />
  })



  return (
    <>

      {/* header part */}
      <div className='top-bg'>
            <div>
            <Player  
                playerName={'Player One'}
                life={playerOneLife}
                currentPlayer={currentPlayer}
            />  
            </div>


        <div>
        <h2> RGB Color Game </h2>
        <p className='description'> Guess what color is this?
          <br /> <span className='random-color' id='random-color'> <em>{randomColor.color} </em> </span></p>
        <div className='setting-container'>
          <p className='description-setting'>Current Setting: {numberOfWins} wins
            <button onClick={showSetting} className='btn-change'> {showSettingWindows ? <IoMdArrowDropup size={20} /> 
            : <IoMdArrowDropdown size={20} />}  </button> </p>
        </div>
        </div>

        <div>
        <Player  
                playerName={'Player Two'}
                life={playerTwoLife}
                currentPlayer={currentPlayer}
            />
        </div>
      </div>

      {/* show settings div */}
      {showSettingWindows && <div className='settings-div'> <h4>Settings: </h4></div>}


      {/* if gameStart is true, display the boxes */}
      {
      gameStart ?
        <div className='box-parent'>
          <div className="box-container">
            <ToastContainer 
               position="bottom-left"
               autoClose={1000}
                
            />
              
            {boxElements}
            
          </div>
        </div> :
        <div className='start-div'>
          <button onClick={startTurn}> Start Game</button>
        </div>

      }


    </>
  );
}

export default App;
