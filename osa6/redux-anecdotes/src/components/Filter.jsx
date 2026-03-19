import { useDispatch } from 'react-redux'
import {filterText} from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    console.log('Filter event: ', event.target.value)
    dispatch(filterText(event.target.value))
    

  }
  const style ={
    marginBottom: 10
  }

  return(
    <div style = { style }>
      filter <input onChange = { handleChange } />
    </div>
  )
}

export default Filter