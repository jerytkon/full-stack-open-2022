import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice ({
    name: 'notifications',
    initialState: {
        notification: ""
    },
    reducers: {
        notification ( state , action )  {
            return action.payload
        }
        
    },
    
})
  
export const setNotification = (message, seconds) => {
    return async dispatch => {
      dispatch(notification(message))
      setTimeout(() => {
          dispatch(notification(""))
      }, seconds * 1000)
    }
  }

export const { notification } = notificationSlice.actions
export default notificationSlice.reducer