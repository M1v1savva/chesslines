import './MovesPanel.css'
import Button from 'react-bootstrap/Button';

export default function MovesPanel({game, setGame, movesDatabase, setMovesDatabase}) {

  function mapToPairs({moves, activeMove}) {
    var pairs = []
    for (var i = 0; i < moves.length; i += 2) {
      if (i == moves.length - 1) {
        const pair = {row_number: i / 2 + 1, num_moves: 1, 
          move: moves[i], 
          move_id: i,
          selected: (activeMove == i)
        }
        pairs.push(pair)
      } else {
        const pair = {row_number: i / 2 + 1, num_moves: 2, 
          move1: moves[i], move2: moves[i + 1],
          move_id1: i, move_id2: i + 1, 
          selected1: (activeMove == i), selected2: (activeMove == i + 1)
        }
        pairs.push(pair)
      }
    }
    return pairs
  }

  function select_move(move_id) {
    const gameCopy = game.copy()
    gameCopy.jump_to_move(move_id)
    setGame(gameCopy)

    const movesDatabaseCopy = movesDatabase.copy()
    movesDatabaseCopy.update(gameCopy.get_history())
    setMovesDatabase(movesDatabaseCopy)
  }

  function getButton(move, move_id, selected) {
    if (selected) {
      return (
        <Button className='move-button-highlight' onClick={() => select_move(move_id)}> {move} </Button>
      )
    } else {
      return (
        <Button className='move-button' onClick={() => select_move(move_id)}> {move} </Button>
      )
    }
  }

  function getElementButtons(pair) {
    if (pair.num_moves == 1) {
      return (
        <div>
          {getButton(pair.move, pair.move_id, pair.selected)}
        </div>
      )
    } else {
      return (
        <div>
          {getButton(pair.move1, pair.move_id1, pair.selected1)}
          {getButton(pair.move2, pair.move_id2, pair.selected2)}
        </div>
      )
    }
  }

  function getElement(pair) {
    return (
      <div className='move-pair'>
        <div className='move-pair-number-container'><p className='move-pair-number'>{pair.row_number}. </p></div>
        {getElementButtons(pair)}
      </div>
    )
  }

  const handleSave = () => {
      const movesDatabaseCopy = movesDatabase.copy()
      movesDatabaseCopy.save_moves()
      setMovesDatabase(movesDatabaseCopy)
  }

  const getSaveButton = () => {
      const save_available = movesDatabase.is_save_available()
      if (save_available === true) 
          return <Button variant='success' className='save-button' onClick={handleSave}>Save</Button>
      else
          return <Button variant='success' className='save-button' disabled>Save</Button> 
  }

  return (
    <div>
      <div className='moves-history'>
        {mapToPairs(game.get_full_history()).map(item => (
          getElement(item))
        )}
      </div>
      {getSaveButton()}
    </div>
  )
}
