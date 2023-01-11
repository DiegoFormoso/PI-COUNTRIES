import "./countryCard.css";
import React from "react";
import { Link } from "react-router-dom";

const CountryCard = (props) => {
  const {id, name, image, continent } = props;
//  const dispatch = useDispatch();

  //  const handleOnClick = e => {
  //    e.preventDefault();
  //    dispatch(actions.deleteCharacter(id));
  //  };

  return (
    <div className="card">
      <img src={image} alt={name}/>
      <Link to={`/countries/${id}`}><p className="cardCountryName">{name}</p></Link>
      <p className="cardCountryRegion">{continent}</p> 
    </div>
  );
};

export default CountryCard;