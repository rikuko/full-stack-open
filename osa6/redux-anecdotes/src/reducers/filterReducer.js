import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterText(state, action) {
      return action.payload
    }
  }
})

export const {filterText} = filterSlice.actions
export default filterSlice.reducer

