import styles from "./searchBar.module.css";
import axios from "axios";
import { React, useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCountries, getAllActivities, countriesOrderByName, countriesOrderByPopulation} from "../../redux/actions";
import {ORDER_BY_NAME_ASC, ORDER_BY_NAME_DESC, ORDER_BY_POPULATION_ASC, ORDER_BY_POPULATION_DESC} from "../../redux/actions/constants";

export const SearchBar = (props) => {
  const {cbChangeState} = props;
  const activities = useSelector(state => state.activities);
  const [continents, setContinents] = useState([]); 
  const inputName = useRef(null);
  const inputContinent = useRef(null);
  const inputActivity = useRef(null);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllActivities());
   },[dispatch]);

   useEffect(()=> {
      axios.get('http://localhost:3001/continents')
        .then(response => setContinents(response.data))
        .catch(e => alert(e.message));
   }, []);

  const handleFilterOnChange = e => {
    e.preventDefault();
    dispatch(filterCountries(inputName.current.value, 
      inputContinent.current.value, inputActivity.current.value));
    cbChangeState(e.target.value);
  };

  const handleOrderByOnChange = e => {
    e.preventDefault();
    if (e.target.value === ORDER_BY_NAME_ASC || e.target.value === ORDER_BY_NAME_DESC)
        dispatch(countriesOrderByName(e.target.value));
    else
       dispatch(countriesOrderByPopulation(e.target.value));
    cbChangeState(e.target.value);
  }

  const handleOnClearFilters = e => {
    e.preventDefault();
    inputName.current.value = "";
    inputContinent.current.value = "";
    inputActivity.current.value = "";
    handleFilterOnChange(e);
  }

  return (
      <div className={styles.search}>
        <div className={styles.divborderleft}>
        <select 
            name="activity"
            onChange={handleFilterOnChange}
            placeholder='Filter by activities'
            ref={inputActivity}
            className={styles.selectActivity}>           
            <option 
              value=''>All activities
            </option>
            {activities && activities.map((activity) => {
                return (
                  <option 
                    value={activity.id} 
                    key={activity.id}>{activity.name}
                  </option>
                )
            })}
          </select> 
        </div>

        <div className={styles.divcenter}>
          <select 
            onChange={handleFilterOnChange}
            placeholder='Filter by continents'
            name="continent"
            ref={inputContinent} 
            className={styles.selectContinents}>            
            <option 
              value=''>All continents
            </option>
            {continents.map((continent) => {
                return (
                  <option 
                    value={continent.continent} 
                    key={continent.continent}>{continent.continent}
                  </option>
                )
            })}
          </select>

          <input
              type="text"
              name="name"
              placeholder="Filter by name"
              onChange={handleFilterOnChange}
              ref={inputName}
              className={styles.searchName}
              maxLength="20"
            />

          <input
              type="button"
              name="buttonClear"
              value="Clear"
              onClick={handleOnClearFilters}
              className={styles.searchButton}
            />
    
        </div>  

        <div className={styles.divborderright}>
          <select
            name="orderByName"
            onChange={handleOrderByOnChange}
            placeholder="Order by"
            className={styles.selectOrderBy}>
            <option value={ORDER_BY_NAME_ASC}>↑ Name</option>
            <option value={ORDER_BY_NAME_DESC}>↓ Name</option>
            <option value={ORDER_BY_POPULATION_ASC}>↑ Population</option>
            <option value={ORDER_BY_POPULATION_DESC}>↓ Population</option>
          </select>
        </div>
      </div>
    );
};
