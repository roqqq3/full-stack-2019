export const setFilter = (content) => {
  return {
    type: 'CHANGE',
    data: content
  }
}

const reducer = (state = "", action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch (action.type) {
    case 'CHANGE':
      return action.data
    default:
      return state
  }
}

export default reducer