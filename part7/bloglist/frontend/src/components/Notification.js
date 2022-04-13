import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  console.log('notifikaatio', notification);
  return notification.length > 0 ? (
    <div style={style} className="error">
      {notification}
    </div>
  ) : null;
};

export default Notification;
