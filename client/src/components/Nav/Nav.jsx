import "./nav.css";
import { React, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { filterCountries } from "../../redux/actions";

export const Nav = () => {
  const continents = [
    "Europe",
    "Oceania",
    "Americas",
    "Africa",
    "Asia",
    "Antarctic"
  ];

  const inputName = useRef(null);
  const inputContinent = useRef(null);

  const dispatch = useDispatch();

  const handleFilterByNameOnChange = e => {
    e.preventDefault();
    dispatch(filterCountries(e.target.value, inputContinent.current.value));
  };

  const handleFilterByContinentOnChange = e => {
    e.preventDefault();
    dispatch(filterCountries(inputName.current.value, e.target.value));
  };


  return (
      <div className="nav">
        <Link to="/">Home</Link>

        <div>
          <input
              type="text"
              name="name"
              placeholder="Filter by name"
              onChange={handleFilterByNameOnChange}
              ref={inputName}
            />

          <select 
            onChange={handleFilterByContinentOnChange}
            placeholder='Filter by continents'
            name="continent"
            ref={inputContinent} >            
            <option 
              value=''>All continents
            </option>
            {continents.map((continent) => {
                return (
                  <option 
                    value={continent} 
                    key={continent}>{continent}
                  </option>
                )
            })}
          </select>



        </div>

        <Link to="/">Create tourist activity</Link>
      </div>
    );
};



