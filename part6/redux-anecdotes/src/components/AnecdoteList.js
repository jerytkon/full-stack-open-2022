import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'
import { setNotification } from '../reducers/notificationReducer'
import { selectAllAnecdotes } from '../reducers/anecdoteReducer'


const Anecdote = ({ anecdote, handleClick }) => {
    return (
    <div>
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
    const anecdotes = useSelector(selectAllAnecdotes)
    const sortedAnecdotes = [...anecdotes].sort((a, b) => parseFloat(b.votes) - parseFloat(a.votes))
    console.log("in list here", sortedAnecdotes)
    return (
        <div>
        {sortedAnecdotes.map(anecdote =>
        <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => 
          dispatch(voteAnecdote(anecdote)) &
          dispatch(setNotification("you voted " + anecdote.content, 5))
        }
      />
            )}
     </div>
    )
}

export default Anecdotes