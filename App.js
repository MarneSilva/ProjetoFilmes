import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { ActivityIndicator, Button, Image, ImageBackground } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const Url = 'https://api.otaviolube.com/api/filmes?populate=*'
  const baseUrl = 'https://api.otaviolube.com'
  var [filmes, setFilmes] = useState([])
  const background = {uri: 'https://e0.pxfuel.com/wallpapers/877/546/desktop-wallpaper-white-abstract-wavy-background-vector-premium-aew-abstract-background-gold-background-white-and-gold-thumbnail.jpg'}
  useEffect(() => {
    fetch(Url).then(data => data.json()).then(object => {
      setFilmes(object.data)
    })
  }, [])
  return (
    <View style={styles.container}>
       <ImageBackground style={styles.background} source={background} resizeMode='cover'>
      {filmes.length > 0 ? filmes.map(filme =>
      <View style={styles.cardContainer}>
        <Image 
        source={{uri: baseUrl + filme.attributes.poster.data.attributes.url}}
        style={styles.imgs}/>
        <View style={styles.infoContainer}>
         <Text style={styles.title}>{filme.attributes.titulo}</Text>
         <Text style={styles.sinopse}>{filme.attributes.sinopse}</Text>
         <View style={styles.buttonContainer}>
           <Button title='Comprar' color='red'/>
           <Button title='Horários' color='#940BE2'/>
         </View>
        </View>
      </View>
      )
      // separação do operador ternário
      :<View style={styles.activityContainer}>
          <ActivityIndicator size='large' color='#940BE2'/>
          <Text style={styles.loading}>Your content is loading...</Text>
       </View>}
        </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BB8FCE'
  },
  cardContainer: {
    flexDirection: 'row',
    padding: '10px',
    margin: '10px',
    marginBottom: '-4px',
    borderWidth: '5px',
    borderRadius: '10px',
    borderColor: '#7D3C98'
  },
  infoContainer: {
    flexDirection: 'column',
    textAlign: 'justify',
    maxWidth: '70%'
  },
  loading: {
    marginTop: '4%',
    color: '#940BE2',
    fontWeight: 'bold'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'blue',
    fontFamily: 'Verdana',
    paddingBottom: '3%'
  },
  sinopse: {
    alignItems: 'center',
    fontFamily: 'Verdana',
    maxWidth: '95%'
  },
  imgs: {
    width: '100px',
    height: '100%',
    marginRight: '4%',
    borderRadius: '10px'
  },
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    marginBottom: '2%',
    marginTop: '4%',
    marginRight: '10%'
  },
  background: {
    width: '100%',
    height: '100%'
  }
});