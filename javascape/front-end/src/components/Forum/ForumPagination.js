import React from 'react'

export default function ForumPagination({ totalPosts, postsPerPage, setCurrentPage }) {
    let pages = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i)
    }

    return (
        <div>
            {
                pages.map((page, i) => {
                    return <button key={i} onClick={() => setCurrentPage(page)}>{page}</button>
                })
            }
        </div>
    )
}
