import styles from "./searchBar.module.css";
import { React, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCountries, getAllActivities, getAllContinents, countriesOrderByName, countriesOrderByPopulation} from "../../redux/actions";
import {ORDER_BY_NAME_ASC, ORDER_BY_NAME_DESC, ORDER_BY_POPULATION_ASC, ORDER_BY_POPULATION_DESC} from "../../redux/actions/constants";

export const SearchBar = (props) => {
  const {cbOrderBy} = props;

  const continents = useSelector(state => state.continents);
  const activities = useSelector(state => state.activities);

  const inputName = useRef(null);
  const inputContinent = useRef(null);
  const inputActivity = useRef(null);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllActivities());
   },[dispatch]);

   useEffect(()=> {
     dispatch(getAllContinents());
   },[dispatch]);

  const handleFilterOnChange = e => {
    e.preventDefault();
    dispatch(filterCountries(inputName.current.value, 
      inputContinent.current.value, inputActivity.current.value));
  };

  const handleOrderByOnChange = e => {
    e.preventDefault();
    if (e.target.value === ORDER_BY_NAME_ASC || e.target.value === ORDER_BY_NAME_DESC)
        dispatch(countriesOrderByName(e.target.value));
    else
       dispatch(countriesOrderByPopulation(e.target.value));
    cbOrderBy(e.target.value);
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
            />

          <input
              type="button"
              name="pepe"
              value="Search"
              placeholder="Search"
              onChange={handleFilterOnChange}
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
