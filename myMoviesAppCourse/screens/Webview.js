import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  useColorScheme,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import WebView from 'react-native-webview';

const Webview = ({route, navigation}) => {
  const movieVideoKey = route.params.movieVideoKey;

  const [isSpinner, setIsSpinner] = useState(true);

  const theme = useColorScheme();
  const color = theme == 'dark' ? 'white' : 'black';
  const backColor = theme == 'dark' ? 'black' : 'white';

  console.log(movieVideoKey);

  useEffect(() => {
    setTimeout(() => {
      setIsSpinner(false);
    }, 500);
  }, []);

  return (
    <React.Fragment>
      {!isSpinner ? (
        <View style={[styles.videoModal, {backgroundColor: 'black'}]}>
          {/* <VideoPlayer
                   onBack={() => videoShown()}
                   onEnd={() => videoShown()}
                   navigator={navigation}
                   fullscreenOrientation={'all'}
                   // source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
                   source={{
                     uri: 'https://www.youtube.com/watch?v=EVyDWbsucRA',
                   }}
                 /> */}

          <WebView
            source={{
              uri: 'https://www.youtube.com/watch?v=' + movieVideoKey,
            }}
          />
        </View>
      ) : (
        <View style={[styles.spinner, {backgroundColor: backColor}]}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  videoModal: {
    flex: 1,
    paddingTop: 100,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Webview;
