import React from 'react'
import Animation from '../../components/animation/Animation'

import GameSelect from '../../components/gameselect/GameSelect'


import './games.css'

const Games = () => {
  return (
    <div className='main'>
      <GameSelect />
      <Animation />
    </div>
  )
}

export default Games
