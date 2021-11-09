import { GET_ALBUM_TRACKS, GET_PLAYLIST_TRACKS } from '../actions/track'

const initialState = {
  name: '',
  tracks: {
    items: [{ explicit: false, album: { images: [{ url: '' }] }, artists: [] }],
  },
  type: '',
  images: [{ url: '' }],
  followers: { total: 0 },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALBUM_TRACKS:
      return {
        ...state,
        ...action.albumTracks,
      }

    case GET_PLAYLIST_TRACKS:
      return {
        ...state,
        ...action.playlistTracks,
      }

    default:
      return state
  }
}
