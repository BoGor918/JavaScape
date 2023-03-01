import React, { useEffect, useState, useContext } from 'react'
import { useLocation } from "react-router-dom"
import PrintStringHelloWorld from './Compilers/PrintStringHelloWorld'
import PrintMultipleString from './Compilers/PrintMultipleString'
import DoubleQuote from './Compilers/DoubleQuote'
import NavBar from '../NavBar'
import ForLoopSyntax from './Compilers/ForLoopSyntax'
import NestedLoop from './Compilers/NestedLoop'
import Loading from '../Loading'
import { MapperContext } from '../../globalVariables/MapperContextProvider'
import EmailVerification from "../EmailVerification";

export default function Compiler() {
    // call data from mapper context js
    const {
        authUser,
    } = useContext(MapperContext);

    // Get query from URL
    const location = useLocation()
    // set params
    const params = new URLSearchParams(location.search)
    // loading function
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [])

    return (
        <div>
            {
                loading ? <Loading /> :
                    authUser != null && authUser.emailVerified === false ? <EmailVerification /> :
                        <div className='Compiler flex flex-col text-white font-exo w-full'>
                            <NavBar />
                            {/* Content */}
                            <div className='w-full h-full overflow-auto flex flex-col items-center mb-[7rem] sm:mb-[7rem] md:mb-[10rem] lg:mb-[10rem]'>
                                {/* Title */}
                                <span className='mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>{params.get("program").replace(/-/g, ' ')}</span>
                                {/* Compiler Content */}
                                <div className='w-full flex flex-col justify-center items-center'>
                                    {
                                        params.get("program") === "print-single-string" ? <PrintStringHelloWorld />
                                            :
                                            params.get("program") === "print-multiple-string" ? <PrintMultipleString />
                                                :
                                                params.get("program") === "double-quote" ? <DoubleQuote />
                                                    :
                                                    params.get("program") === "for-loop-print" ? <ForLoopSyntax />
                                                        :
                                                        params.get("program") === "nested-loops" ? <NestedLoop />
                                                            : null
                                    }
                                </div>
                            </div>
                        </div>
            }
        </div>
    )
}
