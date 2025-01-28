import React from 'react'

const Display = (country) => {
    console.log('Display ', country.country)
    console.log('Display lang: ', country.country.language)
    console.log('Display name: ', country.country.name.common)

    return (
        <div>
            <h3>{country.country.name.common}</h3>
            <p>Capital: <strong>{country.country.capital}</strong>
                <br />
                Area: <strong>{country.country.area}</strong></p>
            <h4>Languages:</h4>
            <ul>
                {Object.values(country.country.languages).map(language =>
                    <li key={language}>{language}</li>)}
            </ul>
            <img className="flag" src={country.country.flags.png} alt="flag"></img>
        </div>
    )
}

export default Display
