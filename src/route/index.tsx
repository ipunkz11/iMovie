import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Detail, News, DetailNews } from '../pages';

interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

interface DataNews {

}

export type RootStackParamList = {
  Home: undefined;
  News: undefined;
  DetailNews: DataNews;
  Detail: Movie;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Route() {
  const Off = { headerShown: false }

  return (
    <Stack.Navigator initialRouteName='News' >
      <Stack.Screen name='Home' component={Home} options={Off} />
      <Stack.Screen name='Detail' component={Detail} options={Off} />
      <Stack.Screen name='News' component={News} options={Off} />
      <Stack.Screen name='DetailNews' component={DetailNews} options={Off} />
    </Stack.Navigator>
  )
}