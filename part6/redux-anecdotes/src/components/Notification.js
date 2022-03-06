import { useSelector } from 'react-redux'
import React, { useEffect, useState } from "react"

const Notification = () => {
  const {notifications} =  useSelector( state => state.notifications)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const [notification, setNotification] = useState({ type: "", message: "" });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (notifications.length > 0) {
      setNotification(notifications[notifications.length - 1]);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  }, [notifications]);

  return show ?  (
    <div style={style}>
      {notification.message}
    </div>
  ) : null;
  }

export default Notification