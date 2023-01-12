import './createActivity.css';
import React, {useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createActivity } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

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

export const CreateActivity = () => {
    const seasons = ['Summer', 'Autumn',  'Winter', 'Spring'];
    const difficulties = ['Very easy', 'Easy', 'Normal', 'Hard', 'Very hard'];

    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    const refCountrySelect = useRef(null);
    const[errors, setErrors] = useState({});
    const[success, setSuccess] = useState(false);
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
        setErrors({});

        // busco el pais en el detalle de la actividad
        let countryFind = input.countries.length &&
            input.countries.find(country => country.id === refCountrySelect.current.value);
        if (countryFind) {
            setErrors({
                ...errors,
                countries: `Country ${countryFind.name} already exists`
            })
        } else { // si no lo encuentra busco los datos en el estado de paises        
            countryFind = countriesOrdered.find(country => country.id === refCountrySelect.current.value);
            setInput({
                    ...input,
                    countries: [...input.countries, {id: countryFind.id, name: countryFind.name}]
                });
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
            setTimeout(() => setSuccess(false), 3000); 
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

    const handleOnClickReturnHome = (e) => {
        e.preventDefault();
        history.push('/');
    } 
  
    return (
        <div className="container">
            <div className="form">
                <button onClick={handleOnClickReturnHome}>Return home</button>
                <h1>Create tourist activity</h1>
                <form onSubmit={handleOnSubmit} className="form-container">
                    <div className='container-fields'>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={input.name}
                            placeholder="Name"                    
                            onChange={handleOnChange}
                            />

                        {errors.name && (
                           <p className='error'>{errors.name}</p> 
                        )}

                    </div>

                    <div className='container-fields'>
                        <label>Difficulty</label>
                        <select
                            name="difficulty"
                            value={input.difficulty}
                            onChange={handleOnChange}>
                            {difficulties && difficulties.map((difficulty, ind) => {
                                return <option value={ind+1} key={difficulty}>{difficulty}</option>
                            })}
                        </select>        
                    </div>

                    <div className='container-fields'>
                        <label>Duration</label>
                        <input
                            type="text"
                            name="duration"
                            value={input.duration}
                            onChange={handleOnChange}
                            placeholder="For example 3 hours, 2 days ..."
                            />
                        {errors.duration && (
                            <p className='error'>{errors.duration}</p>
                        )}    
                    </div>

                    <div className='container-fields'>
                        <label>Season</label>
                        <select
                            name="season"
                            value={input.season}
                            onChange={handleOnChange}>
                            {seasons && seasons.map(season => {
                                return <option value={season} key={season}>{season}</option>
                            })}
                        </select>
                    </div>

                    <div>
                        <div>
                            <h3>Countries</h3>
                            <select
                                name="countrySelect"
                                ref={refCountrySelect}>
                                {countriesOrdered && countriesOrdered.map(country => {
                                    return ( 
                                    <option value={country.id} key={country.id}>
                                        {country.name}
                                    </option>
                                    )                                
                                })}
                            </select>

                            <button onClick={handleCountryAdd}>Add country</button>
                            
                            {input.countries.length > 0 && input.countries.map(country =>{
                                return (
                                    <div key={country.id}>
                                        <p>
                                            {country.name} 
                                            <button 
                                                id={country.id} 
                                                onClick={handleCountryDelete}>
                                                Delete
                                            </button>
                                        </p> 
                                    </div>
                                )
                            })}

                        </div>
                        {errors.countries && (
                            <p className='error'>{errors.countries}</p>
                        )}
                    </div>
                        
                    <div>    
                        <input 
                            type="submit"
                            value="Create activity"
                            disabled={Object.keys(errors).length > 0 || !input.name || !input.duration || input.countries.length === 0}/>
                    </div>
                </form>

                {errors.serverError &&
                    <div className='error'>
                        <p> {errors.serverError} </p>
                    </div>  
                }

                {success &&
                    <div className='success'>
                        <p> Activity created successfully </p>
                    </div>  
                }
            </div>
        </div>
    )
};

