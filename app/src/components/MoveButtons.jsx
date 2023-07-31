import React, { useState } from "react"
import Button from 'react-bootstrap/Button'
import './styles/MoveButtons.css'

export default function MoveButtons({game, setGame, movesDatabase, setMovesDatabase}) {

  return (
    <div className='move-buttons'>
    <Button 
    className="board-button"
        variant='info'
        onClick={() => {
          const gameCopy = game.copy()
          gameCopy.hard_left()
          setGame(gameCopy)
    
          const movesDatabaseCopy = movesDatabase.copy()
          movesDatabaseCopy.update(gameCopy.get_history())
          setMovesDatabase(movesDatabaseCopy)
        }}
      ><h2 className='button-text'>⇤</h2></Button>
      <Button
        className="board-button"
        variant='info'
        onClick={() => {
          const gameCopy = game.copy()
          gameCopy.left()
          setGame(gameCopy)

          const movesDatabaseCopy = movesDatabase.copy()
          movesDatabaseCopy.update(gameCopy.get_history())
          setMovesDatabase(movesDatabaseCopy)
        }}
      ><h2 className='button-text'>←</h2></Button>
      <Button
        className="board-button"
        variant='info'
        onClick={() => {
          const gameCopy = game.copy()
          gameCopy.right()
          setGame(gameCopy)

          const movesDatabaseCopy = movesDatabase.copy()
          movesDatabaseCopy.update(gameCopy.get_history())
          setMovesDatabase(movesDatabaseCopy)
        }}
      ><h2>→</h2></Button>
      <Button
        className="board-button"
        variant='info'
        onClick={() => {
          const gameCopy = game.copy()
          gameCopy.hard_right()
          setGame(gameCopy)

          const movesDatabaseCopy = movesDatabase.copy()
          movesDatabaseCopy.update(gameCopy.get_history())
          setMovesDatabase(movesDatabaseCopy)
        }}
      ><h2>⇥</h2></Button>
      </div>
  )
}
