import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Cart from '../components/Cart';
import Error from '../components/Error';
import {getSearchMovieTv} from '../service/Service';

const dimensions = Dimensions.get('screen');

const Search = ({navigation}) => {
  const theme = useColorScheme();
  const color = theme == 'dark' ? 'white' : 'black';
  const backColor = theme == 'dark' ? 'black' : 'white';

  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [searchDataMovies, setSearchDataMovies] = useState([]);
  const [searchDataTv, setSearchDataTv] = useState([]);
  const [error, setError] = useState(false);

  const [selectMovie, setSelectMovie] = useState(true);

  useEffect(() => {
    onSubmit();
  }, [searchQuery, selectMovie]);

  const onSubmit = () => {
    getSearchMovieTv(searchQuery, selectMovie ? 'movie' : 'tv')
      .then(data => {
        setSearchData(data);
      })
      .catch(err => {
        setError(err);
      });
  };

  return (
    <React.Fragment>
      <StatusBar
        animated={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent={true}
      />
      <SafeAreaView style={[styles.main, {backgroundColor: backColor}]}>
        <ScrollView style={{backgroundColor: backColor}}>
          <View style={styles.select}>
            <TouchableOpacity
              onPress={() => {
                setSelectMovie(!selectMovie);
              }}
              style={[
                styles.button,
                {borderColor: selectMovie ? 'red' : color},
              ]}>
              <Text
                style={[
                  styles.buttonText,
                  {color: selectMovie ? 'red' : color},
                ]}>
                {'Movie'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelectMovie(!selectMovie);
              }}
              style={[
                styles.button,
                {borderColor: !selectMovie ? 'red' : color},
              ]}>
              <Text
                style={[
                  styles.buttonText,
                  {color: !selectMovie ? 'red' : color},
                ]}>
                {'Tv'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.form}>
              <TextInput
                style={[styles.input, {borderColor: color, color: color}]}
                placeholder={'Search Movie or Tv Show'}
                placeholderTextColor={color}
                onChangeText={setSearchQuery}
                value={searchQuery}
              />
            </View>
            <TouchableOpacity disabled={true}>
              <Icon name={'search-outline'} size={40} color={color} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchItems}>
            {searchData && searchData.length > 0 && (
              <FlatList
                numColumns={3}
                data={searchData}
                renderItem={({item}) => (
                  <Cart
                    title={item.original_title}
                    type={selectMovie ? 'movie' : 'tv'}
                    navigation={navigation}
                    item={item}
                  />
                )}
                keyExtractor={item => item.id}
              />
            )}

            {searchData &&
              searchData.length == 0 &&
              searchQuery.length != 0 && (
                <View style={[styles.empty, {paddingTop: 20}]}>
                  <Text style={[styles.text, {color: color}]}>
                    No results matching your criteria.
                  </Text>
                  <Text style={[styles.text, {color: color}]}>
                    Try different keywords.
                  </Text>
                </View>
              )}

            {searchData &&
              searchData.length == 0 &&
              searchQuery.length == 0 && (
                <View style={styles.empty}>
                  <Text style={[styles.text, {color: color}]}>
                    Type something to start searching.
                  </Text>
                </View>
              )}

            {error && <Error />}
          </View>
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  main: {
    height: dimensions.height,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 0.5,
    borderRadius: 25,
    padding: 8,
  },
  container: {
    padding: 10,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  select: {
    padding: 10,
    paddingTop: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 15,
    padding: 7,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },
  searchItems: {
    padding: 5,
    alignItems: 'center',
  },
  empty: {
    padding: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default Search;
