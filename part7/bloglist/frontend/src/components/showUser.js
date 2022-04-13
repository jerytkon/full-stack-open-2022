import PropTypes from 'prop-types'
const showUser = ({ loggedUser, setUser }) => {
  return (
    <div>
      {loggedUser.name} logged in &nbsp;
      <button onClick={() => {
        setUser(null)
        window.localStorage.removeItem('loggedBlogappUser')}}>
         log out
      </button>
    </div>
  )}


showUser.propTypes = {
  setUser: PropTypes.func.isRequired
}

export default showUser