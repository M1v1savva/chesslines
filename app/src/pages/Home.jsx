import { React, useState } from 'react'
import './../index.css'
import './styles/Home.css'
import Carousel from 'react-bootstrap/Carousel'
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import img1 from './img/1.png'
import img2 from './img/2.png'
import img3 from './img/3.png'

function Home() {
    const navigate = useNavigate()

    const [index, setIndex] = useState(0)
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex)
    }

    const handleStart = () => {
        setIndex(1)
    }

    const handleNext = () => {
        setIndex(2)
    }

    const handleNext2 = () => {
        setIndex(3)
    }

    const handleMyMoves = () => {
        navigate('/learn')
    }

    const handleSignIn = () => {
        navigate('/login')
    }

    return (
        <div className='main-body'>
            <div className='about-text'>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <div className='hor'>
                    <div className='text-panel'>
                        <h3>Welcome to Chesslines</h3>
                        <p>Store all your opening lines in one place</p>    
                        <Button className='start1' variant='info' onClick={handleStart}>Start</Button>
                    </div>
                    <img src={img1} className='img1'/>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='hor'>
                    <div className='text-panel'>
                        <ul>
                            <li>For each position you will see a list of suggested moves
                            and a note. The note can be edited. </li>
                        </ul>
                        <Button className='next' variant='info' onClick={handleNext}>Next</Button>
                    </div>
                    <img src={img2} className='img2'/>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='hor'>
                    <div className='text-panel'>
                        <ul>
                            <li>To add moves - play out the line, roll back 
                                and forth with moves panel arrows and press save. 
                                The move sequence all the way to the current position 
                                on the board will be saved to "suggested moves". </li>
                        </ul>
                        <Button className='next2' variant='info' onClick={handleNext2}>Next</Button>
                    </div>
                    <img src={img3} className='img3'/>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='hor'>
                    <div className='text-panel'>
                        <ul>
                            <li>That's it! Now you can try chesslines for youself. 
                                Go to my moves but remember to sign in to save your progress.</li>
                        </ul>
                    </div>
                    <div className='but-panel'>
                        <Button className='my-moves' variant='info' onClick={handleMyMoves}>My Moves</Button>
                        <Button className='sign-in' variant='info' onClick={handleSignIn}>Sign in</Button>
                    </div>
                    </div>
                </Carousel.Item>
                </Carousel>
            </div>
        </div>
    );
}

export default Home