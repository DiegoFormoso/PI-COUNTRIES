import styles from "./countryCardDetail.module.css";
import {React, useEffect, useState}  from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearStates, getCountryDetail } from "../../redux/actions";
import ActivityCard from "../ActivityCard/ActivityCard";
import { WindowModal } from "../WindowModal/WindowModal";
import { useHistory } from "react-router-dom";

const CountryCardDetail = (props) =>  {
    const countryDetail = useSelector(state => state.country);
    const dispatch = useDispatch();
    const {id} = props.match.params;
    const [isOpen, setIsOpen] = useState(true);
    const history= useHistory()

    useEffect(() =>  {
        dispatch(getCountryDetail(id));
        return () => {
            dispatch(clearStates());
        }
        }, [dispatch, id]
    );

    const handleOnClose = () => {
        setIsOpen(false);
        history.goBack();
    }

    return( 
        <WindowModal isOpen={isOpen} closeModal={handleOnClose} buttonCloseUp={true}>
            <div className={styles.container}>
                <div className={styles.detailCard}>
                    <div className={styles.flagContainer}>
                        <div className={styles.countryName}>
                            <h2>{countryDetail.name + " ("+ countryDetail.id +")"}</h2>
                        </div>
                        <div className={styles.flagImage}>
                            <img src={countryDetail.image} alt={countryDetail.name} width="300px" height="200px"/>
                        </div>
                    </div>

                    <div className={styles.separator}></div>

                    <div className={styles.detailContainer}>
                        <div className={styles.detailContainerLeft}>
                            <div className={styles.detailSubContainerTitle}>
                                <p>Capital:</p>
                                <p>Continent:</p>
                            </div>
                            <div className={styles.detailSubContainerData}>
                                <p>{countryDetail.capital}</p>
                                <p>{countryDetail.continent} - {countryDetail.subregion}</p>
                            </div>                        
                        </div>

                        <div className={styles.detailContainerRight}>
                            <div className={styles.detailSubContainerTitle}>
                                <p>Population:</p>
                                <p>Area:</p>
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
                                key = {activity.id}
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
        </WindowModal>
    )
}

export default CountryCardDetail;