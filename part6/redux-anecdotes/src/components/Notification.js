import { useSelector } from 'react-redux'
import React, { useEffect, useState } from "react"

const Notification = () => {
  const notification =  useSelector( state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  console.log("notifikaatio", notification)
  return notification.length > 0 ? (
    <div style={style}>
      {notification}
    </div>
  ) : null ;
  }

export default Notification