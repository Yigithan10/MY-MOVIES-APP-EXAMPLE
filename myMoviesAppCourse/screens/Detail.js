import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  useColorScheme,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Modal,
  Pressable,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {getOneMovie, getOneVideo} from '../service/Service';
import {Rating} from 'react-native-stock-star-rating';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
import AwesomeAlert from 'react-native-awesome-alerts';

const dimensions = Dimensions.get('screen');

const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;
  const movieTitle = route.params.movieTitle;
  const movieType = route.params.movieType;

  const placeholderImage = require('../assets/images/noImage.jpg');

  const [movieDetail, setMovieDetail] = useState('');
  const [movieVideoKey, setMovieVideoKey] = useState('');
  const [isSpinner, setIsSpinner] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const theme = useColorScheme();
  const color = theme == 'dark' ? 'white' : 'black';
  const backColor = theme == 'dark' ? 'black' : 'white';

  const getData = () => {
    Promise.all([
      getOneMovie(movieId, movieType),
      getOneVideo(movieId, movieType),
    ])
      .then(([movieData, movieVideoData]) => {
        setMovieDetail(movieData);

        movieVideoData.forEach(video => {
          if (video.key == 'Behind the Scenes') {
            console.log('video.key1 => ' + video.key);
            setMovieVideoKey(video.key);
          } else if (video.type == 'Trailer') {
            console.log('video.key2 => ' + video.key);
            setMovieVideoKey(video.key);
          } else if (video.type == 'Teaser') {
            console.log('video.key3 => ' + video.key);
            setMovieVideoKey(video.key);
          }
        });
        setIsSpinner(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, [movieId]);

  const videoShown = () => {
    if (movieVideoKey == '') {
      setShowAlert(true);
    } else {
      navigation.navigate('Webview', {movieVideoKey: movieVideoKey});
    }
  };

  return (
    <React.Fragment>
      {isSpinner && movieDetail && (
        <View>
          <ScrollView style={{backgroundColor: backColor}}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500' +
                        movieDetail.poster_path,
                    }
                  : placeholderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={() => videoShown()} />
              </View>
              {movieDetail.title ? (
                <Text style={[styles.movieName, {color: color}]}>
                  {movieDetail.title}
                </Text>
              ) : (
                <Text style={[styles.movieName, {color: color}]}>
                  {movieDetail.name}
                </Text>
              )}
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text
                        key={genre.id}
                        style={[styles.genre, {color: color}]}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <Rating
                stars={movieDetail.vote_average / 2}
                maxStars={5}
                size={25}
                color={'gold'}
              />

              <Text style={[styles.overview, {color: color}]}>
                {movieDetail.overview}
              </Text>

              <Text style={[styles.releasedate, {color: color}]}>
                {'Release data : ' +
                  dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}
              </Text>
            </View>

            {showAlert && (
              <AwesomeAlert
                contentContainerStyle={{backgroundColor: backColor}}
                show={showAlert}
                showProgress={false}
                titleStyle={{ color: color }}
                title="We are sad :("
                messageStyle={{ color: color }}
                message="Sorry, no teaser here."
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                cancelButtonTextStyle={{ color: color }}
                cancelText="Ok"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                  setShowAlert(false);
                }}
              />
            )}
          </ScrollView>
        </View>
      )}

      {!isSpinner && (
        <View style={[styles.container, {backgroundColor: backColor}]}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: dimensions.height / 1.6,
  },
  movieName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  genre: {
    marginLeft: 10,
    fontWeight: '500',
    fontSize: 14,
  },
  overview: {
    padding: 20,
    fontSize: 16,
  },
  releasedate: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingBottom: 20,
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 25,
  },
  webviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  webviewText: {
    color: 'red',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default Detail;
