

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const createAnecdote = (content) => {
  let objectData = asObject(content)
  return {
    type: 'NEW_ANECDOTE',
    data: objectData
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: id
  }
}

export const initializeNotes = (anecdotes) => {
  let objectData = anecdotes.map(asObject)
  return {
    type: 'INIT_ANECDOTES',
    data: objectData
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_ANECDOTE': {
      return [...state, action.data]
    }
    case 'VOTE': {
      let newState = [...state]
      newState.find(i => i.id === action.data).votes += 1
      return newState
    }
    case 'INIT_ANECDOTES': {
      return action.data
    }
    default:
      return state
  }
}

export default reducer