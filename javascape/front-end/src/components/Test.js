import React, { useContext } from 'react'
import { useLocation } from "react-router-dom"
import { MapperContext } from '../globalVariables/MapperContextProvider'

export default function Test() {
    // call data from mapper context js
    const {
        currentUserSkillSet
    } = useContext(MapperContext)

    // Get query from URL
    const location = useLocation()
    // set params
    const params = new URLSearchParams(location.search)

    console.log(currentUserSkillSet)

    return (
        <div>Test</div>
    )
}
