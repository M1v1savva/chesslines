import './styles/Comment.css'
import React, { useState } from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function Comment({game, setGame, movesDatabase, setMovesDatabase}) {

  const [commentText, setCommentText] = useState("")
  const [formSwitch, setFormSwitch] = useState(false)
  const [lastText, setLastText] = useState('')

  const onChange = (event) => {
    setCommentText(event.target.value)
  }

  const getBody = () => {
    if (formSwitch == true && movesDatabase.is_edit_on()) {
      return <textarea className='form-body' value={commentText} onChange={onChange}></textarea>
    } else {
      return (
      <div className='comment-panel'>
        <p className='comment-body'>{movesDatabase.get_comment()}</p>
      </div>
      ) 
    }
  }

  const handleEdit = () => {
    setFormSwitch(formSwitch ^ true)
    const saved_comment = movesDatabase.get_comment()
    setCommentText(saved_comment)
    setLastText(saved_comment)
    
    const movesDatabaseCopy = movesDatabase.copy()
    movesDatabaseCopy.set_edit_on(true)
    setMovesDatabase(movesDatabaseCopy)
  }

  const handleSave = () => {
    setFormSwitch(formSwitch ^ true)
    setLastText(commentText)

    const movesDatabaseCopy = movesDatabase.copy()
    movesDatabaseCopy.set_edit_on(false)
    movesDatabaseCopy.set_comment(commentText)
    setMovesDatabase(movesDatabaseCopy)
  }

  const handleCancel = () => {
    setFormSwitch(formSwitch ^ true)
    setCommentText(lastText)

    const movesDatabaseCopy = movesDatabase.copy()
    movesDatabaseCopy.set_edit_on(false)
    setMovesDatabase(movesDatabaseCopy)
  }

  const getButtons = () => {
    if (formSwitch == true && movesDatabase.is_edit_on()) {
      return (
      <div>
        <Button className='save-comment-button' variant='info' onClick={handleSave}>Save</Button> 
        <Button className='cancel-comment-button' variant='info' onClick={handleCancel}>Cancel</Button> 
      </div>  
      )  
    } else {
      return <Button className='edit-button' variant='info' onClick={handleEdit}>Edit</Button>   
    }  
  }

  return (
    <div>
    <h3 className='comment-title'>Position note</h3>
    <div>
      {getBody()}
    </div>
    <div>
      {getButtons()}
    </div>
    </div>
  )
}
