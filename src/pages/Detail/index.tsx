import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootStackParamList } from '../../route'

type Props = {}

const Detail: React.FC = (props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const data = props.route.params;

  return (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: '70%' }}>
        {data.Poster == "N/A" ?
          <Image source={require('../../assets/image-not-found.jpeg')} style={{ height: '100%', width: '100%' }} /> :
          <Image source={{ uri: data.Poster }} style={{ height: '100%', width: '100%' }} />
        }
      </TouchableOpacity>
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: '8%'}}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>DESCRIPTION</Text>
      </View>
      <View style={styles.wrapDetail}>
        <View style={styles.wrapText}>
          <Text style={styles.textKey}>Title</Text>
          <Text> : </Text>
          <Text>{data.Title}</Text>
        </View>
        <View style={styles.wrapText}>
          <Text style={styles.textKey}>Type</Text>
          <Text> : </Text>
          <Text>{data.Type}</Text>
        </View>
        <View style={styles.wrapText}>
          <Text style={styles.textKey}>Year</Text>
          <Text> : </Text>
          <Text>{data.Year}</Text>
        </View>
        <View style={styles.wrapText}>
          <Text style={styles.textKey}>imdbID</Text>
          <Text> : </Text>
          <Text>{data.imdbID}</Text>
        </View>
      </View>
    </>
  )
}

export default Detail

const styles = StyleSheet.create({
  wrapDetail: {
    marginHorizontal: '5%',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 10,
    borderColor: 'pink'
  },
  textKey: { width: '20%' },
  wrapText: { flexDirection: 'row', paddingVertical: 3 }
})