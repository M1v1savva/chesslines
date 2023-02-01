import { React, useState, useEffect} from 'react'
import { GameWrapper } from '../classes/GameWrapper.js'
import BoardWrapper from "./../components/BoardWrapper"
import Button from 'react-bootstrap/Button';
import MovesPanel from "./../components/MovesPanel"
import BaseMoves from './../components/BaseMoves'
import Comment from './../components/Comment'
import './../index.css'
import './Learn.css'
import { MovesDatabase } from '../classes/MovesDatabase';
import { getCommentRequest, getMovesRequest } from '../classes/ServerRequests.js';

function Learn({token}) {
    const [chessboardSize, setChessboardSize] = useState(10)
    const [gameWrapper, setGameWrapper] = useState(new GameWrapper())
    const [movesDatabase, setMovesDatabase] = useState(new MovesDatabase())

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
        const movesDatabaseCopy = movesDatabase.copy()
        movesDatabase.setToken(token)
        setMovesDatabase(movesDatabaseCopy)
    }, [])

    useEffect(() => {
        const apiCall = async() => {
            try {
                const comment_data = await getCommentRequest(token)
                const move_data = await getMovesRequest(token)
                setMovesDatabase(new MovesDatabase(move_data, comment_data))
            } catch(error) {
                console.log(error)
            }
        }
        apiCall()
    }, [])
    
    return (
        <div className='main-body'>
            <div className='about-text'>
                <div className='split-board'>
                    <BoardWrapper className='chess-container' 
                        boardWidth={chessboardSize} 
                        game={gameWrapper}
                        setGame={setGameWrapper}
                        movesDatabase={movesDatabase}
                        setMovesDatabase={setMovesDatabase}
                    />
                    <MovesPanel 
                        game={gameWrapper}
                        setGame={setGameWrapper}
                        movesDatabase={movesDatabase}
                        setMovesDatabase={setMovesDatabase}
                    />
                    <div>
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