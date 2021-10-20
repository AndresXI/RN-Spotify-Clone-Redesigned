import { GET_CATEGORIES_PLAYLIST } from '../actions/playlist'

const initialState = {
  topLists: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_PLAYLIST:
      console.log('plalist.reducer()', action)
      return {
        ...state,
        topLists: action.topLists,
      }

    default:
      return { ...state }
  }
}
