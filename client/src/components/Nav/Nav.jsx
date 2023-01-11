import "./nav.css";
import { React, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterCountries, getAllActivities, getAllContinents} from "../../redux/actions";

export const Nav = () => {
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

  return (
      <div className="nav">
        <Link to="/">Home</Link>

        <div>
          <input
              type="text"
              name="name"
              placeholder="Filter by name"
              onChange={handleFilterOnChange}
              ref={inputName}
            />

          <select 
            onChange={handleFilterOnChange}
            placeholder='Filter by continents'
            name="continent"
            ref={inputContinent} >            
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

          <select 
            name="activity"
            onChange={handleFilterOnChange}
            placeholder='Filter by activities'
            ref={inputActivity}>           
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

        <Link to="/activities/create">Create tourist activity</Link>
      </div>
    );
};



