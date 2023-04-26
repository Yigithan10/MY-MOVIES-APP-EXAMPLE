import React from 'react';
import {Pressable, StyleSheet, useColorScheme} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Ripple from 'react-native-material-ripple';

const PlayButton = props => {
  const {handlePress} = props;

  const theme = useColorScheme();
  const color = theme == 'dark' ? 'white' : 'black';
  const backColor = theme == 'dark' ? 'black' : 'white';

  return (
    <Ripple
      onPress={handlePress}
      style={styles.button}
      rippleColor={'white'}
      rippleOpacity={0.9}
      rippleDuration={400}
      rippleCentered={true}
      rippleFades={true}>
      <Icon name={'caret-forward-circle-outline'} size={30} color={color} />
    </Ripple>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: 'red',
  },
});

export default PlayButton;
