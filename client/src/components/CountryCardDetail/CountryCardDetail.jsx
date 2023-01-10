import "./countryCardDetail.css";
import {React, useEffect}  from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCountryDetail } from "../../redux/actions";
import { Link } from "react-router-dom";

const CountryCardDetail = (props) =>  {
    const countryDetail = useSelector(state => state.country);
    const dispatch = useDispatch();
    const {id} = props.match.params;

    useEffect(() =>  {
        dispatch(getCountryDetail(id))
        }, [dispatch, id]
    );

    return( 
        <div>
            <Link to="/"><p>Return Home</p></Link>
            <img src={countryDetail.image} alt={countryDetail.name} width="300px" height="200px"/>
            <h1>Name: {countryDetail.name}</h1>
            <h3>Capital: {countryDetail.capital}</h3>
            <h4>Continent: {countryDetail.continent}</h4>
            <h4>Subregion: {countryDetail.subregion}</h4>
            <h4>Population: {countryDetail.population}</h4>
            <h4>Area: {countryDetail.area}</h4>
            <div>
                <h4>Tourist activities</h4>
                {countryDetail.activities && countryDetail.activities.length > 0 ? countryDetail.activities.map(activity => {
                    return(
                        <ul id={activity.id}>
                            <li>
                                Name: {activity.name}
                            </li>
                            <li>
                                Difficulty: {activity.difficult}
                            </li>
                            <li>
                                Duraction: {activity.duraction}
                            </li>
                            <li>
                                Season: {activity.season}
                            </li>
                        </ul>
                    )
                }) : <p>Country without tourist activities</p>}
            </div>
        </div>
    )
}

export default CountryCardDetail;