import anecdoteService from '../services/anecdotes'

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    dispatch({
      type: 'VOTE',
      data: id
    })
  }
}

const voteHelper = async object => {
  const newAnecdote = await anecdoteService.vote(object)
  return newAnecdote
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const reducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch (action.type) {
    case 'NEW_ANECDOTE': {
      return [...state, action.data]
    }
    case 'VOTE': {
      let newState = [...state]
      const found = newState.find(i => i.id === action.data)
      voteHelper(found)
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