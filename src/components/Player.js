import React from 'react'

function Player(props) {

 var life =''
  for(var i =0 ; i < props.life; i++){
        life += '❤️'     
  }

  const styles={
      color:  props.playerName === props.currentPlayer ? 'yellow' : 'floralwhite'
     
  }

// console.log(props.currentPlayer)s

  return (
    <div>
        <h1 className={`playerName ${props.playerName === props.currentPlayer ? 'text-glow' : ''}`} style={styles}> { props.playerName }</h1>
        <div className='healthbar'>
        <span role="img" aria-label="sheep">
            {life}
            </span>
        </div>
    </div>
  )
}

export default Player