

const initialState =
  window.localStorage.getItem('loggedUser') !== undefined ||
  window.localStorage.getItem('loggedUser') !== null
    ? JSON.parse(localStorage.getItem('loggedUser'))
    : null

const loggedUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user
    default:
      return state
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user
  }
}

export const logOutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
  }
}

export default loggedUserReducer
