import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  useColorScheme,
} from 'react-native';
import Cart from './Cart';

const List = props => {
  const {title, type, navigation, content} = props;

  const theme = useColorScheme();
  const color = theme == 'dark' ? 'white' : 'black';

  return (
    <View style={styles.list}>
      <View>
        <Text style={[styles.text, {color: color}]}>{title}</Text>
      </View>
      <View>
        <FlatList
          data={content}
          renderItem={({item}) => (
            <Cart title={title} type={type} navigation={navigation} item={item} />
          )}
          horizontal={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 25,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    paddingBottom: 15,
  },
});

export default List;
