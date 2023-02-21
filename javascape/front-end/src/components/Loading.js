import React from 'react'
import "../global.css"
import Rocket from "../images/Rocket.png"
import Mars from "../images/Mars.png"

export default function Loading() {

    return (
        <div className="main">
            <img className='rocket' src={Mars} alt="Rocket" />
            <div className='circle'>
                <img className='rocket' src={Rocket} alt="Rocket" />
            </div>
        </div>
    )
}
