import { useDispatch } from 'react-redux'
import {filterText} from '../reducers/filterReducer'

const style ={
  marginBottom: 10
}

const Filter = () => {
  const dispatch = useDispatch()

  return(
    <div style = { style }>
      filter <input onChange = { (event) => (dispatch(filterText(event.target.value))) } />
    </div>
  )
}

export default Filter