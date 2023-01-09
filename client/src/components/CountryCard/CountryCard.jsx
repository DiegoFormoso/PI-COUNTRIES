import "./countryCard.css";
import React from "react";

const CountryCard = (props) => {
  const {id, name, image, continent, } = props;
//  const dispatch = useDispatch();

//   const handleOnClick = e => {
//     e.preventDefault();
//     dispatch(actions.deleteCharacter(id));
//   };

  return (
    <div className="card">
      {/* <Link to={`/character/${id}`}><h3>{name}</h3></Link> */}
      <img src={image} alt={name}/>
      <p className="cardCountryName">{name}</p> 
      <p className="cardCountryRegion">{continent}</p> 
    </div>
  );
};

export default CountryCard;