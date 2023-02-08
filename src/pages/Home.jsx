import React from 'react';
import './../index.css'
import './Home.css'

function Home() {
    return (
        <div className='main-body'>
            <div className='about-text'>
                <div className='home-text'>
                <h1>What is chesslines.com? </h1>
                <p>This is a tool to store your chess opening preparation.</p>
                <br/><h1>Why? </h1>
                <p>Beginner-friendly interface - start using in under a minute. </p>
                <br/><h1>How to use? </h1>
                <p>For each position chesslines stores your comments and possible moves. </p>
                <p>You can edit comments directly for each position. </p>
                <p>To save the moves - use the save button under the moves panel.</p>
                <p>You will save all the moves leading to position on the board.</p>
                </div>
            </div>
        </div>
    );
}

export default Home