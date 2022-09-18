import { StatusBar } from 'react-native'
import { Background } from './src/components/Background';
import {Home} from './src/screens/Home'
import { Loading } from './src/components/Loading';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'
import React from 'react';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  })
  return (
    <Background>
      <StatusBar
        barStyle="light-content" 
        backgroundColor="transparent" /*deixa com um fundo branco */
        translucent /* Deixa com um efeito de invisivel*/
      />
      {/* se a nossa fonte está carregada, mostra home caso contrário, mostra loading */}
      {fontsLoaded ? <Home/> : <Loading/>}
    </Background>
  );
}

