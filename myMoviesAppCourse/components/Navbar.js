import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Center, Actionsheet, useDisclose, Box} from 'native-base';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  useColorScheme,
  Text,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import { SetScreenMovies, SetScreenTv } from '../redux/action';

const Navbar = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {main, detail} = props;

  const defaultProps = {
    main: false,
    detail: false,
  };

  const theme = useColorScheme();
  const color = theme == 'dark' ? 'white' : 'black';
  const backColor = theme == 'dark' ? 'black' : 'white';

  const {isOpen, onOpen, onClose} = useDisclose();

  const Action = () => {
    return (
      <Center>
        <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
          <Actionsheet.Content style={{backgroundColor: backColor}}>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text style={[styles.optionsText, {color: color}]}>Options</Text>
            </Box>
            <Actionsheet.Item style={{backgroundColor: backColor}}>
              <Pressable style={styles.actionRow} onPress={()=>{
                onClose();
                dispatch(SetScreenMovies(true));
                dispatch(SetScreenTv(true));
              }}>
                <Icon name="home-outline" size={25} color={color} />
                <Text style={[styles.actionText, {color: color}]}>Home</Text>
              </Pressable>
            </Actionsheet.Item>
            <Actionsheet.Item style={{backgroundColor: backColor}}>
              <Pressable style={styles.actionRow} onPress={()=>{
                dispatch(SetScreenMovies(true));
                dispatch(SetScreenTv(false));
                onClose();
              }}>
                <Icon name="videocam-outline" size={25} color={color} />
                <Text style={[styles.actionText, {color: color}]}>Movies</Text>
              </Pressable>
            </Actionsheet.Item>
            <Actionsheet.Item style={{backgroundColor: backColor}}>
              <Pressable style={styles.actionRow} onPress={()=>{
                dispatch(SetScreenMovies(false));
                dispatch(SetScreenTv(true));
                onClose();
              }}>
                <Icon name="tv-outline" size={25} color={color} />
                <Text style={[styles.actionText, {color: color}]}>Tv Show</Text>
              </Pressable>
            </Actionsheet.Item>
            <Actionsheet.Item style={{backgroundColor: backColor}}>
              <Pressable
                style={styles.actionRow}
                onPress={() => {
                  onClose();
                }}>
                <Icon name="close-outline" size={25} color={color} />
                <Text style={[styles.actionText, {color: color}]}>Close</Text>
              </Pressable>
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
    );
  };

  return (
    <SafeAreaView>
      {Action()}
      {main ? (
        <View style={styles.mainNav}>
          {/* <Image
            style={styles.image}
            source={require('.././assets/images/movies.png')}
          /> */}

          <TouchableOpacity
            onPress={() => {
              onOpen();
            }}>
            <Icon name={'menu-outline'} size={40} color={'white'} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Search');
            }}>
            <Icon name={'search-outline'} size={40} color={'white'} />
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          {detail ? (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name={'chevron-back-outline'} size={40} color={'white'} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name={'chevron-back-outline'} size={40} color={color} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  mainNav: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    padding: 10,
  },
  drawer: {
    width: '100%',
    backgroundColor: 'blue',
  },
  optionsText: {
    fontSize: 21,
    fontWeight: '500',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
    margin: 3,
    marginLeft: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Navbar;
