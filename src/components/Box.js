import React from 'react'

function Box(props) {
const styles ={
    backgroundColor: props.winner ? props.randomColor : props.data.color
}

  return (
    <div className='box' style={styles}
     onClick={ () =>props.handleClick(props.data.color)}
     >  </div>
  )
}

export default Box