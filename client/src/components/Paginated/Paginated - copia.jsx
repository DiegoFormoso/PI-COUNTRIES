import React, { useEffect, useState } from 'react';
import styles from "./paginated.module.css";

export const Paginated = (data) => {
    const {countriesFirstPage, countriesPerPage, totalCountries, cbPaginated} = data;

    const totalPages = Math.ceil((totalCountries - countriesFirstPage) / countriesPerPage) + 1;
    const maxPages = totalPages < 10 ? totalPages : 10;
    console.log(totalPages, maxPages);
    const [pageNumbers, setPageNumbers] = useState(Array.from(Array(maxPages)).map((e,i)=>i+1));

    const handleOnClickPage = (e) => {
        e.preventDefault();
        cbPaginated(e.target.id);
    }

    const handlePagePrior = (e) => {
        e.preventDefault();
        if (pageNumbers[0] > 1) {
            let pg = [];
            const firstPage = pageNumbers[0] - maxPages;
            if (firstPage < 0) firstPage = 1;            
            for (let i=firstPage; i <= totalPages && i < firstPage + maxPages; i++) 
                pg.push(i);
            setPageNumbers(pg);    
        }
    }
    
    const handlePageNext = (e) => {
        e.preventDefault();
        if (pageNumbers[pageNumbers.length-1] < totalPages) {
            let pg = [];
            const lastPage = pageNumbers[pageNumbers.length-1] + 1;
            for (let i=lastPage; i <= totalPages && i < lastPage + maxPages; i++) 
                pg.push(i);
            setPageNumbers(pg);    
        }
    }

    return(
        <nav className={styles.navbar}>

            <div className={styles.divbar}>
                <button 
                    className={styles.paginationButton}
                    id="pagePrior" 
                    onClick={handlePagePrior}>
                {"<"}
                </button> 

                <label>...</label>

                { pageNumbers && pageNumbers.map(pageNumber => (
                    <div className='number' key={pageNumber}>      
                        <button 
                            className={styles.paginationButton}
                            id={pageNumber} 
                            onClick={handleOnClickPage}>
                        {pageNumber}
                        </button> 
                    </div>
                ))}

                <label>...</label>
        
                <button 
                    className={styles.paginationButton}
                    id="pageNext" 
                    onClick={handlePageNext}>
                {">"}
                </button> 
            </div>


            <ul className={styles.footer}>
                { pageNumbers && pageNumbers.map(pageNumber => (
                    <li className={styles.number} key={pageNumber}>      
                        <button 
                            className={styles.paginationButton}
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