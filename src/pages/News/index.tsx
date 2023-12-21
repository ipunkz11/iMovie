import { Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { NotFound } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../route';

type Tech = {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface ColorState {
  technology: boolean;
  business: boolean;
  general: boolean;
  health: boolean;
  sports: boolean;
  entertainment: boolean;
}

interface Article {
  publishedAt: string;
}

const News: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<Tech[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [color, setColor] = useState<ColorState>({
    technology: false,
    business: false,
    general: false,
    health: false,
    sports: false,
    entertainment: false,
  })

  // Fungsi ketika list Category di klik akan berubah warna backgroundnya
  const handleCategoryClick = (category: string) => {
    setColor((prevColor) => ({
      ...prevColor,
      [category]: true,
      ...Object.keys(prevColor).filter((key) => key !== category).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
    }));
  };

  const funcSearch = (searchNews: string) => {
    console.log("Search", searchNews)
    setLoading(true)
    axios.get(`https://newsapi.org/v2/top-headlines?apiKey=6e2224bebb934134b59cd8540fe537b7&q=${searchNews}`)
      .then(res => {
        console.log("response funcSearch", res.data.articles)
        setLoading(false)
        // setData(res.data.articles)
      })
      .catch(err => {
        console.log("error fetching", err),
          setLoading(false)
      })
  }


  const funcGetNews = (categories: string) => {
    setLoading(true)
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${categories}&apiKey=6e2224bebb934134b59cd8540fe537b7`)
      .then(res => {
        setLoading(false)
        setData(res.data.articles)
        // console.log("Waduh", data)

      })
      .catch(err => {
        console.log("Error Fetching", err)
        setLoading(false)
      })
  }

  // Fungsi format waktu
  const dateString: string = data[3]?.publishedAt;
  const dateObject: Date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate: string = dateObject.toLocaleDateString('en-US', options);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <View style={styles.page}>
      <View style={styles.wrapSearch}>
        <TextInput
          onChangeText={search => setSearch(search)}
          style={styles.textInput}
          placeholder='Search'
          onFocus={() => funcSearch(search)}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: 12 }}>
          <TouchableOpacity style={{ ...styles.listCategory, backgroundColor: color.technology ? 'orange' : 'white' }} onPress={() => { funcGetNews('technology'), handleCategoryClick('technology') }}>
            <Text style={styles.textListCat}>Technology</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.listCategory, backgroundColor: color.business ? 'orange' : 'white' }} onPress={() => { funcGetNews('business'), handleCategoryClick('business') }}>
            <Text style={styles.textListCat}>Business</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.listCategory, backgroundColor: color.general ? 'orange' : 'white' }} onPress={() => { funcGetNews('general'), handleCategoryClick('general') }}>
            <Text style={styles.textListCat}>General</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.listCategory, backgroundColor: color.health ? 'orange' : 'white' }} onPress={() => { funcGetNews('health'), handleCategoryClick('health') }}>
            <Text style={styles.textListCat}>Health</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.listCategory, backgroundColor: color.sports ? 'orange' : 'white' }} onPress={() => { funcGetNews('sports'), handleCategoryClick('sports') }}>
            <Text style={styles.textListCat}>Sports</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.listCategory, backgroundColor: color.entertainment ? 'orange' : 'white' }} onPress={() => { funcGetNews('entertainment'), handleCategoryClick('entertainment') }}>
            <Text style={styles.textListCat}>Entertainment</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sectionStories}>
          <Text style={{ fontSize: 18, marginBottom: 12, color: '#F17071' }}>Top Stories</Text>
          {data[3]?.urlToImage != null ?
            <Image
              source={{ uri: data[3]?.urlToImage }}
              style={{ width: '100%', aspectRatio: 2 / 1, borderRadius: 8 }}
            /> :
            <Image
              source={NotFound}
              style={{ width: '100%', height: 200, borderRadius: 8, resizeMode: 'cover' }}
            />
          }
          <Text style={{ marginVertical: 8, fontSize: 14, fontWeight: 'bold' }}>{data[3]?.description != null ? data[3]?.description : 'Gak Tau'}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <Text style={{ fontSize: 10, maxWidth: '70%' }}>{data[3]?.title != null ? data[3]?.title : 'Gak Tau'}</Text>
            <Text style={{ fontSize: 10 }}>{data[3]?.publishedAt != null ? formattedDate : 'Gak Tau'}</Text>
          </View>

          {
            data.length + 1 && data.map((value, key) => {
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => navigation.navigate('DetailNews', { params: value })}
                  style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: 'rgba(225,225,225,0.9)', paddingVertical: 10 }}
                >
                  {
                    value.urlToImage != null ?
                      <Image source={{ uri: value.urlToImage }} style={{ width: 50, aspectRatio: 1, borderRadius: 10, marginRight: 10 }} /> :
                      <Image source={NotFound} style={{ width: 50, aspectRatio: 1, borderRadius: 10, marginRight: 10 }} />
                  }
                  <View style={{ flexShrink: 1 }}>
                    <Text style={{ maxWidth: '90%', maxHeight: '30%', marginBottom: 2, fontWeight: 'bold' }}>{value?.title != null ? value.title : 'Judulnya'}</Text>
                    <Text>{value?.description != null ? value.description : 'Deskripsinya'}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 }}>
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{value?.author != null ? value.author : 'Penulisnya'}</Text>
                      <Text style={{ fontSize: 12 }}>{value?.publishedAt != null ? value.publishedAt : 'Jamnya'}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </ScrollView>
    </View >
  )
}

export default News

const styles = StyleSheet.create({
  page: {
    flex: 1
  },
  wrapSearch: {
    paddingTop: Platform.OS == 'ios' ? 50 : 0,
    backgroundColor: '#FFFFFF'
  },
  textInput: {
    backgroundColor: '#F5F5F5',
    margin: 12,
    padding: 12,
    borderRadius: 8
  },
  listCategory: {
    paddingHorizontal: 6,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 8
  },
  textListCat: {
    fontSize: 16
  },
  sectionStories: {
    backgroundColor: '#FFFFFF',
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 12
  },
  loading: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(225,225,225,0.5)',
  },
})