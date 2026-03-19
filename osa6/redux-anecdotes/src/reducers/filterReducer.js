const filterReducer = (state ='', action) => {
  console.log('Filter reducer state: ', state)
  console.log('Filter reducer action: ', action)

  switch (action.type) {
    case 'SET_FILTER':
      return action.payload 
    default:
      return state      
  }
}

export const filterText = filter => {
  return {
    type: 'SET_FILTER',
    payload: filter
  }
}

export default filterReducer