import styles from './activityCreate.module.css';
import React, {useState, useRef} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createActivity } from '../../redux/actions';
import { WindowModal } from '../WindowModal/WindowModal';
import { CountryMiniCard } from '../CountryMiniCard/CountryMiniCard';
import {DIFFICULTIES} from '../../redux/actions/constants';

function validate(input) {
    let errors = {};
    const regexName = /^[A-Za-z0-9 ]{3,50}$/;

    if (!input.name)
        errors.name =  'NAME is required';
    else if (!input.name.match(regexName)) 
        errors.name =  'NAME is incorrect. It must have chararters,numbers and size between 3 and 50';

    if (!input.difficulty)
        errors.difficulty =  'DIFFICULTY is required';

    if (!input.duration) 
        errors.duration = 'DURACTION is required';
    else if (!regexName.test(input.duration))
        errors.duration = 'DURACTION is incorrect. It must have chararters,numbers and size between 3 and 50';

    if (!input.season)
        errors.season =  'SEASON is required';

    console.log('long', input.countries.length);    
    if (!input.countries.length)   
        errors.countries =  'You must have ay least one COUNTRY';

    return errors;
}

const promiseHandleSubmit = (data) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:3001/activities', data)
        .then(data => resolve(data))
        .catch(e => reject(e))
    }); 
}

