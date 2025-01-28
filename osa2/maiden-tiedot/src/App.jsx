import axios from "axios"
import { useState, useEffect } from "react"
import Finder from "./components/Finder"


function App() {

  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  const hook = () => {
    console.log('Effekti')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log('Promise ok')
        setCountries(response.data)
      })
    setCountriesToShow(countries)
  }
  useEffect(hook, [])
  console.log('Render', countries.length, 'countries')
  console.log('Countries to show ', countriesToShow)

  const handelSearch = (event) => {
    console.log('Handle search: ', event.target.value)
    setSearchValue(event.target.value)
    setCountriesToShow(countries.filter(country =>
      country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  console.log('countriesToShow length ', countriesToShow.length)

  return (
    <div>
      <h1>Countries</h1>
      Find country
      <form>
        <input
          value={searchValue}
          onChange={handelSearch} />
      </form>
      <Finder countriesToShow={countriesToShow} />
    </div>
  )
}


export default App
