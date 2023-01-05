import "./CountryCard.css";
import React from "react";
// import * as actions from "../../redux/actions";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// Importar las actions como Object Modules, sino los test no funcionarán!

//PARA QUE LOS TEST CORRAN, DEBEN HACER ESTE COMPONENTE COMO UN FUNCIONAL COMPONENT.

const CountryCard = (props) => {
  const {id, name, image, region, } = props;
//  const dispatch = useDispatch();

//   const handleOnClick = e => {
//     e.preventDefault();
//     dispatch(actions.deleteCharacter(id));
//   };

  return (
    <div className="card">
      {/* <Link to={`/character/${id}`}><h3>{name}</h3></Link> */}
      <img src={image} alt={name}/>
      <p>{name}</p> 
      <p>{region}</p> 
    </div>
  );
};

export default CountryCard;