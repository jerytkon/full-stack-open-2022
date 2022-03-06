
import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice ({
    name: 'notifications',
    initialState: {
        notifications:[]
    },
    reducers: {
        notificationAdded ( state, action ) {
            const message = "you added " + action.payload
            state.notifications.push ({
                message: message
            })
        },
        notificationVoted (state, action ) {
            const message = "you voted " + action.payload
            state.notifications.push ({
                message: message
            })
        }
    }
})
  
export const { notificationVoted, notificationAdded } = notificationSlice.actions
export default notificationSlice.reducer