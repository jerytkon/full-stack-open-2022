const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      const goodState = {bad: state.bad, good: state.good + 1, ok: state.ok}
      return goodState
    case 'OK':
      const okState = {bad: state.bad, good: state.good, ok: state.ok + 1}
      return okState
    case 'BAD':
      const badState = {bad: state.bad + 1, good: state.good, ok: state.ok}
      return badState
    case 'ZERO':
      const zeroState = {bad: 0, good: 0, ok: 0}
      return zeroState
    default: return state
  }
  
}

export default counterReducer