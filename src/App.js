import React, { useEffect, useState} from 'react'
import './App.css';
import Box from './components/Box';

function App() {
 const initialColor = { color: 'rgb(255, 255, 255)'}
 const [ boxes, setBoxes ] = useState([])
 const [ winner, setWinner ] = useState(false)
 const [ playerOneTurn, setPlayerOneTurn ] = useState(false)
 const [ playerTwoTurn, setPlayerTwoTurn ] = useState(false)

//  Note on state: set a initial value to avoid undefined errors and catch error using ternary
 const [ randomColor, setRandomColor ] = useState({
  color:'',
})

// generate random Color
const generateColor = () => {
  var R = Math.floor(Math.random() * 255)
  var G = Math.floor(Math.random() * 255)
  var B = Math.floor(Math.random() * 255)
  var color = `rgb(${R}, ${G}, ${B})`
 return color;
} 



//Assign new color to each box
useEffect( () => {
  console.log('Useeffect loaded')
  for(var i = 0; i < 6 ; i++){
    const individualBoxProps = {
      color: generateColor(),
    }
    setBoxes( prevState =>{
      return [...prevState, individualBoxProps]
    })
  } 
  
}, [])

useEffect( () => {
  setRandomColor( color => {
    return { 
        color: boxes.length === 0 ? 'rgb(200,200,200)' : boxes[Math.floor(Math.random() * boxes.length)].color
    }
  })
}, [boxes])


console.log(randomColor.color)

// handleclick
const handleClick =(color) => {
  if(color === randomColor.color){
    setWinner(true)
  }else{
    console.log('Wrong!')
  }
}


const boxElements= boxes.map( (box,i) => {
  return <Box 
      key={i}
      data={box}
      handleClick={handleClick}
      winner={winner}
      randomColor ={randomColor.color}
  />
})



return (
    <>
    <div className='top-bg'>
        <h2> RGB Color Game </h2>
        <p className='description'> Guess what color is this? 
        <br /> <span className='random-color'>  { randomColor.color} </span></p>
    </div>
    
   
    { winner && <p> We have a winner! </p>}
      <div className='box-parent'>
        <div className="box-container">
            { boxElements}
        </div>
      </div>
    </>
  );
}

export default App;
