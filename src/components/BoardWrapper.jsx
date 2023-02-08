import { useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Chessboard } from 'react-chessboard'
import './BoardWrapper.css'

export default function BoardWrapper({ boardOrientation, boardWidth, game, setGame, movesDatabase, setMovesDatabase}) {
  const chessboardRef = useRef()

  const [arrows, setArrows] = useState([]) // add class helper
  const [rightClickedSquares, setRightClickedSquares] = useState({}) // add class helper
  const [optionSquares, setOptionSquares] = useState({})

  function showMoveOptions(square) {
    const moves = game.moves({
      square,
      verbose: true
    })
    if (moves.length === 0) {
      return
    }

    const newSquares = {}
    moves.map((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) && game.get(move.to).color !== game.get(square).color
            ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
            : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%'
      }
      return move
    })
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)'
    }
    setOptionSquares(newSquares)
  }

  function makeMove(sourceSquare, targetSquare) {
    const gameCopy = game.copy()
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    })
    setGame(gameCopy)
    
    const movesDatabaseCopy = movesDatabase.copy()
    movesDatabaseCopy.update(gameCopy.get_history())
    setMovesDatabase(movesDatabaseCopy)
    
    setOptionSquares({})
    
    if (move == null) return false
    return true
  }

  function onDragBegin(piece, sourceSquare) {
    setRightClickedSquares({})
    showMoveOptions(sourceSquare)
  }

  function onDrop(sourceSquare, targetSquare) {
    return makeMove(sourceSquare, targetSquare)
  }

  function onSquareRightClick(square) {
    const colour = 'rgba(0, 0, 255, 0.4)'
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] && rightClickedSquares[square].backgroundColor === colour
          ? undefined
          : { backgroundColor: colour }
    })
  }

  const handleSave = () => {
      const movesDatabaseCopy = movesDatabase.copy()
      movesDatabaseCopy.save_moves()
      setMovesDatabase(movesDatabaseCopy)
  }

  const getSaveButton = () => {
      const save_available = movesDatabase.is_save_available()
      if (save_available === true) 
          return <Button variant='info' className='save-button' onClick={handleSave}>Save</Button>
      else
          return <Button variant='info' className='save-button' disabled>Save</Button> 
  }

  return (
    <div className='chess-cont'>
      <Chessboard
        className='chess-container'
        animationDuration={200}
        boardOrientation={boardOrientation}
        boardWidth={boardWidth}
        customArrows={arrows}
        position={game.fen()}
        onPieceDrop={onDrop}
        onPieceDragBegin={onDragBegin}
        arePiecesDraggable={true}
        onSquareRightClick={onSquareRightClick}
        customBoardStyle={{
          borderRadius: '4px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
        }}
        customSquareStyles={{
          ...optionSquares,
          ...rightClickedSquares
        }}
        ref={chessboardRef}
      />
      {getSaveButton()}
      {/* <button
        className="rc-button"
        onClick={() => {
          setArrows([
            ['a3', 'a5'],
            ['g1', 'f3']
          ])
        }}
      >
        Set Custom Arrows
      </button> */}
    </div>
  )
}
