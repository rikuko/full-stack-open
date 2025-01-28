
import Display from "./Display"

const Finder = (countriesToShow) => {
    console.log('Finder props: ', countriesToShow)
    console.log('Finder props length: ', countriesToShow.countriesToShow.length)



    const showCountry = (country) => {
        console.log('Show country props: ', country)
        return (
            <Display country={country} />
        )
    }

    //Suoritetaan kun hakutuloksia on 1
    if (countriesToShow.countriesToShow.length === 1) {
        const country = countriesToShow.countriesToShow[0]
        console.log('Country: ', country)
        console.log('Languages: ', country.languages)
        console.log('Name: ', country.name.common)
        return (
            <div>
                {showCountry(country)}
            </div>
        )
        //Suoritetaan jo hakutuloksia on enemmän kuin 10
    } else if (countriesToShow.countriesToShow.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }
    // Suoritetaan jos hakutuloksia on 2-10
    else {
        return (
            <div>
                {countriesToShow.countriesToShow.map(country =>
                    <li key={country.cca2}>
                        {country.name.common}
                        <button onClick={() => showCountry(country)}>Show</button>
                    </li>)}
            </div>
        )
    }
}

export default Finder
