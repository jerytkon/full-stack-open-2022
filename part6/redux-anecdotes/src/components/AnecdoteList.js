import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notificationVoted } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleClick }) => {
    return (
    <div key={anecdote.id}>
        <div>
        {anecdote.content}
        </div>
        <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
        </div>
    </div>
    )
}

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    return (
        <div>
            {anecdotes.map(anecdote =>
        <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => 
          dispatch(vote(anecdote.id)) &
          dispatch(notificationVoted(anecdote.content))
        }
      />
            )}
        </div>
    )
}

export default Anecdotes