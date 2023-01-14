import styles from "./nav.module.css";
import { React } from "react";
import { Link } from "react-router-dom";
import WorldImage from '../../img/img-nav-world.jpg';

export const Nav = () => {
  return (
      <div className={ styles.nav }>
        <div className={ styles.logotitle }>
          <img id="world-image" src={WorldImage} alt='logo' className={ styles.logo }/>  

          <p className={styles.title}>
            Henry Countries App
          </p>
        </div>

        <div className={styles.btnbar}>
          <div className={styles.btn}>      
            <Link to="/home">Home</Link>
          </div>

          <div className={styles.btn}>
            <Link to="/home/activities/create">
              Create tourist activity
            </Link>
          </div>
        </div>
      </div>
    );
};



