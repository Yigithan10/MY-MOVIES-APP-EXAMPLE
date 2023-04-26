import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  useColorScheme,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
  getComedyMovies,
  getRomanceMovies,
  getFantasyMovies,
  getDocumentaryMovies,
  getCrimeMovies,
  getDramaMovies,
  getWarMovies,
  getMusicMovies,
  getFamilyTv,
  getComedyTv,
  getTalkTv,
  getFantasyTv,
  getDocumantaryTv,
  getCrimeTv,
  getDramaTv,
  getWarTv,
  getNewsTv,
} from '../service/Service';
import {SliderBox} from '@borgo-dev/react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';
import RNExitApp from 'react-native-exit-app';
import { useSelector } from 'react-redux';

const Home = ({navigation}) => {
  const dimensions = Dimensions.get('screen');

  const { MyStore } = useSelector(state => state);

  const [moviesImages, setMoviesImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [comedyMovies, setComedyMovies] = useState();
  const [romanceMovies, setRomanceMovies] = useState();
  const [fantasyMovies, setFantasyMovies] = useState();
  const [documantaryMovies, setDocumantaryMovies] = useState();
  const [crimeMovies, setCrimeMovies] = useState();
  const [dramaMovies, setDramaMovies] = useState();
  const [warMovies, setWarMovies] = useState();
  const [musicMovies, setMusicMovies] = useState();

  const [familyTv, setFamilyTv] = useState();
  const [comedyTv, setComedyTv] = useState();
  const [talkTv, setTalkTv] = useState();
  const [fantasyTv, setFantasyTv] = useState();
  const [documantaryTv, setDocumantaryTv] = useState();
  const [crimeTv, setCrimeTv] = useState();
  const [dramaTv, setDramaTv] = useState();
  const [warTv, setWarTv] = useState();
  const [newsTv, setNewsTv] = useState();

  const [error, setError] = useState(false);
  const [isSpinner, setIsSpinner] = useState(false);

  const theme = useColorScheme();
  const color = theme == 'dark' ? 'white' : 'black';
  const backColor = theme == 'dark' ? 'black' : 'white';

  // const ExitApp = () => {
  //   RNExitApp.exitApp();
  // };

  // function handleBackButtonClick() {
  //   ExitApp();
  //   return true;
  // }

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  //   return () => {
  //     BackHandler.removeEventListener(
  //       'hardwareBackPress',
  //       handleBackButtonClick,
  //     );
  //   };
  // }, []);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getComedyMovies(),
      getRomanceMovies(),
      getFantasyMovies(),
      getDocumentaryMovies(),
      getCrimeMovies(),
      getDramaMovies(),
      getWarMovies(),
      getMusicMovies(),

      getFamilyTv(),
      getComedyTv(),
      getTalkTv(),
      getFantasyTv(),
      getDocumantaryTv(),
      getCrimeTv(),
      getDramaTv(),
      getWarTv(),
      getNewsTv(),
    ]);
  };

  useEffect(() => {
    setIsSpinner(true);

    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          comedyMoviesData,
          romanceMoviesData,
          fantasyMoviesData,
          documantaryMoviesData,
          crimeMoviesData,
          dramaMoviesData,
          warMoviesData,
          musicMoviesData,

          familyTvData,
          comedyTvData,
          talkTvData,
          fantasyTvData,
          documantaryTvData,
          crimeTvData,
          dramaTvData,
          warTvData,
          newsTvData,
        ]) => {
          const moviesImagesArray = [];
          let i = 0;
          upcomingMoviesData.forEach(movie => {
            if (i < 10) {
              moviesImagesArray.push(
                'https://image.tmdb.org/t/p/w500' + movie.poster_path,
              );
              i++;
            }
          });
          setMoviesImages(moviesImagesArray);
          console.log(moviesImagesArray.length);
          setPopularMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setComedyMovies(comedyMoviesData);
          setRomanceMovies(romanceMoviesData);
          setFantasyMovies(fantasyMoviesData);
          setDocumantaryMovies(documantaryMoviesData);
          setCrimeMovies(crimeMoviesData);
          setDramaMovies(dramaMoviesData);
          setWarMovies(warMoviesData);
          setMusicMovies(musicMoviesData);

          setFamilyTv(familyTvData);
          setComedyTv(comedyTvData);
          setTalkTv(talkTvData);
          setFantasyTv(fantasyTvData);
          setDocumantaryTv(documantaryTvData);
          setCrimeTv(crimeTvData);
          setDramaTv(dramaTvData);
          setWarTv(warTvData);
          setNewsTv(newsTvData);

          setIsSpinner(false);
        },
      )
      .catch(err => {
        setError(true);
      });
  }, []);

  return (
    <React.Fragment>
      {!isSpinner && !error && (
        <ScrollView>
          {moviesImages && (
            <View style={styles.background}>
              <SliderBox
                disableOnPress={true}
                images={moviesImages}
                dotStyle={styles.sliderStyle}
                sliderBoxHeight={dimensions.height / 1.6}
                autoplay={true}
                circleLoop={true}
              />
            </View>
          )}
          {/* Popular Movies */}
          {popularMovies && MyStore.screenMovies && (
            <View style={[styles.corousal, {backgroundColor: backColor}]}>
              <List
                navigation={navigation}
                title={'Popular Movies'}
                type={'movie'}
                content={popularMovies}
              />
            </View>
          )}
          {/* Popular Tv Shows */}
          {popularTv && MyStore.screenTv && (
            <View style={[styles.corousal, {backgroundColor: backColor}]}>
              <List
                navigation={navigation}
                title={'Popular Tv Shows'}
                type={'tv'}
                content={popularTv}
              />
            </View>
          )}
          {/* Family Movies */}
          {familyMovies && MyStore.screenMovies && (
            <View style={[styles.corousal, {backgroundColor: backColor}]}>
              <List
                navigation={navigation}
                title={'Family Movies'}
                type={'movie'}
                content={familyMovies}
              />
            </View>
          )}
          {/* Comedy Movies */}
          {comedyMovies && MyStore.screenMovies && (
            <View style={[styles.corousal, {backgroundColor: backColor}]}>
              <List
                navigation={navigation}
                title={'Comedy Movies'}
                type={'movie'}
                content={comedyMovies}
              />
            </View>
          )}
          {/* Romance Movies */}
          {romanceMovies && MyStore.screenMovies && (
            <View style={[styles.corousal, {backgroundColor: backColor}]}>
              <List
                navigation={navigation}
                title={'Romance Movies'}
                type={'movie'}
                content={romanceMovies}
              />
            </View>
          )}
          {/* Fantasy Movies */}
          {fantasyMovies && MyStore.screenMovies && (
            <View style={[styles.corousal, {backgroundColor: backColor}]}>
              <List
                navigation={navigation}
                title={'Fantasy Movies'}
                type={'movie'}
                content={fantasyMovies}
              />
            </View>
          )}
          {/* Documantary Movies */}
          {documantaryMovies && MyStore.screenMovies && (
            <View style={[styles.corousal, {backgroundColor: backColor}]}>
              <List
                navigation={navigation}
                title={'Documantary Movies'}
                type={'movie'}
                content={documantaryMovies}
              />
            </View>
          )}
          {/* Crime Movies */}
          {crimeMovies && MyStore.screenMovies && (
            <View style={[styles.corousal, {backgroundColor: backColor}]}>
              <List
                navigation={navigation}
                title={'Crime Movies'}
                type={'movie'}
                content={crimeMovies}
              />
            </View>
          )}
          {/* Drama Movies */}
          {dramaMovies && MyStore.screenMovies && (
            <View style={[styles.corousal, {backgroundColor: backColor}]}>
              <List
                navigation={navigation}
                title={'Drama Movies'}
                type={'movie'}
                content={dramaMovies}
              />
            </View>
          )}
          {/* War Movies */}
          {warMovies && MyStore.screenMovies && (
            <View style={[styles.corousal, {backgroundColor: backColor}]}>
              <List
                navigation={navigation}
                title={'War Movies'}
                type={'movie'}
                content={warMovies}
              />
            </View>
          )}
          {/* Music Movies */}
          {musicMovies && MyStore.screenMovies && (
            <View style={[styles.corousal, {backgroundColor: backColor}]}>
              <List
                navigation={navigation}
                title={'Music Movies'}
                type={'movie'}
                content={musicMovies}
              />
            </View>
          )}
          {/* ------------ */}
          {/* Family Tv */}
          {familyTv && MyStore.screenTv && (
            <View style={[styles.corousal, {backgroundColor: backColor}]}>
              <List
                navigation={navigation}
                title={'Family Tv'}
                type={'tv'}
                content={familyTv}
              />
            </View>
          )}
          {/* Comedy Tv */}
          {comedyTv && MyStore.screenTv && (
            <View style={[styles.corousal, {backgroundColor: backColor}]}>
              <List
                navigation={navigation}
                title={'Comedy Tv'}
                type={'tv'}
                content={comedyTv}
              />
            </View>
          )}
          {/* Talk Tv */}
          {talkTv && MyStore.screenTv && (
            <View style={[styles.corousal, {backgroundColor: backColor}]}>
              <List
                navigation={navigation}
                title={'Talk Tv'}
                type={'tv'}
                content={talkTv}
              />
            </View>
          )}
          {/* Fantasy Tv */}
          {fantasyTv && MyStore.screenTv && (
            <View style={[styles.corousal, {backgroundColor: backColor}]}>
              <List
                navigation={navigation}
                title={'Fantasy Tv'}
                type={'tv'}
                content={fantasyTv}
              />
            </View>
          )}
          {/* Documantary Tv */}
          {documantaryTv && MyStore.screenTv && (
            <View style={[styles.corousal, {backgroundColor: backColor}]}>
              <List
                navigation={navigation}
                title={'Documantary Tv'}
                type={'tv'}
                content={documantaryTv}
              />
            </View>
          )}
          {/* Crime Tv */}
          {crimeTv && MyStore.screenTv && (
            <View style={[styles.corousal, {backgroundColor: backColor}]}>
              <List
                navigation={navigation}
                title={'Crime Tv'}
                type={'tv'}
                content={crimeTv}
              />
            </View>
          )}
          {/* Drama Tv */}
          {dramaTv && MyStore.screenTv && (
            <View style={[styles.corousal, {backgroundColor: backColor}]}>
              <List
                navigation={navigation}
                title={'Drama Tv'}
                type={'tv'}
                content={dramaTv}
              />
            </View>
          )}
          {/* War Tv */}
          {warTv && MyStore.screenTv && (
            <View style={[styles.corousal, {backgroundColor: backColor}]}>
              <List
                navigation={navigation}
                title={'War Tv'}
                type={'tv'}
                content={warTv}
              />
            </View>
          )}
          {/* News Tv */}
          {newsTv && MyStore.screenTv && (
            <View style={[styles.corousal, {backgroundColor: backColor}]}>
              <List
                navigation={navigation}
                title={'News Tv'}
                type={'tv'}
                content={newsTv}
              />
            </View>
          )}
        </ScrollView>
      )}
      {isSpinner && !error && (
        <View style={[styles.background, {backgroundColor: backColor}]}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
      {error && <Error />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  corousal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
