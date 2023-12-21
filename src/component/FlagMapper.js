import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function FlagMapper() {
    const [searchTerm, setSearchTerm] = useState("");
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        //function to fetch country details based on the search term
        const fetchCountryDetails = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/currency/${searchTerm}`);
                const data = await response.json();

                // check if data iis an array before update the state
                if(Array.isArray(data)){
                    setCountries(data);
                } else {
                    // if data is not an array
                    setCountries([]);
                }

            } catch (error) {
                console.log("Error fetching country details: ", error);
            }
        };
        //call the fetch function when the searchTerm Changes
        if (searchTerm) {
            fetchCountryDetails();
        }
    }, [searchTerm])
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 input-container">
                        <input
                            type="text"
                            placeholder="Search By currency INR, EUR"
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    </div>
                    <div className="col-md-3"></div>
                </div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {countries.map((country) => (
                                <div className="col" key={country.cca2}>
                                    <div className="card">
                                        <img 
                                            src={`https://flagcdn.com/w160/${country.cca2.toLowerCase()}.png`} 
                                            className="card-img-top" 
                                            alt={country.name.common}/>
                                        <hr />
                                        <div className="card-body">
                                            <p className="card-text">Name: {country.name.common}</p>
                                            <p className="card-text">Capital: {country.capital}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    )
}

export default FlagMapper
