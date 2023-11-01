/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Route } from './src/route';



function App(): JSX.Element {

  return (
    <NavigationContainer>
      <Route />
    </NavigationContainer>
  );
}

export default App;
