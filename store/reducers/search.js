import { GET_SEARCH_ITEM } from '../actions/search'

const initialState = {
  results: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH_ITEM:
      return {
        ...state,
        results: action.searchResults,
      }

    default:
      return state
  }
}