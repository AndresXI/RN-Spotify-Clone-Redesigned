import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { configureStore } from '@reduxjs/toolkit'

// import user from './reducers/user'
// import auth from './reducers/auth'
// import playlist from './reducers/playlist'
// import browse from './reducers/browse'
// import library from './reducers/library'
// import track from './reducers/track'
// import search from './reducers/search'
// import audioPlayer from './reducers/audioPlayer'
// slices
import audioPlayerReducer from './slices/audioPlayerSlice'
import authReducer from './slices/authSlice'
import browseReducer from './slices/browseSlice'
import libraryReducer from './slices/librarySlice'
import playlistReducer from './slices/playlistSlice'
import searchReducer from './slices/searchSlice'
import trackReducer from './slices/trackSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    audioPlayer: audioPlayerReducer,
    auth: authReducer,
    browse: browseReducer,
    library: libraryReducer,
    playlist: playlistReducer,
    search: searchReducer,
    track: trackReducer,
    user: userReducer,
    // audioPlayer,
    // search,
    // track,
    // user,
    // playlist,
    // browse,
    // library,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

// const rootReducer = combineReducers({
// })

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// )

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
