import React from 'react';

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const PageNumbers = [];

    for(let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++) {
        PageNumbers.push(i);
    }

    return (
        <div>
            <ul className = "pagination justify-content-center">
                {PageNumbers.map(number => (
                    <li key={number} className="page-item">
                    <a onClick={() => paginate(number)} href="!#" className="page-link">
                        {number}
                    </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination;