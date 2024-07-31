import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage(state, action) {
            return action.payload
        }
    }
})

export const timedMessage = (message, time) => {
    return async dispatch => {
    dispatch(setMessage(message))
    setTimeout(() => {
        dispatch(setMessage(''))
      }, time*1000)
}}

export const { setMessage } = messageSlice.actions
export default messageSlice.reducer
