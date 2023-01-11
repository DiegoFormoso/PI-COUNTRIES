import './paginated.css';
import React from 'react';

export const Paginated = (data) => {
    const {countriesFirstPage, countriesPerPage, totalCountries, cbPaginated} = data;
    const pageNumbers = [];

    const totalPages = Math.ceil((totalCountries - countriesFirstPage) / countriesPerPage) + 1;
    for (let i=0; i < totalPages; i++) {
        pageNumbers.push(i+1);
    }

    const handleOnClickPage = (e) => {
        e.preventDefault();
        cbPaginated(e.target.id);
    }
    
    return(
        <nav>
            <ul className="footer">
                { pageNumbers && pageNumbers.map(pageNumber => (
                    <li className='number' key={pageNumber}>      
                        <button 
                            className="paginationButton"
                            id={pageNumber} 
                            onClick={handleOnClickPage}>
                        {pageNumber}
                        </button> 
                    </li> 
                ))}
            </ul>
        </nav>
    )    
}