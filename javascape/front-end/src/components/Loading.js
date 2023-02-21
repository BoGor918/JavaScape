import React from 'react'
import "../global.css"
import Rocket from "../images/Rocket.png"

export default function Loading() {

    return (
        <div className="main">
            <div className='circle'>
                <img className='rocket' src={Rocket} alt="Rocket" />
            </div>
        </div>
    )
}
