import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NotFound } from '../../assets'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../route'

type Props = {

}

const DetailNews = (props: Props) => {
  const data = props.route.params;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.5} style={{ height: '50%' }}>
        {
          data?.params?.urlToImage != null ?
            <Image source={{ uri: data?.params?.urlToImage }} style={{ width: '100%', height: "100%" }} /> :
            <Image source={NotFound} style={{ width: '100%', height: "100%" }} />
        }
      </TouchableOpacity>
      <View style={styles.borTop}>
        <Text style={styles.title}>{data?.params?.title != null ? data?.params?.title : 'Gak Tau'}</Text>
        <Text style={styles.desc}>{data?.params?.description != null ? data?.params?.description : 'Gak Tau'}</Text>
        <Text style={styles.author}>{data?.params?.author != null ? data?.params?.author : 'Gak Tau'}</Text>
      </View>
    </View>
  )
}

export default DetailNews

const styles = StyleSheet.create({
  borTop: {
    height: '70%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -70,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 14,
    fontStyle: 'italic',
    marginVertical: 5
  },
  author: {
    fontSize: 20
  }
})