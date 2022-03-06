import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'



const App = () => {
  


  return (
    <div>
    <AnecdoteForm />
    <h2>Anecdotes</h2>
    <Notification />
    <AnecdoteList />
    </div>
  )
}

export default App