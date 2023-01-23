import './BaseMoves.css'
import Button from 'react-bootstrap/Button';

export default function BaseMoves({game, setGame, movesDatabase, setMovesDatabase}) {
  
  const handleClick = (item) => {
    const gameCopy = game.copy()
    gameCopy.move_notation(item)
    setGame(gameCopy)

    const movesDatabaseCopy = movesDatabase.copy()
    movesDatabaseCopy.update(gameCopy.get_history())
    setMovesDatabase(movesDatabaseCopy)
  }

  const getButton = (item) => {
    return <Button className='move-button' onClick={() => (handleClick(item))}> {item} </Button>
  }

  return (
    <div>
      <h3 className='base-title'>Moves database</h3>
      <div className='base-moves'>
        {movesDatabase.get_moves().map(item => (
          getButton(item)
        ))}
      </div>
    </div>
  )
}
