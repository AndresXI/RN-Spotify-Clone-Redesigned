import React, { useEffect, useState } from 'react'
import { View, FlatList, Image, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import {
  Header,
  HorizontalMenu,
  HorizontalCardContainer,
  TextButton,
} from '../components'
import { COLORS, FONTS, SIZES } from '../constants'
import * as userActions from '../store/actions/user'
import * as playlistActions from '../store/actions/playlist'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useScrollToTop } from '@react-navigation/native'

const Profile = ({ navigation }) => {
  const user = useSelector((state) => state.user)
  const ref = React.useRef(null)
  const playlist = useSelector((state) => state.playlist)
  const [activeMenuItem, setActiveMenuItem] = useState({
    title: 'Overview',
    id: 1,
  })
  const dispatch = useDispatch()

  useScrollToTop(ref)

  useEffect(() => {
    dispatch(userActions.getProfile())
    dispatch(userActions.getUserFollows(10))
    dispatch(userActions.getRecentlyPlayed(10))
    dispatch(userActions.getPlaylists(40))
    dispatch(playlistActions.getNewReleases(10))
  }, [dispatch])

  const menuItems = [
    {
      title: 'Overview',
      id: 1,
    },
    {
      title: 'Public Playlists',
      id: 2,
    },
    {
      title: `Following(${user.follows.length})`,
      id: 3,
    },
  ]

  const renderUserProfile = () => {
    return (
      <View style={styles.userProfileContainer}>
        <Image
          style={styles.userImage}
          source={{
            uri: user.data.images ? user.data.images[0].url : undefined,
          }}
        />
        <View>
          <Text style={{ color: COLORS.white, ...FONTS.h1 }}>
            {user.data.display_name.toUpperCase()}
          </Text>
          <Text style={{ color: COLORS.white, ...FONTS.body }}>
            {user.data.product}
          </Text>
        </View>
      </View>
    )
  }

  const renderOverview = () => {
    return (
      <View>
        <HorizontalCardContainer
          navigation={navigation}
          cardItemImageStyle={{ opacity: 1 }}
          cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
          data={user.recentlyPlayed}
          label='RECENTLY PLAYED'
        />
        <HorizontalCardContainer
          navigation={navigation}
          cardItemImageStyle={{ opacity: 1 }}
          cardItemTextStyle={{ position: 'relative', paddingTop: 15 }}
          data={playlist.newReleases}
          label='DISCOVER NEW MUSIC'
        />
      </View>
    )
  }

  const renderUserPublicPlaylists = () => {
    return (
      <View>
        {user.playlists
          .filter(
            (playlist) =>
              playlist.owner.display_name === user.data.display_name &&
              playlist.public
          )
          .map((filteredPlaylist) => {
            return (
              <TouchableOpacity
                key={filteredPlaylist.id}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('Tracks', {
                    mediaType: filteredPlaylist.type,
                    mediaId: filteredPlaylist.id,
                  })
                }
              >
                <View style={styles.publicPlaylistContainer}>
                  <Image
                    style={{ width: 60, height: 60, marginRight: 20 }}
                    source={{ uri: filteredPlaylist.images[0].url }}
                  />
                  <View>
                    <Text style={styles.publicPlaylistTitle}>
                      {filteredPlaylist.name}
                    </Text>
                    <Text style={{ color: COLORS.white, ...FONTS.body }}>
                      Total tracks: {filteredPlaylist.tracks.total}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
      </View>
    )
  }

  const renderUserFollows = () => {
    return (
      <View>
        {user.follows.map((artist) => {
          return (
            <TouchableOpacity
              key={artist.id}
              activeOpacity={0.7}
              style={styles.userFollowsContainer}
            >
              <Image
                style={styles.artistImage}
                source={{ uri: artist.images[0].url }}
              />
              <View style={{ flex: 2 }}>
                <Text
                  style={{ color: COLORS.white, paddingBottom: 4, ...FONTS.h3 }}
                >
                  {artist.name}
                </Text>
                <Text style={{ color: COLORS.white, ...FONTS.body }}>
                  {Number(artist.followers.total.toFixed(2)).toLocaleString(
                    'en-US'
                  )}{' '}
                  followers
                </Text>
              </View>
              <TextButton
                buttonContainerStyle={styles.textButton}
                label='following'
              />
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  return (
    <View style={styles.profileScreen}>
      <FlatList
        ref={ref}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Header />
            {renderUserProfile()}
            <HorizontalMenu
              activeMenuItem={activeMenuItem}
              setActiveMenuItem={setActiveMenuItem}
              menuItems={menuItems}
            />
          </View>
        }
        ListFooterComponent={
          <View style={{ paddingBottom: 120 }}>
            {activeMenuItem.id === 1 && renderOverview()}
            {activeMenuItem.id === 2 && renderUserPublicPlaylists()}
            {activeMenuItem.id === 3 && renderUserFollows()}
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    marginRight: 18,
  },
  publicPlaylistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: SIZES.padding,
  },
  publicPlaylistTitle: { color: COLORS.white, paddingBottom: 5, ...FONTS.h3 },
  userFollowsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: SIZES.padding,
  },
  artistImage: { width: 70, height: 70, borderRadius: 35, marginRight: 10 },
  textButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.white,
    height: 35,
  },
  profileScreen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.black,
    paddingTop: SIZES.paddingTop,
  },
})

export default Profile
