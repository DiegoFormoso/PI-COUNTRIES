import React from 'react';
import { useState } from 'react';
import styles from "./paginated.module.css";

export const Paginated = (data) => {
    const {countriesFirstPage, countriesPerPage, totalCountries, cbPaginated} = data;
    const pageNumbers = [];

    const pagesPerPage = 10
    const [actualPage, setActualPage] = useState(1);

    const totalPages = Math.ceil((totalCountries - countriesFirstPage) / countriesPerPage) + 1;
    for (let i=0; i < totalPages; i++) {
        pageNumbers.push(i+1);
    }

    const handleOnClickPage = (e) => {
        e.preventDefault();
        cbPaginated(e.target.id);
        setActualPage(e.target.id);
    }
    
    return (
        <nav>
            <ul className={styles.navbarbuttons}>
                { pageNumbers && pageNumbers.map(pageNumber => (
                    <li className='number' key={pageNumber}>      
                        <button 
                            className={(parseInt(actualPage) === parseInt(pageNumber) && 
                                styles.paginationButtonSelected) || (styles.paginationButton)}
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