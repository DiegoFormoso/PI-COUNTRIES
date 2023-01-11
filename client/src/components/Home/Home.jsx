import "./home.css";
import { React, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getCountries, countriesOrderByName, countriesOrderByPopulation, clearStates} from "../../redux/actions";
import CountryCard from "../CountryCard/CountryCard";
import { Paginated } from "../Paginated/Paginated";

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

    const handleOrderByNameOnChange = e => {
      e.preventDefault();
      dispatch(countriesOrderByName(e.target.value));
      setCurrentPage(1);
      // es un estado local, que lo uso solo para que renderize si o si, si estoy en la pagina 1
      setOrder('name_' + e.target.value);
    }
  
    const handleOrderByPopulationOnChange = e => {
      e.preventDefault();
      dispatch(countriesOrderByPopulation(e.target.value));
      setCurrentPage(1);
      // es un estado local, que lo uso solo para que renderize si o si, si estoy en la pagina 1
      setOrder('population_' + e.target.value);
    }
  
    useEffect(()=>{
        dispatch(getCountries())
        return ()=>{
          dispatch(clearStates())
        }
     },[dispatch]);
      
    return (
      <div>
        <div>
          <select
            name="orderByName"
            placeholder='Order by name'
            onChange={handleOrderByNameOnChange}
            >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>

          <select
            name="orderByPopulation"
            placeholder='Order by population'
            onChange={handleOrderByPopulationOnChange}
            >
            <option value="asc">0-9</option>
            <option value="desc">9-0</option>
          </select>
        </div>


        <div className="countriesHome">
          {currentCountries && currentCountries.map(country => {
                  return (
                      <CountryCard
                          key={country.id}
                          id={country.id}
                          image={country.image}
                          name={country.name}
                          continent={country.continent} 
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
