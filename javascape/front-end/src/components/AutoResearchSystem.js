/* eslint-disable array-callback-return */
import React, { useEffect, useState, useContext } from "react";
import axios from "./Utils/axios";
import { useLocation } from "react-router-dom"
import NavBar from "./NavBar";
import { MapperContext } from '../globalVariables/MapperContextProvider'
import EmailVerification from "./EmailVerification";
import Loading from "./Loading";

export default function AutoResearchSystem() {
    // call data from mapper context js
    const {
        authUser,
    } = useContext(MapperContext);

    // loading function
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [])

    // Get query from URL
    const location = useLocation()
    // set params
    const params = new URLSearchParams(location.search)
    // get query value 
    const query = params.get("question")
    // set data for printing from back-end
    const [data, setData] = useState([]);

    // search function for getting query data from back-end to front-end
    const search = async (query) => {
        const { data } = await axios.get("/querySearch?q=" + query);
        return data;
    };

    // calling the search function
    useEffect(() => {
        search(query).then((data) => {
            setData(data);
        });
    }, [query]);

    return (
        <div>
            {
                loading ? <Loading /> :
                    authUser != null && authUser.emailVerified === false ? <EmailVerification /> :
                        <div className='AutoResearchSystem flex flex-col text-white font-exo w-full'>
                            <NavBar />
                            {/* Content */}
                            <div className='w-full h-full overflow-auto flex flex-col items-center'>
                                {/* Title */}
                                <span className='text-center mt-[10rem] sm:mt-[10rem] lg:mt-[13rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] text-[1.7rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] uppercase font-extrabold text-[#B154F0]'>Auto Research Topic: {params.get("question").replace(/-/g, ' ')}</span>
                                {/* Results Column */}
                                <div className='w-full flex flex-col justify-center items-center'>
                                    {/* All Results View */}
                                    <div className='w-full flex flex-col justify-center items-center'>
                                        <div className='flex flex-col max-w-[21rem] sm:max-w-[21rem] md:max-w-[45rem] lg:max-w-[80rem] mb-[3rem] sm:mb-[3rem] lg:mb-[6rem] w-full rounded-2xl border-2 bg-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 py-5 px-[20px] sm:px-[20px] md:px-[35px] lg:px-[50px]'>
                                            {data.map((item, i) => {
                                                return (
                                                    <div key={i}>
                                                        <div className='font-bold underline'>Result {i + 1}</div>
                                                        <div>Title: {item.title}</div>
                                                        <div>Description: {item.description}</div>
                                                        <div className="mb-10 truncate ...">URL: <a href={item.link} target="_blank" className="no-underline hover:underline" rel="noreferrer">{item.link}</a></div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            }
        </div>
    )
}
