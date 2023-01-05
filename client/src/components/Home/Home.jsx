import "./Home.css";
import {React, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getCountries} from "../../redux/actions";
import CountryCard from "../CountryCard/CountryCard";

export const Home = ()=>{
    const dispatch = useDispatch();
    const state = useSelector(state=>state);
    const countries = state.countries;
 
    useEffect(()=>{
        dispatch(getCountries())
     },[dispatch]);
    
    return (
      <div className="countriesHome">
        {countries && countries.map(country => {
                // <Link to={'/home/' + c.id} key={i}>
                return (
                    <CountryCard
                        key={country.id}
                        image={country.image}
                        name={country.name}
                        region={country.region} />
                // </Link>
                )
        })}
      </div>
    );
}
