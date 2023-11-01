import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Detail } from '../pages';

interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export type RootStackParamList = {
  Home: undefined;
  Detail: Movie;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Route() {
  const Off = { headerShown: false }

  return (
    <Stack.Navigator initialRouteName='Home' >
      <Stack.Screen name='Home' component={Home} options={Off} />
      <Stack.Screen name='Detail' component={Detail} options={Off} />
    </Stack.Navigator>
  )
}