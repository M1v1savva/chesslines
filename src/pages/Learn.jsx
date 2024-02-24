import { React, useState, useEffect} from 'react'
import { GameWrapper } from '../classes/GameWrapper.js'
import BoardWrapper from "./../components/BoardWrapper"
import Button from 'react-bootstrap/Button';
import MovesPanel from "./../components/MovesPanel"
import BaseMoves from './../components/BaseMoves'
import Comment from './../components/Comment'
import './../index.css'
import './styles/Learn.css'
import { MovesDatabase } from '../classes/MovesDatabase';
import { getCommentRequest, getMovesRequest } from '../classes/ServerRequests.js';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import MoveButtons from './../components/MoveButtons'
import Alert from 'react-bootstrap/Alert';

function Learn({token}) {
    const [chessboardSize, setChessboardSize] = useState(10)
    const [gameWrapper, setGameWrapper] = useState(new GameWrapper())
    const [movesDatabase, setMovesDatabase] = useState(new MovesDatabase())
    const [currentOrientation, setBoardOrientation] = useState('white') // add class helper
    const [dropDownValue, setDropDownValue] = useState('Play as white')

    useEffect(() => {
        function handleResize() {
        const display = document.getElementsByClassName("container")[0]
        setChessboardSize(500)
        }

        window.addEventListener("resize", handleResize)
        handleResize()
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (!token && token !== '' && token !== undefined)
            return

        const movesDatabaseCopy = movesDatabase.copy()
        movesDatabase.setToken(token)
        setMovesDatabase(movesDatabaseCopy)
    }, [])

    useEffect(() => {
        if (!token && token !== '' && token !== undefined)
            return

        const apiCall = async() => {
            try {
                const comment_data = await getCommentRequest(token)
                const move_data = await getMovesRequest(token)
                const newMovesDatabase = new MovesDatabase(move_data, comment_data)
                newMovesDatabase.setToken(token)
                setMovesDatabase(newMovesDatabase)
            } catch(error) {
                console.log(error)
            }
        }
        apiCall()
    }, [])

    const handleSelect1 = (event) => {
        setDropDownValue('Play as white')
        setBoardOrientation('white')
    }
    const handleSelect2 = (event) => {
        setDropDownValue('Play as black')
        setBoardOrientation('black')
    }
    
    return (
        <div className='main-body'>
            <div className='about-text'>
                <div className='split-board'>
                    <div className='left-side'>
                        <DropdownButton menuVariant='dark' variant='info' className='play-as' id="dropdown-basic-button" title={dropDownValue}>
                            <Dropdown.Item value='As white' onClick={handleSelect1}>Play as white</Dropdown.Item>
                            <Dropdown.Item value='As black' onClick={handleSelect2}>Play as black</Dropdown.Item>
                        </DropdownButton>   

                        <MovesPanel 
                            game={gameWrapper}
                            setGame={setGameWrapper}
                            movesDatabase={movesDatabase}
                            setMovesDatabase={setMovesDatabase}
                        /> 
                        
                        <MoveButtons game={gameWrapper} setGame={setGameWrapper} 
                        movesDatabase={movesDatabase} setMovesDatabase={setMovesDatabase}/>
                    </div>
                    
                    <div className='middle-side'>
                        <BoardWrapper className='chess-container' 
                            boardOrientation={currentOrientation}
                            boardWidth={chessboardSize} 
                            game={gameWrapper}
                            setGame={setGameWrapper}
                            movesDatabase={movesDatabase}
                            setMovesDatabase={setMovesDatabase}
                        />
                        {
                        !token && token!=='' && token!==undefined ? 
                        <Alert className='alert-panel' variant='danger'>
                            <a className='link' href='/login'>Sign in </a>&nbsp;to save your changes.
                        </Alert>
                        :
                        <></>
                        }
                    </div>
                    <div className='right-side'>
                        <BaseMoves
                            game={gameWrapper}
                            setGame={setGameWrapper}
                            movesDatabase={movesDatabase}
                            setMovesDatabase={setMovesDatabase}
                        />
                        <Comment
                            game={gameWrapper}
                            setGame={setGameWrapper}
                            movesDatabase={movesDatabase}
                            setMovesDatabase={setMovesDatabase}
                        />
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Learn