export const ActivityCreate = () => {
    const seasons = ['Summer', 'Autumn',  'Winter', 'Spring'];

    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    const refCountrySelect = useRef(null);
    const[errors, setErrors] = useState({});
    const[success, setSuccess] = useState(false);
    const[isOpen, setIsOpen] = useState(true);
    const history = useHistory();

    // ordeno los paises para el combo de seleccion de paises, para que sea mas facil buscar
    const countriesOrdered = countries.sort((c1, c2) => {
        const name1 = c1.name.toUpperCase(); // ignore upper and lowercase
        const name2 = c2.name.toUpperCase(); // ignore upper and lowercase
        if (name1 < name2) return -1;
        if (name1 > name2) return 1;     
        return 0;   
    });

    const [input, setInput] = useState({
      name: "",
      difficulty: 1,
      duration: "",
      season: seasons[0],
      countries: []
    });

    const handleOnChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    };

    const handleCountryAdd = (e) => {
        e.preventDefault();

        // busco el pais en el detalle de la actividad
        let countryFind = input.countries.length &&
            input.countries.find(country => country.id === refCountrySelect.current.value);
        if (countryFind) {
            setErrors({
                ...errors,
                countries: `Country ${countryFind.name} already exists`
            });

            setTimeout(()=> {
                setErrors(validate(input));
            }, 2000);
            
        } else { // si no lo encuentra busco los datos en el estado de paises        
            countryFind = countriesOrdered.find(country => country.id === refCountrySelect.current.value);
            setInput({
                    ...input,
                    countries: [...input.countries, 
                        {id: countryFind.id, name: countryFind.name, image: countryFind.image}]
                });

            // lo hago para que me borre en el momento los errores de paises
            // y me active el boton de create activity    
            const e = errors;
            delete e.countries;  
            setErrors(e);
        };
    }

    const handleCountryDelete = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            countries: input.countries.filter(country => country.id !== e.target.id)
        })
    }
    
    const handleOnSubmit = async(e) => {
        e.preventDefault();

        // espero a que la promesa del request devuelva un resultado
        // para saber si el registro fue creado con exito o no.
        // esto es para poder tratar errores back, que no son los mismos
        // que los del front
        await promiseHandleSubmit(input)
        .then(activity => {
            dispatch(createActivity(activity.data))
            setSuccess(true);
            setInput({
                name: "",
                difficulty: 1,
                duration: "",
                season: seasons[0],
                countries: []
            });        
        })
        .catch(e => {
            setErrors({serverError: e.response.data.error})
        });
    }
  
    const handleSuccessClose = () => {
        setSuccess(false);
    }

    const handleActivityCreateClose = () => {
        setIsOpen(false);
        history.goBack();
    }

    return (
        <WindowModal isOpen={isOpen} closeModal={handleActivityCreateClose} buttonCloseUp={true}>
            <div className={styles.form}>
                <div className={styles.formContainerHeading}>
                    Create tourist activity
                </div>
                <form onSubmit={handleOnSubmit} className={styles.formSub}>
                    <label htmlFor="name">
                        <span>Name 
                            <span className={styles.required}>*</span>
                        </span>

                        <input 
                            type="text" 
                            className={styles.inputField} 
                            name="name" 
                            value={input.name}
                            placeholder="Type the name"
                            onChange={handleOnChange} 
                            maxLength="50"
                            />

                        {errors.name && (
                        <p className={styles.errors}>{errors.name}</p> 
                        )}
                    </label>

                    <label htmlFor="difficulty">
                        <span>Difficulty
                            <span className={styles.required}>*</span>
                        </span>

                        <select 
                            name="difficulty" 
                            className={styles.selectField}
                            value={input.difficulty}
                            onChange={handleOnChange}>
                            {DIFFICULTIES && DIFFICULTIES.map((difficulty, ind) => {
                                    return <option value={ind+1} key={difficulty}>{difficulty}</option>
                                })}
                        </select>
                    </label>

                    <label htmlFor="duration">
                        <span>Duration
                            <span className={styles.required}>*</span>
                        </span>

                        <input 
                            type="text" 
                            className={styles.inputField} 
                            name="duration" 
                            value={input.duration}
                            onChange={handleOnChange}
                            placeholder="For example 3 hours, 2 days ..."
                            maxLength="50"
                            />

                        {errors.duration && (
                            <p className={styles.errors}>{errors.duration}</p>
                        )}    
                    </label>


                    <label htmlFor="season">
                        <span>Season
                            <span className={styles.required}>*</span>
                        </span>

                        <select 
                            name="season" 
                            className={styles.selectField}
                            value={input.season}
                            onChange={handleOnChange}>
                            {seasons && seasons.map(season => {
                                return <option value={season} key={season}>{season}</option>
                            })}
                        </select>
                    </label>

                    <div>
                        <div>
                            <div className={styles.formContainerSubheading}>
                                Countries
                            </div>

                            <select
                                name="countrySelect"
                                ref={refCountrySelect}
                                className={styles.selectField}>
                                {countriesOrdered && countriesOrdered.map(country => {
                                    return ( 
                                    <option value={country.id} key={country.id}>
                                        {country.name}
                                    </option>
                                    )                                
                                })}
                            </select>

                            <button 
                                className={styles.formButton}
                                onClick={handleCountryAdd}>
                                Add country
                            </button>
                            
                            <div className={styles.detailCountries} >
                                {input.countries.length > 0 && input.countries.map(country =>{
                                    return (                                                                        
                                            <CountryMiniCard            
                                                key = {country.id}                                
                                                id={country.id}
                                                name = {country.name}
                                                image = {country.image}
                                                cbHandleDelete = {handleCountryDelete}
                                            />
                                    )
                                })}
                                        </div>

                        </div>

                        {errors.countries && (
                           <p className={styles.errors}>{errors.countries}</p>
                        )}

                    </div>
                        
                    <div className={styles.formDivButton}>    
                        <input 
                            type="submit"
                            value="Create activity"
                            className={styles.formButton}
                            disabled={Object.keys(errors).length > 0 || !input.name || !input.duration || input.countries.length === 0}/>
                    </div>
                </form>

                {errors.serverError &&
                    <div className={styles.errors}>
                        <p> {errors.serverError} </p>
                    </div>  
                }

                <WindowModal isOpen={success} closeModal={handleSuccessClose} buttonCloseUp={false}>
                    <p>Activity created successfully !!!</p>
                </WindowModal>
            </div>
        </WindowModal>
    )
};

