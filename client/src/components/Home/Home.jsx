import styles from "./home.module.css";
import { React, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getCountries, countriesOrderByName, countriesOrderByPopulation} from "../../redux/actions";
import CountryCard from "../CountryCard/CountryCard";
import { Paginated } from "../Paginated/Paginated";
import { SearchBar } from "../SearchBar/SearchBar";

export const Home = () => {      
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    const errorMessage = useSelector(state => state.error);
 
    const [currentPage, setCurrentPage] = useState(1);
    const [order, setOrder] = useState('');
    const countriesPerPage = 10;
    const countriesPerFirstPage = 9;
    const indexOfLastCountry = parseInt(currentPage) === 1 ? countriesPerFirstPage : (currentPage * countriesPerPage) - 1;   
    const indexOfFirstCountry = parseInt(currentPage) === 1 ? 0 : indexOfLastCountry - countriesPerPage;    
    const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
  
    const handleCallbackOrderBy = value => {
      setCurrentPage(1);
      // es un estado local, que lo uso solo para que renderize si o si, si estoy en la pagina 1
      setOrder(value);
    }
      
    useEffect(()=>{
        dispatch(getCountries());
     },[dispatch]);
      
    return (
      <div>
        <SearchBar
          cbOrderBy={handleCallbackOrderBy}
        />

        <div className={styles.countriesHome}>
          {currentCountries && currentCountries.map(country => {
                  return (
                      <CountryCard
                          key={country.id}
                          id={country.id}
                          image={country.image}
                          name={country.name}
                          continent={country.continent} 
                          population={country.population}
                      />
                  )
          })}

          {errorMessage.hasOwnProperty('error') && (
            <div className="errorBox">
              <p> {errorMessage.error} </p>
            </div>  
          )}
        </div>

        <div>
          <Paginated
              countriesFirstPage = { countriesPerFirstPage } 
              countriesPerPage = { countriesPerPage }
              totalCountries = {countries.length}
              cbPaginated = { paginated }
          /> 
        </div>
        
      </div>
    );
}
