import styles from "./countryMiniCard.module.css";

export const CountryMiniCard = (props) => {
    const {id, name, image, cbHandleDelete} = props;

    return (
        <div className={styles.card}>
            <div className={styles.flagimage}>          
                <img src={image} alt={name}/>
            </div>
            <p className={styles.cardCountryName}>{name}</p>
            <button 
                id={id}
                className={styles.btnClose} 
                onClick={cbHandleDelete}>Delete
            </button>            
        </div>
    )
}