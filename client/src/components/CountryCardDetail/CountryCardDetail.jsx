import styles from "./countryCardDetail.module.css";
import {React, useEffect}  from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCountryDetail } from "../../redux/actions";
import { Link } from "react-router-dom";
import ActivityCard from "../ActivityCard/ActivityCard";

const CountryCardDetail = (props) =>  {
    const countryDetail = useSelector(state => state.country);
    const dispatch = useDispatch();
    const {id} = props.match.params;

    useEffect(() =>  {
        dispatch(getCountryDetail(id))
        }, [dispatch, id]
    );

    return( 
        <div className={styles.container}>
            <div className={styles.detailCard}>
                {/* <Link to="/home"><p>Return Home</p></Link> */}
                <div className={styles.flagContainer}>
                    <div className={styles.countryName}>
                        <h2>{countryDetail.name}</h2>
                    </div>
                    <div class={styles.flagImage}>
                        <img src={countryDetail.image} alt={countryDetail.name} width="300px" height="200px"/>
                    </div>
                </div>

                <div className={styles.separator}></div>

                <div className={styles.detailContainer}>
                    <div className={styles.detailContainerLeft}>
                        <div className={styles.detailSubContainerTitle}>
                            <p>Capital</p>
                            <p>Continent</p>
                        </div>
                        <div className={styles.detailSubContainerData}>
                            <p>{countryDetail.capital}</p>
                            <p>{countryDetail.continent} - {countryDetail.subregion}</p>
                        </div>                        
                    </div>

                    <div className={styles.detailContainerRight}>
                        <div className={styles.detailSubContainerTitle}>
                            <p>Population</p>
                            <p>Area</p>
                        </div>
                        <div className={styles.detailSubContainerData}>
                            <p>{countryDetail.population}</p>
                            <p>{countryDetail.area}</p>
                        </div>                        
                    </div>
                </div>

                <div className={styles.separator}>
                    <h5>Tourist activities</h5>
                </div>

                <div className={styles.detailActivities}>
                    {countryDetail.activities && countryDetail.activities.length > 0 ? countryDetail.activities.map(activity => {
                        return (<ActivityCard
                            id = {activity.id}
                            name = {activity.name}
                            season ={activity.season}
                            difficulty = {activity.difficulty}
                            duration = {activity.duration}
                        />)
                    }) : <h6>Country without tourist activities</h6>}
                </div>
            </div>
        </div>
    )
}

export default CountryCardDetail;