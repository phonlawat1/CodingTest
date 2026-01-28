/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Page from './src/screens/page'; 
import { StatusBar, useColorScheme } from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Page />
    </SafeAreaProvider>
  );
}

export default App;
