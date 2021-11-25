import React, { useEffect } from 'react'
import { View, Text, Image, SafeAreaView, ImageBackground } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TrackPlayer, { useProgress } from 'react-native-track-player'
import Slider from '@react-native-community/slider'

import * as playerActions from '../store/actions/audioPlayer'
import { COLORS, FONTS, SIZES, icons } from '../constants'

const TrackPlayerScreen = ({ navigation }) => {
  const player = useSelector((state) => state.audioPlayer)
  const track = useSelector((state) => state.track)
  const progress = useProgress()
  const dispatch = useDispatch()

  const onPlayPauseHandler = async () => {
    if (player.isTrackPlaying) {
      dispatch(playerActions.pauseTrack())
      await TrackPlayer.pause()
    } else {
      dispatch(playerActions.playTrack())
      await TrackPlayer.play()
    }
  }

  useEffect(() => {
    console.log('progesss', progress.position)
  }, [progress.position])

  const onSliderChange = async (value) => {
    console.log('value', value)
    TrackPlayer.seekTo(value)
  }

  const onPreviousPress = () => {}

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.black, flex: 1 }}>
      <ImageBackground
        style={{ height: 500, width: '100%' }}
        source={{ uri: player.track.artwork }}
        resizeMode='cover'
      >
        <LinearGradient
          style={{
            height: 150,
            width: '100%',
            position: 'absolute',
            bottom: 0,
          }}
          colors={[
            'rgba(7, 7, 7, 0.00)',
            'rgba(7, 7, 7, 0.34)',
            'rgba(7, 7, 7, 0.55)',
            COLORS.black,
          ]}
        />
      </ImageBackground>
      {/* track info  */}
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
          {player.track.title.toUpperCase()}
        </Text>
        <Text style={{ color: COLORS.lightGray, ...FONTS.body }}>
          {player.track.artist.toUpperCase()}
        </Text>
      </View>
      {/* progress bar  */}
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={30}
        onValueChange={onSliderChange}
        buffered={progress.buffered}
        value={progress.position}
        minimumTrackTintColor='#FFFFFF'
        maximumTrackTintColor='#000000'
      />
      <View></View>
      {/* controls  */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 40,
        }}
      >
        <TouchableOpacity onPress={onPreviousPress} activeOpacity={0.7}>
          <Image
            style={{ height: 25, width: 25, tintColor: COLORS.white }}
            source={icons.previous}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPlayPauseHandler}
          activeOpacity={0.7}
          style={{
            height: 60,
            width: 60,
            backgroundColor: COLORS.white,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 30,
          }}
        >
          <Image
            source={player.isTrackPlaying ? icons.pause : icons.play}
            style={{
              height: 25,
              width: 25,
              tintColor: COLORS.black,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            style={{ height: 25, width: 25, tintColor: COLORS.white }}
            source={icons.next}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default TrackPlayerScreen
