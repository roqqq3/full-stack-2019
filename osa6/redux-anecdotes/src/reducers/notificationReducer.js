export const setNotification = (content) => {
  return {
    type: 'CHANGENOTIFICATION',
    data: content
  }
}

const reducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'CHANGENOTIFICATION':
      return action.data
    default:
      return state
  }
}

export default reducer