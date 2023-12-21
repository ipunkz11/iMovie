import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../route';

interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    getDataMovies();
  }, []);

  const getDataMovies = async () => {
    try {
      const response = await axios.get('https://www.omdbapi.com/?apikey=3589ca87&s=Hack');
      setData(response.data.Search);
    } catch (error) {
      console.log(error);
    }
  };

  const funcButton = async (search: string) => {
    try {
      var response;
      if (search != '') {
        response = await axios.get(`https://www.omdbapi.com/?apikey=3589ca87&s=${search}`);
      } else {
        response = await axios.get(`https://www.omdbapi.com/?apikey=3589ca87&s=Game`);
      }
      setData(response.data.Search);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', marginVertical: 20 }}>
        <TextInput
          style={styles.textInput}
          onChangeText={(search) => { setSearch(search), funcButton(search) }}
          placeholder='Cari Film'
        />
        <TouchableOpacity style={styles.button} onPress={() => funcButton(search)} >
          <Text>Cari</Text>
        </TouchableOpacity>
      </View>

      {undefined == data ?
        <View style={{ justifyContent: 'center', alignItems: 'center', height: '80%' }}>
          <Text>Data Not Found!!</Text>
        </View>
        :
        <ScrollView>
          <View style={{ flexDirection: 'row', marginHorizontal: '5%', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '20%' }}>
            {data.length > 0 && data.map((value, index) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Detail", value)}
                  key={index}
                  style={{ height: 230, width: 170, borderWidth: 1, borderColor: 'pink', marginBottom: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}
                >
                  {value.Poster == "N/A" ?
                    <Image source={require('../../assets/image-not-found.jpeg')} style={{ borderRadius: 8, resizeMode: 'cover', height: '100%', width: '100%' }} /> :
                    <Image source={{ uri: value.Poster }} style={{ borderRadius: 8, resizeMode: 'cover', height: '100%', width: '100%' }} />
                  }
                </TouchableOpacity>
              )
            })}
          </View>
        </ScrollView>
      }

    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 0.5,
    marginHorizontal: '5%',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '70%',
    borderColor: 'pink'
  },
  button: {
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 8,
    borderColor: 'pink'
  },
  wrapList: {
    borderWidth: 0.5,
    borderColor: 'pink',
    paddingVertical: 10,
    paddingLeft: 10
  }
});
