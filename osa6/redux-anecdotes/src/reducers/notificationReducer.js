export const setNotification = (content, timeout) => {
  return async dispatch => {
    console.log('timeout is ' + timeout)
    dispatch({
      type: 'CHANGE_NOTIFICATION',
      data: content
    })
    setTimeout(() => {
      dispatch({
        type: 'CHANGE_NOTIFICATION',
        data: null
      })
    }, timeout*1000)
  }
}

const reducer = (state = null, action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch (action.type) {
    case 'CHANGE_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export default reducer