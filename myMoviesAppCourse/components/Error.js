import React from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';

const Error = () => {
  const errorText1 = 'Oops! Something went wrong!';
  const errorText2 = 'Make sure you are online and restart the Application.';

  const theme = useColorScheme();
  const backColor = theme == 'dark' ? 'black' : 'white';

  return (
    <View style={[styles.container, {backgroundColor: backColor}]}>
      <Text style={styles.text}>{errorText1}</Text>
      <Text style={styles.text}>{errorText2}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default Error;
