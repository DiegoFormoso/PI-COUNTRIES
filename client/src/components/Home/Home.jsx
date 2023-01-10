import "./home.css";
import {React, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getCountries} from "../../redux/actions";
import CountryCard from "../CountryCard/CountryCard";

export const Home = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const countries = state.countries;
    const errorMessage = state.error;
 
    useEffect(()=>{
        dispatch(getCountries())
     },[dispatch]);
      
    return (
      <div className="countriesHome">
        {countries && countries.map(country => {
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

    );
}
