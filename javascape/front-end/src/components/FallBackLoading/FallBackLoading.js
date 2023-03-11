import React from 'react'
import Rocket from "../../images/Rocket.png"
import Mars from "../../images/Mars.png"
import './FallBackLoading.css'

export default function Loading() {
    return (
        <div className="main1">
            <img className='rocket1' src={Mars} alt="Rocket" />
            <div className='circle1'>
                <img className='rocket1' src={Rocket} alt="Rocket" />
            </div>
        </div>
    )
}
