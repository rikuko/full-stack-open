import React from 'react'
import { useState } from 'react'

const Display = (countriesToShow) => {
    console.log('Display props: ', countriesToShow)
    console.log('Display props length: ', countriesToShow.countriesToShow.length)

    const [languages, setLanguages] = useState([])




    if (countriesToShow.countriesToShow.length === 1) {
        const country = countriesToShow.countriesToShow[0]
        console.log('Country: ', country)
        console.log('Languages: ', country.languages)


        return (
            <div>
                <h3>{country.name.common}</h3>
                <p>Capital: <strong>{country.capital}</strong>
                    <br />
                    Area: <strong>{country.area}</strong></p>
                <h4>Languages:</h4>
                <ul>
                    {Object.values(country.languages).map(language =>
                        <li key={language}>{language}</li>)}
                </ul>
                <img className="flag" src={country.flags.png} alt="flag"></img>
            </div>
        )
    }
    else if (countriesToShow.countriesToShow.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    } else {
        return (
            <div>
                {countriesToShow.countriesToShow.map(country =>
                    <li key={country.cca3}>
                        {country.name.common}
                    </li>)}
            </div>
        )
    }
}

export default Display
