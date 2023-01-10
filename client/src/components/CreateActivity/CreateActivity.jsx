import './createActivity.css';
import React, {useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createActivity } from '../../redux/actions';
import { useHistory } from 'react-router-dom';

function validate(input) {
    let errors = {};
    if(!input.name || input.name.length < 3 || !input.name.match( (/^[A-Za-z]+$/))) 
        errors.name =  'Enter a correct activity NAME';
    else if (!input.duration) 
        errors.duration = 'Enter a correct activity DURACTION';
    return errors;
}

export const CreateActivity = () => {
    const seasons = ['Summer', 'Autumn',  'Winter', 'Spring'];
    const difficulties = ['Very easy', 'Easy', 'Normal', 'Hard', 'Very hard'];

    const dispatch = useDispatch();
    const serverError = useSelector(state => state.error);
    const countries = useSelector(state => state.countries);
    const refCountrySelect = useRef(null);
    const[errors, setErrors] = useState({});
    const history = useHistory();

    countries.sort((c1, c2) => {
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
        const countryFind = countries.find(country => country.id === refCountrySelect.current.value);
        setInput({
            ...input,
            countries: [...input.countries, {id: countryFind.id, name: countryFind.name}]
        })
    }

    const handleCountryDelete = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            countries: input.countries.filter(country => country.id !== e.target.id)
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(createActivity(input));
        alert(`${input.name} created successfully`);
        setInput({
            name: "",
            difficulty: 1,
            duration: "",
            season: seasons[0],
            countries: []
        })        
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
                                {console.log(countries)}
                                {countries && countries.map(country => {
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
                                        <p>{country.name} 
                                            <button id={country.id} onClick={handleCountryDelete}>Delete</button>
                                        </p> 
                                    </div>
                                )
                            })}

                        </div>
                        {errors.countries && (
                            <p className='error'>{errors.countries}</p>
                        )}
                    </div>
                        
                    <button type="submit">Create activity</button>
                </form>

                {serverError.hasOwnProperty('error') &&
                <div className='error'>
                    <p> {serverError.error} </p>
                </div>  
                }
            </div>
        </div>
    )
};

