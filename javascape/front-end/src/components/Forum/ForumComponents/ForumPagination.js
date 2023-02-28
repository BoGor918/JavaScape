import React from 'react'

export default function ForumPagination({ totalPosts, postsPerPage, setCurrentPage, currentPage }) {
    // set all pages array
    let pages = []

    // set all pages
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i)
    }

    // button style value
    const buttonActive = 'text-[7px] sm:text-[7px] md:text-[10px] lg:text-[12px] px-[13px] py-2 bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'
    const buttonNonActive = 'text-[7px] sm:text-[7px] md:text-[10px] lg:text-[12px] px-[13px] py-2 bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'
    const buttonResponsive = 'bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 px-[2px] pb-[2px] pt-[0.3px] sm:pt-[0.3px] md:pt-[2px] lg:pt-[2px] w-fit'

    return (
        <div className='flex pt-8'>
            {/* prev page button */}
            <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[54.9rem] pb-5 flex justify-start mx-2">
                <div className={buttonResponsive}>
                    <div>
                        <button onClick={() => setCurrentPage((currentPage) => currentPage !== 1 ? currentPage - 1 : currentPage - 0)} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[12px] px-[13px] py-2 bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Prev</button>
                    </div>
                </div>
            </div>
            {/* pages button with different condition */}
            {
                // if page is in the last page
                currentPage === pages.length && pages.length > 1 ?
                    <>
                        <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[54.9rem] pb-5 flex justify-start mx-1">
                            <div className={buttonResponsive}>
                                <div>
                                    <button onClick={() => setCurrentPage(1)} className={buttonNonActive}>1</button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[54.9rem] pb-5 flex justify-start mx-1">
                            <div className={buttonResponsive}>
                                <div>
                                    <button className={buttonNonActive}>...</button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[54.9rem] pb-5 flex justify-start mx-1">
                            <div className={buttonResponsive}>
                                <div>
                                    <button onClick={() => setCurrentPage(pages.length)} className={buttonActive}>{pages.length}</button>
                                </div>
                            </div>
                        </div>
                    </> // if page is in the first page and the page length is more than 2
                    : currentPage === pages.length - 1 && pages.length > 2 ?
                        <>
                            <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[54.9rem] pb-5 flex justify-start mx-1">
                                <div className={buttonResponsive}>
                                    <div>
                                        <button onClick={() => setCurrentPage(currentPage - 1)} className={buttonNonActive}>{currentPage - 1}</button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[54.9rem] pb-5 flex justify-start mx-1">
                                <div className={buttonResponsive}>
                                    <div>
                                        <button onClick={() => setCurrentPage(currentPage)} className={buttonActive}>{currentPage}</button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[54.9rem] pb-5 flex justify-start mx-1">
                                <div className={buttonResponsive}>
                                    <div>
                                        <button className={buttonNonActive}>...</button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[54.9rem] pb-5 flex justify-start mx-1">
                                <div className={buttonResponsive}>
                                    <div>
                                        <button onClick={() => setCurrentPage(pages.length)} className={buttonNonActive}>{pages.length}</button>
                                    </div>
                                </div>
                            </div>
                        </> // if page is in the other page but not last page minus 1 and not first page
                        : currentPage !== pages.length && currentPage !== pages.length - 1 && currentPage !== 1 ?
                            <>
                                <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[54.9rem] pb-5 flex justify-start mx-1">
                                    <div className={buttonResponsive}>
                                        <div>
                                            <button onClick={() => setCurrentPage(currentPage)} className={buttonActive}>{currentPage}</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[54.9rem] pb-5 flex justify-start mx-1">
                                    <div className={buttonResponsive}>
                                        <div>
                                            <button onClick={() => setCurrentPage(currentPage + 1)} className={buttonNonActive}>{currentPage + 1}</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[54.9rem] pb-5 flex justify-start mx-1">
                                    <div className={buttonResponsive}>
                                        <div>
                                            <button className={buttonNonActive}>...</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[54.9rem] pb-5 flex justify-start mx-1">
                                    <div className={buttonResponsive}>
                                        <div>
                                            <button onClick={() => setCurrentPage(pages.length)} className={buttonNonActive}>{pages.length}</button>
                                        </div>
                                    </div>
                                </div>
                            </> // if page is in the first page
                            : currentPage === 1 && pages.length > 1 ?
                                <>
                                    <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[54.9rem] pb-5 flex justify-start mx-1">
                                        <div className={buttonResponsive}>
                                            <div>
                                                <button onClick={() => setCurrentPage(1)} className={buttonActive}>1</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[54.9rem] pb-5 flex justify-start mx-1">
                                        <div className={buttonResponsive}>
                                            <div>
                                                <button className={buttonNonActive}>...</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[54.9rem] pb-5 flex justify-start mx-1">
                                        <div className={buttonResponsive}>
                                            <div>
                                                <button onClick={() => setCurrentPage(pages.length)} className={buttonNonActive}>{pages.length}</button>
                                            </div>
                                        </div>
                                    </div>
                                </> // if is in the first page and length only one
                                : currentPage === 1 && pages.length === 1 ?
                                    <>
                                        <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[54.9rem] pb-5 flex justify-start mx-1">
                                            <div className={buttonResponsive}>
                                                <div>
                                                    <button onClick={() => setCurrentPage(1)} className={buttonActive}>1</button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    : <></>
            }
            {/* next page button */}
            <div className="w-full max-w-[20.88rem] sm:max-w-[20.88rem] md:max-w-[44.9rem] lg:max-w-[54.9rem] pb-5 flex justify-start mx-2">
                <div className={buttonResponsive}>
                    <div>
                        <button onClick={() => setCurrentPage((currentPage) => currentPage < pages.length ? currentPage + 1 : currentPage + 0)} className='text-[7px] sm:text-[7px] md:text-[10px] lg:text-[12px] px-[13px] py-2 bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Next</button>
                    </div>
                </div>
            </div>
        </div >
    )
}
