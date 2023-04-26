import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import Ripple from 'react-native-material-ripple';

const Cart = props => {
  const {type, title, navigation, item} = props;

  const placeholderImage = require('../assets/images/noImage.jpg');

  return (
    <Ripple
      style={styles.container}
      onPress={() =>
        navigation.navigate('Detail', {movieId: item.id, movieTitle: title, movieType: type})
      }
      rippleColor={'white'}
      rippleOpacity={0.9}
      rippleDuration={400}
      rippleCentered={true}
      rippleFades={true}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={
          item.poster_path
            ? {uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}
            : placeholderImage
        }
      />
      {!item.poster_path &&
        (item.title ? (
          <Text style={styles.movieName}>{item.title}</Text>
        ) : (
          <Text style={styles.movieName}>{item.name}</Text>
        ))}
    </Ripple>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
    marginBottom: 5,
  },
  image: {
    width: 120,
    height: 200,
    borderRadius: 15,
  },
  movieName: {
    position: 'absolute',
    width: 100,
    top: 10,
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
  },
});

export default Cart;
