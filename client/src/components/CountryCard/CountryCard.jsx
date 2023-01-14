import styles from "./countryCard.module.css";
import React from "react";
import { Link } from "react-router-dom";

const CountryCard = (props) => {
  const {id, name, image, continent, population } = props;
  const numberFormat = new Intl.NumberFormat("es-ES");

  return (
      <div className={styles.card}>
        <Link to={`/home/countries/${id}`}>
          <div>
            <div className={styles.flagimage}>          
              <img src={image} alt={name}/>
            </div>

            <p className={styles.cardCountryName}>{name}</p>
            <p className={styles.cardCountryContinent}>{continent}</p>
            <p className={styles.cardCountryPopulation}>{`${numberFormat.format(population)} people`}</p>
            </div>
          </Link>
      </div>
  );
};

export default CountryCard;