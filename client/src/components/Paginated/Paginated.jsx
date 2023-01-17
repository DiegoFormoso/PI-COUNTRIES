import React from 'react';
import styles from "./paginated.module.css";

export const Paginated = (data) => {
    const {countriesFirstPage, countriesPerPage, totalCountries, cbPaginated, actualPage} = data;
    const pagesByPage = 10
    const totalPages = Math.ceil((totalCountries - countriesFirstPage) / countriesPerPage) + 1;
    const paginaActual = Math.ceil(actualPage / pagesByPage);
    const firsPage = ((paginaActual - 1) * 10) + 1;

    const pageNumbers = [];
    for (let i= firsPage; i <= pagesByPage + firsPage - 1 && i <= totalPages; i++) 
        pageNumbers.push(i);

    const handleOnClickPage = (e) => {
        e.preventDefault();
        cbPaginated(e.target.id);
    }

    const handleOnClickPageBack = (e) => {
        e.preventDefault();        
        const firstPage = pageNumbers[0];
        if (firstPage > 1) 
            cbPaginated(firstPage-pagesByPage);
    }
    
    const handleOnClickPageForward = (e) => {
        e.preventDefault();        
        const lastPage = pageNumbers[pageNumbers.length-1];
        if (lastPage < totalPages)             
            cbPaginated(lastPage + 1);
    }

    return (
        <div className={styles.navbar}>
            <ul className={styles.navbarbuttons}>
                <li className='number'>      
                    <button 
                        className={styles.paginationButton}
                        id="btnPageBack" 
                        onClick={handleOnClickPageBack}>
                    {"<<"}
                    </button> 
                </li>
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

                <li className='number'>      
                    <button 
                        className={styles.paginationButton}
                        id="btnPageBack" 
                        onClick={handleOnClickPageForward}>
                    {">>"}
                    </button> 
                </li>

            </ul>
        </div>
    )    
}